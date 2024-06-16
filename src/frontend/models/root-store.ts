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
  printEdgeLabels,
  loadSettingsPathfromLS,
  saveSettings,
  getAppVersion,
  initializeAxiosInstance,
} from "../providers/Services";
import MaterialFinishesModel from "./material-finishes-model";
import CompanyInformationModel, {
  CompanyInformationModelType,
} from "./company-information-model";

export const RootStoreModel = types
  .model("RootStore", {
    appName: types.string,
    appVersion: types.string,
    browserInstance: types.enumeration("BrowserInstance", ["Main", "Print"]),
    printerName: types.string,
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
    companySettings: types.maybe(CompanyInformationModel),
  })
  .views((self) => {
    return {
      get materialArrayUniqueID() {
        const randomNumber = Math.floor(Math.random() * 100000000);
        let total = randomNumber;
        let multiplier = 2;
        self.materials.forEach((material) => {
          const nameAsNumber =
            parseInt(material.materialNewName?.replace(/^#/, ""), 16) ||
            multiplier * multiplier * multiplier;
          total += (material.cvMaterialID + nameAsNumber) * multiplier;
          multiplier += 1;
        });
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
      get materialNamesForEdging() {
        return self.materials
          .filter(
            (material) =>
              material.materialBrand &&
              material.materialName &&
              material.materialFinish
          )
          .map((material) => {
            return (
              material.materialBrand +
              " " +
              material.materialName.materialNameName +
              " " +
              material.materialFinish.materialFinishName
            );
          });
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
        // return { isValid: true, errors: errors };
        return { isValid: isValid, errors: errors };
      },
    };
  })
  .actions((self) => {
    return {
      rsAdrianRandomiser() {
        self.isAdrian = false;
        const randomNumber = Math.floor(Math.random() * 10);
        if (randomNumber === 3 || randomNumber === 5 || randomNumber === 9) {
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
      loadStoreUpdateFromLS() {
        if (localStorage.getItem("current-root-store")) {
          try {
            const localRootStore = localStorage.getItem("current-root-store");
            const loadedStore = JSON.parse(localRootStore);
            self.appName = loadedStore.appName;
            self.computerName = loadedStore.computerName;
            self.jobStatus = loadedStore.jobStatus;
            self.jobInformation = loadedStore.jobInformation;
            self.cabinetInformation = loadedStore.cabinetInformation;
            self.materials = loadedStore.materials;
            self.materialBrands = loadedStore.materialBrands;
            self.materialOptions = loadedStore.materialOptions;
            self.finishOptions = loadedStore.finishOptions;
            self.settings = loadedStore.settings;
            self.availablePrinters = loadedStore.availablePrinters;
            self.isAdrian = loadedStore.isAdrian;
            self.companySettings = loadedStore.companySettings;
          } catch (error) {}
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
          //For each material in self.materials run updateNewName Function
          self.materials.forEach((material) => {
            material.updateNewNameOnCompletion();
          });
          const settings = self.settings.currentDataProvider;
          yield updateCabinetVisionMaterials(
            settings.dataProviderDBPath,
            settings.dataProviderConnectionType,
            settings.dataProviderArchitecture,
            self.materials
          );
        }
      ),
      rsPrintRunSheet: flow(function* rsPrintRunSheet() {
        const printerObject =
          self.settings.nestSheetPrinter.printerForElectron();
        const printed = yield printRunSheet(printerObject);
        return printed;
      }),
      rsPrintLabels: flow(function* rsPrintLabels() {
        const printerObject = self.settings.labelPrinter.printerForElectron();
        const printed = yield printEdgeLabels(printerObject);
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
    };
  });

//Export Root Store and Type
export type RootStoreType = Instance<typeof RootStoreModel>;
export const setupRootStore = async () => {
  await initializeAxiosInstance();
  const browserInstance = await window.electronAPI.getWindowType();
  const companySettings = await loadSettingsPathfromLS();
  const initSettings = await loadSettings(companySettings);
  const defaultJobInformation = await setupJobInformationModel(companySettings);
  const defaultCabinetCount = await setupCabinetCountModel();
  let defaultMaterials: MaterialModelType[] = [];

  let initBrands;
  let initMaterialOptions;
  let initFinishOptions;
  let availablePrinters;

  if (browserInstance === "main_window") {
    initBrands = await getAvailableBrandsFromCloud();
    initMaterialOptions = await getMaterialOptions();
    initFinishOptions = await getFinishOptions();
    availablePrinters = await getAvailablePrinters();

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
  }

  const appVersion = await getAppVersion();
  const computerName = await getComputerName();
  const rs: RootStoreType = RootStoreModel.create({
    appName: "THIS IS AN APP",
    appVersion: appVersion,
    browserInstance: browserInstance === "main_window" ? "Main" : "Print",
    computerName: computerName,
    jobStatus: "Order",
    jobInformation: defaultJobInformation,
    cabinetInformation: defaultCabinetCount,
    materials: defaultMaterials,
    materialBrands: initBrands || [],
    materialOptions: initMaterialOptions || [],
    finishOptions: initFinishOptions || [],
    settings: initSettings,
    availablePrinters: availablePrinters || [],
    isAdrian: false,
    companySettings: companySettings,
  });

  if (browserInstance === "main_window") {
    onSnapshot(rs.settings, (settingSnapshot: SettingsInformationModelType) => {
      console.log("Settings Snapshot");
      saveSettings(
        rs.companySettings.companyName,
        rs.companySettings.companyKey,
        JSON.stringify(settingSnapshot)
      );
    });
    onSnapshot(
      rs.companySettings,
      (companySnapshot: CompanyInformationModelType) => {
        localStorage.setItem(
          "company-settings",
          JSON.stringify(companySnapshot)
        );
      }
    );
  }
  // onSnapshot(rs, (rootStoreSnapShot) => {
  //   localStorage.setItem(
  //     "current-root-store",
  //     JSON.stringify(rootStoreSnapShot)
  //   );
  // });
  console.log("Root Store Initilizing");
  return rs;
};
