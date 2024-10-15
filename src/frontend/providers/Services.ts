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
import CompanyInformationModel, {
  CompanyInformationModelType,
} from "../models/company-information-model";

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
const cloudAPI = `https://intique-projects-api-3b38e9a5f5c8.herokuapp.com/`;
// const cloudAPI = `http://localhost:5005/`;
const testConnString = `?dbPath=C:/ProgramData/Hexagon/CABINET VISION/S2M 2022/Database/PSNC-CV.accdb&provider=Microsoft.ACE.OLEDB.12.0&arch=true`;

const localRequestInstance = axios.create({
  baseURL: expressAPI,
});

const cloudRequestInstance = axios.create({
  baseURL: cloudAPI,
});

export const getAppVersion = (): string => {
  return appVersion;
};

export const setupJobInformationModel = async (
  company: CompanyInformationModelType
): Promise<JobInformationModelType> => {
  const newJobNumber = await nextJobNumber(company);

  return JobInformationModel.create({
    clientJobNumber: "",
    kncJobNumber: newJobNumber,
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
      cabinetHandEdgeParts: 0,
      cabinetSharkNoseParts: 0,
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
  dbPath: string,
  provider: string,
  arch: boolean,
  materials: MaterialModelType[]
): Promise<void> => {
  try {
    const updatePromises = materials.map((material) => {
      localRequestInstance.put(
        `/all-panel-stock?dbPath=${dbPath}&provider=${provider}&arch=${arch}`,
        material
      );
    });
    await Promise.all(updatePromises);
  } catch (error) {
    throw new Error(error);
  }
};

export const loadSettingsPathfromLS =
  async (): Promise<CompanyInformationModelType | null> => {
    try {
      const localSettings = localStorage.getItem("company-settings");
      if (localSettings === null || localSettings === undefined)
        throw new Error("No Settings Found");
      const localSettingObject = await JSON.parse(localSettings);
      return CompanyInformationModel.create(localSettingObject);
    } catch (error) {
      console.log(error);
      return CompanyInformationModel.create({
        companyName: "No Company Name",
        companyKey: "No Company Key",
      });
    }
  };

export const loadSettings = async (
  company: CompanyInformationModelType
): Promise<SettingsInformationModelType> => {
  try {
    if (company === null || company === undefined)
      throw new Error("No Settings Found");
    const settings = await cloudRequestInstance.get(
      `company-keys?CompanyName=${company.companyName}&CompanyKey=${company.companyKey}`,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    if (settings === null || settings === undefined)
      throw new Error("No Settings Found 2");
    // const settingsObject = await JSON.parse(settings.data);
    if (!settings.data.labelPrinter) {
      settings.data.labelPrinter = {
        silent: false,
        printBackground: false,
        deviceName: { name: "default", displayName: "Default" },
        color: true,
        marginType: "default",
        marginTop: 1,
        marginBottom: 1,
        marginLeft: 1,
        marginRight: 1,
        landscape: true,
        pageSizeName: "Custom",
        pageSizeHeight: 17,
        pageSizeWidth: 84,
      };
    }
    return SettingsInformationModel.create(settings.data);
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
    labelPrinter: PrinterModel.create({
      silent: false,
      printBackground: false,
      deviceName: { name: "default", displayName: "Default" },
      color: true,
      marginType: "default",
      marginTop: 1,
      marginBottom: 1,
      marginLeft: 1,
      marginRight: 1,
      landscape: true,
      pageSizeName: "Custom",
      pageSizeHeight: 17,
      pageSizeWidth: 84,
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

export const printEdgeLabels = async (
  printerObject: PrinterModelForElectronType
) => {
  ipcRenderer.send("print-labels", printerObject);
  return true;
};
// Handling the reply from main process
ipcRenderer.once("print-labels-reply", (event, response) => {
  if (response.success) {
    console.log("Print successful");
  } else {
    console.error("Print failed:", response.error);
  }
});

export const getAvailablePrinters = async (): Promise<printerType> => {
  const printers: printerType = await ipcRenderer.sendSync("get-printers");
  printers.push({ name: "default", displayName: "Default" });
  return printers;
};

export const generateNewCompanyKey = async (companyName: string) => {
  try {
    const key = await cloudRequestInstance.post(
      `company-keys?CompanyName=${companyName}`
    );
    return {
      companyKey: key.data.CompanyKey,
      companyName: key.data.CompanyName,
    };
  } catch (error) {
    return error.response.data.message;
  }
};

export const testCompanyKey = async (
  companyName: string,
  companyKey: string
) => {
  try {
    const key = await cloudRequestInstance.get(
      `company-keys?CompanyName=${companyName}&CompanyKey=${companyKey}`
    );
    if (key) return true;
    throw new Error("Invalid Key");
  } catch (error) {
    return false;
  }
};

export const saveSettings = async (
  companyName: string,
  companyKey: string,
  settings: string
) => {
  try {
    await cloudRequestInstance.put(
      `company-keys?CompanyName=${companyName}&CompanyKey=${companyKey}`,
      settings,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const nextJobNumber = async (
  company: CompanyInformationModelType
): Promise<number> => {
  try {
    if (company === null || company === undefined)
      throw new Error("No Company Data");
    const newNumber: number = (
      await cloudRequestInstance.get(
        `company-keys/run-sheet-number?CompanyName=${company.companyName}&CompanyKey=${company.companyKey}`
      )
    ).data;
    return newNumber || 1;
  } catch (error) {
    return 1;
  }
};
