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
    const updateEdgeQty = (e: InputNumberValueChangeEvent) => {
      material.updateEdgeQty(e.value);
    };

    return (
      <InputNumber
        inputId="integeronly"
        value={material.materialEdgeQty}
        onValueChange={(e: InputNumberValueChangeEvent) => updateEdgeQty(e)}
      />
    );
  }
);

export default EdgeQtySelector;
