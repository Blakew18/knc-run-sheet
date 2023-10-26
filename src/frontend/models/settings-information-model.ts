//NPM Import
import { types, Instance } from "mobx-state-tree";

//Local Imports
import DataProviderModel from "./data-provider-model";

const SettingsInformationModel = types.model("SettingsInformationModel", {
  outputString: types.array(
    types.model({ id: types.string, content: types.string })
  ),
  dataProviders: types.array(DataProviderModel),
  currentDataProvider: types.maybe(types.reference(DataProviderModel)),
});

export type SettingsInformationModelType = Instance<
  typeof SettingsInformationModel
>;
export default SettingsInformationModel;
