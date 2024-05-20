//NMP Imports
import React from "react";
import { observer } from "mobx-react";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

//Local Imports
import { MaterialModelType } from "../../../../models/material-model";

type EdgeQtySelectorProps = {
  material: MaterialModelType;
};

const EdgeQtySelector: React.FC<EdgeQtySelectorProps> = observer(
  ({ material }) => {

    return (
      <p className="text-center">{material.materialEdgeQty}</p>
    );
  }
);

export default EdgeQtySelector;
