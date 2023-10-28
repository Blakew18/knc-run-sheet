import { types, flow, Instance } from "mobx-state-tree";

const MaterialNameModel = types.model("MaterialNameModel", {
  materialNameID: types.identifierNumber,
  materialNameName: types.string,
  materialNameBrand: types.string,
  materialNameImage: types.maybe(types.string),
});

export type MaterialNameModelType = Instance<typeof MaterialNameModel>;
export default MaterialNameModel;
