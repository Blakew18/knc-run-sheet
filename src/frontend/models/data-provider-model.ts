//NPM Import
import { types, Instance } from "mobx-state-tree";

//Local Imports

const DataProviderModel = types.model("DataProviderModel", {
  dataProviderID: types.identifierNumber,
  dataProviderName: types.string,
  dataProviderDBPath: types.string,
  dataProviderArchitecture: types.boolean,
  dataProviderConnectionType: types.string,
});

export type DataProviderModelType = Instance<typeof DataProviderModel>;
export default DataProviderModel;
