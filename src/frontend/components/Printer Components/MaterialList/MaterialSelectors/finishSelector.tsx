//NPM Imports
import React from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

//Local Imports
import { useRootStore } from "../../../../providers/RootStoreProvider";
import { RootStoreType } from "../../../../models/root-store";
import { MaterialModelType } from "../../../../models/material-model";
import MaterialFinishesModel, {
  MaterialFinishesModelType,
} from "../../../../models/material-finishes-model";

type FinishSelectorProps = {
  material: MaterialModelType;
};

type DropDownSelectorObject = {
  name: string;
  id: number;
};

const FinishSelector: React.FC<FinishSelectorProps> = observer(
  ({ material }) => {
    const rootStore: RootStoreType = useRootStore();

    const ensureDropDownSelectorObject = (
      finishName: DropDownSelectorObject | string
    ) => {
      const finishNameObject =
        typeof finishName === "string"
          ? { name: finishName, id: 0 }
          : finishName;
      updateFinishName(finishNameObject);
    };

    const updateFinishName = (finishNameSelector: DropDownSelectorObject) => {
      const finishName: MaterialFinishesModelType =
        rootStore.materialFinishByID(finishNameSelector.id);
      if (!finishName) {
        material.updateFinishName(
          MaterialFinishesModel.create({
            materialFinishID: rootStore.uniqueFinishIndentifier,
            materialFinishName: finishNameSelector.name,
            materialFinishMaterialID: material.materialName.materialNameID,
          })
        );
      } else {
        material.updateFinishName(finishName);
      }
    };
    return <p>{material.materialFinish?.materialFinishName || ""} </p>;
  }
);

export default FinishSelector;
