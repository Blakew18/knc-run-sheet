//Npm Imports
import { types, Instance } from "mobx-state-tree";
import _ from "lodash";

//Local Imports
import MaterialNameModel, {
  MaterialNameModelType,
} from "./material-name-model";
import MaterialFinishesModel from "./material-finishes-model";

const MaterialModel = types
  .model("MaterialModel", {
    cvMaterialID: types.identifierNumber,
    cvMaterialName: types.string,
    materialQuantity: types.integer,
    materialBrand: types.maybe(types.string),
    materialName: types.maybe(MaterialNameModel),
    materialFinish: types.maybe(MaterialFinishesModel),
    materialNotes: types.maybe(types.string),
  })
  .actions((self) => {
    return {
      updateMaterialBrand(brand: string) {
        self.materialBrand = brand;
      },
      updateMaterialName(material: MaterialNameModelType) {
        self.materialName = _.cloneDeep(material);
        console.log(self.materialName);
      },
    };
  });

export type MaterialModelType = Instance<typeof MaterialModel>;
export default MaterialModel;
