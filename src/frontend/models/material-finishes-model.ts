import { types, flow, Instance } from "mobx-state-tree";

const MaterialFinishesModel = types.model("MaterialFinishesModel", {
  materialFinishID: types.identifierNumber,
  materialFinishName: types.string,
  materialFinishImage: types.maybe(types.string),
});

export type MaterialFinishesModelType = Instance<typeof MaterialFinishesModel>;
export default MaterialFinishesModel;
