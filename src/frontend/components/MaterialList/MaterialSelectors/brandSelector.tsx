//NPM Imports
import React from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { RootStoreType } from "../../../models/root-store";
import { MaterialModelType } from "../../../models/material-model";

type BrandSelectorProps = {
  material: MaterialModelType;
};

type DropDownSelectorObject = {
  name: string;
  id: string;
};

const BrandSelector: React.FC<BrandSelectorProps> = observer(({ material }) => {
  const rootStore: RootStoreType = useRootStore();

  const ensureDropDownSelectorObject = (
    brandName: DropDownSelectorObject | string
  ) => {
    const brandNameObject =
      typeof brandName === "string"
        ? { name: brandName, id: brandName }
        : brandName;
    updateMaterialBrand(brandNameObject);
  };

  const updateMaterialBrand = (brandName: DropDownSelectorObject) => {
    material.updateMaterialBrand(brandName.name);
  };

  return (
    <Dropdown
      value={material.materialBrand}
      onChange={(e: DropdownChangeEvent) =>
        ensureDropDownSelectorObject(e.value)
      }
      options={rootStore.materialBrands}
      optionLabel="name"
      editable
      placeholder="Select Material Brand"
    />
  );
});

export default BrandSelector;
