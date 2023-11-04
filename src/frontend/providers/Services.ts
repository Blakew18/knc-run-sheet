//NPM Imports
import axios from "axios";
const { ipcRenderer } = window.require("electron");

//Local Imports
import JobInformationModel, {
  JobInformationModelType,
} from "../models/job-information-model";
import CabinetCountModel, {
  CabinetCountModelType,
} from "../models/cabinet-count-model";
import MaterialModel, { MaterialModelType } from "../models/material-model";
import MaterialNameModel, {
  MaterialNameModelType,
} from "../models/material-name-model";
import MaterialFinishesModel, {
  MaterialFinishesModelType,
} from "../models/material-finishes-model";

type MaterialOptionsType = {
  PanelStockID: number;
  PanelStockName: string;
  PanelStockBrand: string;
  PanelStockJPG: string;
};

type FinishOptionType = {
  FinishID: number;
  FinishName: string;
  FinishImage: string;
  material: MaterialOptionsType;
};

const expressPort = ipcRenderer.sendSync("get-express-port");
const hostname = ipcRenderer.sendSync("get-hostname");
const appVersion = ipcRenderer.sendSync("get-app-version");
const expressAPI = `http://localhost:${expressPort}/api/`;
const couldAPI = `http://localhost:5500/`;

const testConnString = `?dbPath=C:/ProgramData/Hexagon/CABINET VISION/S2M 2022/Database/PSNC-CV.accdb&provider=Microsoft.ACE.OLEDB.12.0&arch=true`;

const localRequestInstance = axios.create({
  baseURL: expressAPI,
});

const cloudRequestInstance = axios.create({
  baseURL: couldAPI,
});

export const setupJobInformationModel =
  async (): Promise<JobInformationModelType> => {
    return JobInformationModel.create({
      clientJobNumber: "",
      kncJobNumber: 2689,
      jobName: "",
      jobNestDate: new Date(),
      jobType: "KNC Queesnland",
      jobSetOutBy: "",
      jobNestedBy: "",
      jobNestingComputer: "",
      jobStackingDetails: "KNC Starndard Trolley with Cabinet Numbers",
      jobAssemblyDetails: "KNC Queensland",
      jobPaymentTerms: "14 Days",
      jobSetOutNotes: "",
    });
  };

export const getAvailableBrandsFromCloud = async (): Promise<string[]> => {
  const brands: string[] = (
    await cloudRequestInstance.get(`panelstock/brands`)
  ).data.map((brand: { panelstock_PanelStockBrand: string }) => {
    return {
      name: brand.panelstock_PanelStockBrand,
      id: brand.panelstock_PanelStockBrand,
    };
  });
  console.log(brands);
  return brands;
};

export const setupCabinetCountModel =
  async (): Promise<CabinetCountModelType> => {
    //This Seems Pointlessly ASYNC But eventualy we may try to read the CV DB to get this info
    return CabinetCountModel.create({
      cabinetCountBase: 0,
      cabinetCountWall: 0,
      cabinetCountTall: 0,
      cabinetCountWallOven: 0,
      cabinetCountKicks: 0,
      cabinetCountBulkhead: 0,
      cabinetCountDrawer: 0,
      cabinetCountInnerDrawer: 0,
    });
  };

export const setupMaterialModel = async (): Promise<MaterialModelType[]> => {
  const materials: MaterialModelType[] = (
    await localRequestInstance.get(`all-panel-stock${testConnString}`)
  ).data.map((material: MaterialModelType) => {
    return MaterialModel.create({
      ...material,
      materialNotesSwitch: false,
      materialEdgeQty: 0,
    });
  });
  return materials;
};

export const getComputerName = (): string => {
  return hostname;
};

export const getMaterialOptions = async () => {
  const materialOptions: MaterialNameModelType[] = (
    await cloudRequestInstance.get(`panelstock`)
  ).data.map((material: MaterialOptionsType) => {
    return MaterialNameModel.create({
      materialNameID: material.PanelStockID,
      materialNameName: material.PanelStockName,
      materialNameBrand: material.PanelStockBrand,
      materialNameImage: material.PanelStockJPG,
    });
  });
  return materialOptions;
};

export const getFinishOptions = async () => {
  const finishOptions: MaterialFinishesModelType[] = (
    await cloudRequestInstance.get(`panelstock/finishes/all`)
  ).data.map((finish: FinishOptionType) => {
    return MaterialFinishesModel.create({
      materialFinishID: finish.FinishID,
      materialFinishName: finish.FinishName,
      materialFinishImage: finish.FinishImage,
      materialFinishMaterialID: finish.material.PanelStockID,
    });
  });
  return finishOptions;
};

export const updateCabinetVisionMaterials = async (
  materials: MaterialModelType[]
): Promise<void> => {
  try {
    await localRequestInstance.put(
      `/all-panel-stock${testConnString}`,
      materials
    );
    return;
  } catch (error) {
    throw new Error(error);
  }
};
