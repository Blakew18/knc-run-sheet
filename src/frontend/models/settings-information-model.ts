//NPM Import
import {
  types,
  Instance,
  IArrayType,
  IMSTArray,
  IModelType,
  ISimpleType,
  IStateTreeNode,
  _NotCustomized,
} from "mobx-state-tree";

//Local Imports
import DataProviderModel from "./data-provider-model";
import PrinterModel from "./printer.model";

const SettingsInformationModel = types
  .model("SettingsInformationModel", {
    outputString: types.array(
      types.model({ id: types.string, content: types.string })
    ),
    dataProviders: types.array(DataProviderModel),
    currentDataProvider: types.maybe(DataProviderModel),
    nestSheetPrinter: PrinterModel,
    test: types.array(types.string),
  })
  .views((self) => {
    return {
      get outputStringOptions() {
        return self.outputString.map((output) => {
          return { id: output.id, content: output.content };
        });
      },
    };
  })
  .actions((self) => ({
    updateOutputString(outputString: { id: string; content: string }[]) {
      self.outputString.splice(0, outputString.length);
      outputString.forEach((output) => {
        return self.outputString.push(output);
      });
    },
  }));

export type SettingsInformationModelType = Instance<
  typeof SettingsInformationModel
>;
export default SettingsInformationModel;
