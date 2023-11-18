//NPM Imports
import { types, Instance, flow, onSnapshot } from "mobx-state-tree";

//Local Imports
import MaterialModel, { MaterialModelType } from "./material-model";
import MaterialNameModel from "./material-name-model";
import JobInformationModel from "./job-information-model";
import CabinetCountModel from "./cabinet-count-model";
import SettingsInformationModel, {
  SettingsInformationModelType,
} from "./settings-information-model";
import {
  setupJobInformationModel,
  setupCabinetCountModel,
  setupMaterialModel,
  getComputerName,
  getAvailableBrandsFromCloud,
  getMaterialOptions,
  getFinishOptions,
  updateCabinetVisionMaterials,
  loadSettings,
  getAvailablePrinters,
  printRunSheet,
  loadSettingsPathfromLS,
} from "../providers/Services";
import MaterialFinishesModel from "./material-finishes-model";

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
    finishOptions: types.array(MaterialFinishesModel),
    settings: SettingsInformationModel,
    availablePrinters: types.array(
      types.model({ name: types.string, displayName: types.string })
    ),
    isAdrian: types.boolean,
    settingsPath: types.string,
  })
  .views((self) => {
    return {
      get materialArrayUniqueID() {
        let total = 0;
        let multiplier = 2;
        self.materials.forEach((material) => {
          const nameAsNumber =
            parseInt(material.materialNewName?.replace(/^#/, ""), 16) ||
            multiplier * multiplier * multiplier;
          total += (material.cvMaterialID + nameAsNumber) * multiplier;
          multiplier += 1;
        });
        console.log(total);
        return total;
      },
      get jobStatusOptions() {
        return ["Quote", "Order"];
      },
      materialNameByID(id: number) {
        return self.materialOptions.find(
          (material) => material.materialNameID === id
        );
      },
      materialFinishByID(id: number) {
        return self.finishOptions.find(
          (finish) => finish.materialFinishID === id
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
      get uniqueFinishIndentifier() {
        const existingIds = self.finishOptions.map(
          (finish) => finish.materialFinishID
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
      materialFinishOptions(materialNameID: number) {
        const finishOptions = self.finishOptions
          .filter(
            (finish) => finish.materialFinishMaterialID === materialNameID
          )
          .map((finish) => ({
            name: finish.materialFinishName,
            id: finish.materialFinishID,
          }));

        return finishOptions;
      },
      validateRootStoreForUpdate(): { isValid: boolean; errors: string } {
        let isValid = true;
        let errors = "";
        if (!self.computerName) {
          errors += "Computer Name is required\n";
          isValid = false;
        }
        if (!self.jobInformation.jobName) {
          errors += "Job Name is required\n";
          isValid = false;
        }
        if (!self.jobInformation.clientJobNumber) {
          errors += "Client Job Number is required\n";
          isValid = false;
        }
        self.materials.forEach((material) => {
          if (!material.materialBrand) {
            errors += `${material.cvMaterialName} Requires Brand\n`;
            isValid = false;
          }
          if (!material.materialName) {
            errors += `${material.cvMaterialName} Requires Material Name\n`;
            isValid = false;
          }
          if (!material.materialFinish) {
            errors += `${material.cvMaterialName} Requires Material Finish\n`;
            isValid = false;
          }
        });
        return { isValid: true, errors: errors };
        return { isValid: isValid, errors: errors };
      },
    };
  })
  .actions((self) => {
    return {
      rsAdrianRandomiser() {
        self.isAdrian = false;
        const randomNumber = Math.floor(Math.random() * 20);
        if (randomNumber === 5) {
          if (
            self.settings.currentDataProvider.dataProviderName
              .toLowerCase()
              .includes("adrian") ||
            self.settings.currentDataProvider.dataProviderDBPath
              .toLowerCase()
              .includes("adrian")
          )
            self.isAdrian = true;
        } else {
          self.isAdrian = false;
        }
      },
      rsFetchCabinetVisionMaterials: flow(
        function* rsFetchCabinetVisionMaterials() {
          const settings = self.settings.currentDataProvider;
          const materials = yield setupMaterialModel(
            settings.dataProviderDBPath,
            settings.dataProviderConnectionType,
            settings.dataProviderArchitecture
          );
          // self.materials = materials;
          self.materials.splice(0, self.materials.length);
          materials.forEach((material: MaterialModelType) => {
            self.materials.push(material);
          });
        }
      ),
      rsUpdateCabinetVisionmaterials: flow(
        function* rsUpdateCabinetVisionmaterials() {
          yield updateCabinetVisionMaterials(self.materials);
        }
      ),
      rsPrintRunSheet: flow(function* rsPrintRunSheet() {
        const printerObject =
          self.settings.nestSheetPrinter.printerForElectron();
        const printed = yield printRunSheet(printerObject);
        return printed;
      }),
      rsGetAvailablePrinters: flow(function* rsGetAvailablePrinters() {
        const printers = yield getAvailablePrinters();
        self.availablePrinters = printers;
      }),
      setJobStatus(status: string) {
        self.jobStatus = status;
        return;
      },
      setSettingPath(path: string) {
        self.settingsPath = path;
        localStorage.setItem("run-sheet-settings-path", path);
      },
    };
  });

//Export Root Store and Type
export type RootStoreType = Instance<typeof RootStoreModel>;
export const setupRootStore = async () => {
  const settingsPath = await loadSettingsPathfromLS();
  const initSettings = await loadSettings(settingsPath);
  const defaultJobInformation = await setupJobInformationModel();
  const defaultCabinetCount = await setupCabinetCountModel();
  let defaultMaterials: MaterialModelType[] = [];
  if (initSettings.currentDataProvider) {
    const settings = initSettings.currentDataProvider;
    try {
      defaultMaterials = await setupMaterialModel(
        settings.dataProviderDBPath,
        settings.dataProviderConnectionType,
        settings.dataProviderArchitecture
      );
    } catch (error) {
      console.log(error);
      defaultMaterials = [];
    }
  }
  const initBrands = await getAvailableBrandsFromCloud();
  const initMaterialOptions = await getMaterialOptions();
  const initFinishOptions = await getFinishOptions();
  const availablePrinters = await getAvailablePrinters();
  const rs: RootStoreType = RootStoreModel.create({
    appName: "THIS IS AN APP",
    computerName: getComputerName(),
    jobStatus: "Order",
    jobInformation: defaultJobInformation,
    cabinetInformation: defaultCabinetCount,
    materials: defaultMaterials,
    materialBrands: initBrands,
    materialOptions: initMaterialOptions,
    finishOptions: initFinishOptions,
    settings: initSettings,
    availablePrinters: availablePrinters,
    isAdrian: false,
    settingsPath: settingsPath,
  });
  onSnapshot(rs.settings, (settingSnapshot: SettingsInformationModelType) => {
    localStorage.setItem("run-sheet-settings", JSON.stringify(settingSnapshot));
  });
  console.log("Root Store Initilizing");
  return rs;
};
