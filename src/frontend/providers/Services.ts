//NPM Imports
import axios from "axios";
import fs from "fs";
const { ipcRenderer } = window.require("electron");

//Local Imports
import JobInformationModel, {
  JobInformationModelType,
} from "../models/job-information-model";
import CabinetCountModel, {
  CabinetCountModelType,
} from "../models/cabinet-count-model";
import SettingsInformationModel, {
  SettingsInformationModelType,
} from "../models/settings-information-model";
import MaterialModel, { MaterialModelType } from "../models/material-model";
import MaterialNameModel, {
  MaterialNameModelType,
} from "../models/material-name-model";
import MaterialFinishesModel, {
  MaterialFinishesModelType,
} from "../models/material-finishes-model";
import PrinterModel, {
  PrinterModelForElectronType,
} from "../models/printer-model";

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

type printerType = {
  name: string;
  displayName: string;
}[];

const expressPort = ipcRenderer.sendSync("get-express-port");
const hostname = ipcRenderer.sendSync("get-hostname");
const appVersion = ipcRenderer.sendSync("get-app-version");
const expressAPI = `http://localhost:${expressPort}/api/`;
const couldAPI = `https://www.intique.online//`;

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

export const setupMaterialModel = async (
  dbPath: string,
  provider: string,
  arch: boolean
): Promise<MaterialModelType[]> => {
  const materials: MaterialModelType[] = (
    await localRequestInstance.get(
      `all-panel-stock?dbPath=${dbPath}&provider=${provider}&arch=${arch}`
    )
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
    const updatePromises = materials.map((material) => {
      localRequestInstance.put(`/all-panel-stock${testConnString}`, material);
    });
    await Promise.all(updatePromises);
  } catch (error) {
    throw new Error(error);
  }
};

export const loadSettingsPathfromLS = async (): Promise<string> => {
  try {
    const localSettings = localStorage.getItem("run-sheet-settings");
    if (localSettings === null || localSettings === undefined)
      throw new Error("No Settings Found");
    const localSettingObject = await JSON.parse(localSettings);
    return localSettingObject.databasePath;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const loadSettings = async (
  location: string
): Promise<SettingsInformationModelType> => {
  if (location === "") {
    try {
      const settings = await loadSettingsFromLocal();
      return settings;
    } catch (error) {
      const defaultSettings = getDefaultSettings();
      return defaultSettings;
    }
  } else {
    try {
      const settings = await loadSettingsFromShared(location);
      return settings;
    } catch (error) {
      const defaultSettings = getDefaultSettings();
      return defaultSettings;
    }
  }
};

const loadSettingsFromShared = async (
  location: string
): Promise<SettingsInformationModelType> => {
  try {
    const fileContents = await localRequestInstance.get(
      `/api/load-shared-settings?path=${location}`
    );
    const jsonData = JSON.parse(fileContents.data);
    return jsonData;
  } catch (error) {
    console.log(error);
    const defaultSettings = getDefaultSettings();
    return defaultSettings;
  }
};

const loadSettingsFromLocal =
  async (): Promise<SettingsInformationModelType> => {
    try {
      const localSettings = localStorage.getItem("run-sheet-settings");
      if (localSettings === null || localSettings === undefined)
        throw new Error("No Settings Found");
      const localSettingObject = await JSON.parse(localSettings);
      return SettingsInformationModel.create(localSettingObject);
    } catch (error) {
      console.log(error);
      const defaultSettings = getDefaultSettings();
      return defaultSettings;
    }
  };

const getDefaultSettings = (): SettingsInformationModelType => {
  return SettingsInformationModel.create({
    outputString: [
      { id: "name", content: "Name" },
      { id: "finish", content: "Finish" },
      { id: "brand", content: "Brand" },
    ],
    dataProviders: [],
    nestSheetPrinter: PrinterModel.create({
      silent: false,
      printBackground: false,
      deviceName: { name: "default", displayName: "Default" },
      color: true,
      marginType: "default",
      marginTop: 2,
      marginBottom: 2,
      marginLeft: 2,
      marginRight: 2,
      landscape: true,
      pageSizeName: "A4",
      pageSizeHeight: 3508,
      pageSizeWidth: 2480,
    }),
  });
};

export const verifyDatabaseConnection = async (
  path: string,
  provider: string,
  arch: boolean
) => {
  try {
    const verified = await localRequestInstance.get(
      `/test?dbPath=${path}&provider=${provider}&arch=${arch}`
    );
    if (verified.status === 200) return true;
    return verified.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const printRunSheet = async (
  printerObject: PrinterModelForElectronType
) => {
  ipcRenderer.send("print-run-sheet", printerObject);
  return true;
};
// Handling the reply from main process
ipcRenderer.once("print-run-sheet-reply", (event, response) => {
  if (response.success) {
    console.log("Print successful");
  } else {
    console.error("Print failed:", response.error);
  }
});

export const getAvailablePrinters = async (): Promise<printerType> => {
  const printers: printerType = await ipcRenderer.sendSync("get-printers");
  printers.push({ name: "default", displayName: "Default" });
  console.log(printers);
  return printers;
};
