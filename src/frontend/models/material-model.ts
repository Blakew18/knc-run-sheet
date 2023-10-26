//Npm Imports
import { types, Instance } from "mobx-state-tree";

//Local Imports
import MaterialNameModel from "./material-name-model";
import MaterialFinishesModel from "./material-finishes-model";

const MaterialModel = types.model("MaterialModel", {
  cvMaterialID: types.identifierNumber,
  cvMaterialName: types.string,
  materialQuantity: types.integer,
  materialBrand: types.maybe(types.string),
  materialNameOptions: types.array(MaterialNameModel),
  materialName: types.maybe(MaterialNameModel),
  materialFinishOptions: types.array(MaterialFinishesModel),
  materialFinish: types.maybe(MaterialFinishesModel),
  materialNotes: types.maybe(types.string),
});

export type MaterialModelType = Instance<typeof MaterialModel>;
export default MaterialModel;
