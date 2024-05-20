//NMP Imports
import React from "react";
import { observer } from "mobx-react";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

//Local Imports
import { MaterialModelType } from "../../../../models/material-model";

type ThicknessSelectorProps = {
  material: MaterialModelType;
};

const ThicknessSelector: React.FC<ThicknessSelectorProps> = observer(
  ({ material }) => {

    return (
      <p className="text-center">{material.materialThickness}</p>
    );
  }
);

export default ThicknessSelector;
