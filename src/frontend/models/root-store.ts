//NPM Imports
import { types, Instance } from "mobx-state-tree";

//Local Imports
import MaterialModel from "./material-model";
import MaterialNameModel from "./material-name-model";
import JobInformationModel from "./job-information-model";
import CabinetCountModel from "./cabinet-count-model";
import {
  setupJobInformationModel,
  setupCabinetCountModel,
  setupMaterialModel,
  getComputerName,
  getAvailableBrandsFromCloud,
  getMaterialOptions,
} from "../providers/Services";

export const RootStoreModel = types
  .model("RootStore", {
    appName: types.string,
    computerName: types.string,
    jobInformation: JobInformationModel,
    jobStatus: types.enumeration("JobStatus", ["Quote", "Order"]),
    cabinetInformation: CabinetCountModel,
    materials: types.array(MaterialModel),
    materialBrands: types.array(
      types.model("MaterialBrands", {
        name: types.string,
        id: types.string,
      })
    ),
    materialOptions: types.array(MaterialNameModel),
  })
  .views((self) => {
    return {
      get jobStatusOptions() {
        return ["Quote", "Order"];
      },
      materialNameByID(id: number) {
        return self.materialOptions.find(
          (material) => material.materialNameID === id
        );
      },
      get uniqueMaterialIndentifier() {
        const existingIds = self.materialOptions.map(
          (material) => material.materialNameID
        );
        if (existingIds.length === 0) return 1;
        const maxId = Math.max(...existingIds);
        return maxId + 1;
      },
      materialNameOptions(brand: string) {
        return self.materialOptions
          .filter((material) => material.materialNameBrand === brand)
          .map((material) => ({
            name: material.materialNameName,
            id: material.materialNameID,
          }));
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
  const initBrands = await getAvailableBrandsFromCloud();
  const initMaterialOptions = await getMaterialOptions();
  const rs: RootStoreType = RootStoreModel.create({
    appName: "THIS IS AN APP",
    computerName: getComputerName(),
    jobStatus: "Order",
    jobInformation: defaultJobInformation,
    cabinetInformation: defaultCabinetCount,
    materials: defaultMaterials,
    materialBrands: initBrands,
    materialOptions: initMaterialOptions,
  });
  console.log("Root Store Initilizing");
  return rs;
};
