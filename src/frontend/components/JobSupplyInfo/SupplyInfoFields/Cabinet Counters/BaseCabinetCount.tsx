//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

//Local Imports
import { useRootStore } from "../../../../providers/RootStoreProvider";
import { CabinetCountModelType } from "../../../../models/cabinet-count-model";
import "../supply-info-fields.css";

const BaseCabinetCount: React.FC = observer(() => {
  const { cabinetInformation }: { cabinetInformation: CabinetCountModelType } =
    useRootStore();

  const updateBaseCabinetCount = (baseCabinetCount: number) => {
    if (baseCabinetCount === null || baseCabinetCount === undefined) {
      cabinetInformation.setCabinetCountBase(0);
      return;
    }
    cabinetInformation.setCabinetCountBase(baseCabinetCount);
  };

  return (
    <div className="p-inputgroup h-full  text-[0.5rem] m-0 p-0 flex flex-col w-16">
      <span className="w-16 m-0 p-0 text-center">Base Qty:</span>
      <InputNumber
        inputId="integeronly"
        buttonLayout="vertical"
        value={cabinetInformation.cabinetCountBase}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          updateBaseCabinetCount(e.value)
        }
      />
    </div>
  );
});

export default BaseCabinetCount;
