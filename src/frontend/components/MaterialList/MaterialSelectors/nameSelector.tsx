//NPM Imports
import React from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { RootStoreType } from "../../../models/root-store";
import { MaterialModelType } from "../../../models/material-model";
import MaterialNameModel, {
  MaterialNameModelType,
} from "../../../models/material-name-model";

type NameSelectorProps = {
  material: MaterialModelType;
};

type DropDownSelectorObject = {
  name: string;
  id: number;
};

const nameSelector: React.FC<NameSelectorProps> = observer(({ material }) => {
  const rootStore: RootStoreType = useRootStore();

  const ensureDropDownSelectorObject = (
    materialName: DropDownSelectorObject | string
  ) => {
    const materialNameObject =
      typeof materialName === "string"
        ? { name: materialName, id: 0 }
        : materialName;
    updateMaterialName(materialNameObject);
  };

  const updateMaterialName = (materialNameSelector: DropDownSelectorObject) => {
    const materialName = rootStore.materialNameByID(materialNameSelector.id);
    if (!materialName) {
      material.updateMaterialName(
        MaterialNameModel.create({
          materialNameID: rootStore.uniqueMaterialIndentifier,
          materialNameName: materialNameSelector.name,
          materialNameBrand: material.materialBrand,
        })
      );
    } else {
      material.updateMaterialName(materialName);
    }
  };

  return (
    <Dropdown
      value={material.materialName?.materialNameName || ""}
      onChange={(e: DropdownChangeEvent) =>
        ensureDropDownSelectorObject(e.value)
      }
      options={rootStore.materialNameOptions(material.materialBrand)}
      optionLabel="name"
      editable
      placeholder="Select Material Brand"
    />
  );
});

export default nameSelector;
