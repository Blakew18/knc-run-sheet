//Npm Imports
import { types, Instance } from "mobx-state-tree";
import _ from "lodash";

//Local Imports
import MaterialNameModel, {
  MaterialNameModelType,
} from "./material-name-model";
import MaterialFinishesModel, {
  MaterialFinishesModelType,
} from "./material-finishes-model";

const MaterialModel = types
  .model("MaterialModel", {
    cvMaterialID: types.identifierNumber,
    cvMaterialName: types.string,
    materialQuantity: types.integer,
    materialBrand: types.maybe(types.string),
    materialName: types.maybe(MaterialNameModel),
    materialFinish: types.maybe(MaterialFinishesModel),
    materialNotes: types.maybe(types.string),
    materialNotesSwitch: types.boolean,
    materialEdgeQty: types.integer,
    materialNewName: types.maybe(types.string),
    materialThickness: types.number,
  })
  .actions((self) => {
    return {
      updateMaterialBrand(brand: string) {
        self.materialBrand = brand;
        self.materialName = undefined;
        self.materialNewName = undefined;
      },
      updateMaterialName(material: MaterialNameModelType) {
        self.materialName = _.cloneDeep(material);
        self.materialFinish = undefined;
        self.materialNewName = undefined;
      },
      updateFinishName(finish: MaterialFinishesModelType) {
        self.materialFinish = _.cloneDeep(finish);
      },
      updateNewNameOnCompletion() {
        self.materialNewName = `${self.materialBrand}_${self.materialName?.materialNameName}_${self.materialFinish?.materialFinishName}`;
      },
      updateNotesSwitch(status: boolean) {
        self.materialNotesSwitch = status;
      },
      updateEdgeQty(qty: number) {
        if (qty < 0) {
          qty = 0;
        } else {
          self.materialEdgeQty = Math.round(qty);
        }
      },
    };
  });

export type MaterialModelType = Instance<typeof MaterialModel>;
export default MaterialModel;
