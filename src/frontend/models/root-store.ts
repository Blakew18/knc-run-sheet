//NPM Imports
import { types, Instance } from "mobx-state-tree";

//Local Imports
import MaterialModel from "./material-model";
import JobInformationModel from "./job-information-model";
import CabinetCountModel from "./cabinet-count-model";
import {
  setupJobInformationModel,
  setupCabinetCountModel,
  setupMaterialModel,
  getComputerName,
} from "../providers/Services";

export const RootStoreModel = types
  .model("RootStore", {
    appName: types.string,
    computerName: types.string,
    jobInformation: JobInformationModel,
    jobStatus: types.enumeration("JobStatus", ["Quote", "Order"]),
    cabinetInformation: CabinetCountModel,
    materials: types.array(MaterialModel),
    materialBrands: types.array(types.string),
  })
  .views((self) => {
    return {
      get jobStatusOptions() {
        return ["Quote", "Order"];
      },
    };
  })
  .actions((self) => {
    return {
      setJobStatus(status: string) {
        self.jobStatus = status;
        return;
      },
    };
  });

//Export Root Store and Type
export type RootStoreType = Instance<typeof RootStoreModel>;
export const setupRootStore = async () => {
  const defaultJobInformation = await setupJobInformationModel();
  const defaultCabinetCount = await setupCabinetCountModel();
  const defaultMaterials = await setupMaterialModel();
  const rs: RootStoreType = RootStoreModel.create({
    appName: "THIS IS AN APP",
    computerName: getComputerName(),
    jobStatus: "Order",
    jobInformation: defaultJobInformation,
    cabinetInformation: defaultCabinetCount,
    materials: defaultMaterials,
  });
  console.log("Root Store Initilizing");
  return rs;
};
