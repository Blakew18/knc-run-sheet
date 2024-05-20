//NPM Import
import React from "react";
import { observer } from "mobx-react";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { FaCheck, FaTimes } from 'react-icons/fa'

//Local Imports
import { MaterialModelType } from "../../../../models/material-model";

type BrandSelectorProps = {
  material: MaterialModelType;
};

const NotesSwitch: React.FC<BrandSelectorProps> = observer(({ material }) => {

  return (
    <div >
    {material.materialNotesSwitch ? <FaCheck /> : <FaTimes />}
  </div>
  );
});

export default NotesSwitch;
