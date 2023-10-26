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
import MaterialNameModel, {
  MaterialNameModelType,
} from "../models/material-name-model";

const expressPort = ipcRenderer.sendSync("get-express-port");
const hostname = ipcRenderer.sendSync("get-hostname");
const appVersion = ipcRenderer.sendSync("get-app-version");
const expressAPI = `http://localhost:${expressPort}/api/`;

const testConnString = `?dbPath=C:/ProgramData/Hexagon/CABINET VISION/S2M 2022/Database/PSNC-CV.accdb&provider=Microsoft.ACE.OLEDB.12.0&arch=true`;

console.log(appVersion, expressAPI);

const localRequestInstance = axios.create({
  baseURL: expressAPI,
  timeout: 10000,
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

export const setupMaterialModel = async (): Promise<
  MaterialNameModelType[]
> => {
  const materials: MaterialNameModelType[] = (
    await localRequestInstance.get(`all-panel-stock${testConnString}`)
  ).data;
  return materials;
};

export const getComputerName = (): string => {
  return hostname;
};
