//NPM Import
import { types, Instance } from "mobx-state-tree";
import _ from "lodash";
//Local Imports
import DataProviderModel from "./data-provider-model";
import PrinterModel from "./printer-model";
import LabelPrinterSettings from "../components/Settings/LabelPrinterSettings";

const SettingsInformationModel = types
  .model("SettingsInformationModel", {
    outputString: types.array(
      types.model({ id: types.string, content: types.string })
    ),
    dataProviders: types.array(DataProviderModel),
    currentDataProvider: types.maybe(DataProviderModel),
    nestSheetPrinter: PrinterModel,
    labelPrinter: PrinterModel,
  })
  .views((self) => {
    return {
      get providerArrayUniqueID() {
        let total = 0;
        let multiplier = 2;
        self.dataProviders.forEach((dataProvider) => {
          total +=
            parseInt(dataProvider.dataProviderDBPath.replace(/^#/, ""), 16) *
            multiplier;
          multiplier += 1;
        });
        console.log(total);
        return total;
      },
      get currentDataProviderForDropDown() {
        return self.currentDataProvider
          ? {
              id: self.currentDataProvider.dataProviderID,
              name: self.currentDataProvider.dataProviderName,
            }
          : null;
      },
      get outputStringOptions() {
        return self.outputString.map((output) => {
          return { id: output.id, content: output.content };
        });
      },
      get providersForDropdown() {
        return self.dataProviders.map((provider) => {
          return {
            id: provider.dataProviderID,
            name: provider.dataProviderName,
          };
        });
      },
    };
  })
  .actions((self) => ({
    deleteProvider(id: number) {
      const provider = self.dataProviders.find(
        (provider) => provider.dataProviderID === id
      );
      if (provider) {
        self.dataProviders.remove(provider);
      }
      if (self.currentDataProvider.dataProviderID === id) {
        self.currentDataProvider = undefined;
      }
    },
    setCurrentDataProvider(id: number) {
      const provider = self.dataProviders.find(
        (provider) => provider.dataProviderID === id
      );
      if (provider) {
        self.currentDataProvider = _.cloneDeep(provider);
      }
    },
    updateOutputString(outputString: { id: string; content: string }[]) {
      self.outputString.splice(0, outputString.length);
      outputString.forEach((output) => {
        return self.outputString.push(output);
      });
    },
    checkForDataProviderName(name: string, id?: number) {
      if (id) {
        const confrimMatch = self.dataProviders.find(
          (dp) => dp.dataProviderID === id
        );
        if (confrimMatch) {
          return false;
        }
      }

      const matchFound = self.dataProviders.some(
        (provider) => provider.dataProviderName === name
      );
      console.log(matchFound);
      if (matchFound) return true;
      return false;
    },
    addDataProvider(
      name: string,
      path: string,
      provider: string,
      arch: boolean
    ) {
      const matchFound = self.dataProviders.some(
        (provider) => provider.dataProviderName === name
      );
      if (matchFound) return;
      const newProvider = DataProviderModel.create({
        dataProviderID: self.dataProviders.length + 1,
        dataProviderName: name,
        dataProviderDBPath: path,
        dataProviderArchitecture: arch,
        dataProviderConnectionType: provider,
      });
      self.dataProviders.push(newProvider);
    },
  }));

export type SettingsInformationModelType = Instance<
  typeof SettingsInformationModel
>;
export default SettingsInformationModel;
