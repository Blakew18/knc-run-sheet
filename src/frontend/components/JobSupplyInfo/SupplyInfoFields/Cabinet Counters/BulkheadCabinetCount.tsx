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

const BulkheadCabinetCount: React.FC = observer(() => {
  const { cabinetInformation }: { cabinetInformation: CabinetCountModelType } =
    useRootStore();

  const updateBulkheadCabinetCount = (bulkheadCabinetCount: number) => {
    if (bulkheadCabinetCount === null || bulkheadCabinetCount === undefined) {
      cabinetInformation.setCabinetCountBulkhead(0);
      return;
    }
    cabinetInformation.setCabinetCountBulkhead(bulkheadCabinetCount);
  };

  return (
    <div className="p-inputgroup h-full  text-[0.5rem] m-0 p-0 flex flex-col w-16">
      <span className="w-16 m-0 p-0 text-center">Heads Qty:</span>
      <InputNumber
        inputId="integeronly"
        buttonLayout="vertical"
        value={cabinetInformation.cabinetCountBulkhead}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          updateBulkheadCabinetCount(e.value)
        }
      />
    </div>
  );
});

export default BulkheadCabinetCount;
