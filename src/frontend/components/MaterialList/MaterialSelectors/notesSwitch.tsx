//NPM Import
import React from "react";
import { observer } from "mobx-react";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { RootStoreType } from "../../../models/root-store";
import { MaterialModelType } from "../../../models/material-model";

type BrandSelectorProps = {
  material: MaterialModelType;
};

const NotesSwitch: React.FC<BrandSelectorProps> = observer(({ material }) => {
  const rootStore: RootStoreType = useRootStore();

  const updateMaterialNotes = (e: CheckboxChangeEvent) => {
    material.updateNotesSwitch(e.checked);
  };

  return (
    <Checkbox
      checked={material.materialNotesSwitch}
      onChange={updateMaterialNotes}
    />
  );
});

export default NotesSwitch;
