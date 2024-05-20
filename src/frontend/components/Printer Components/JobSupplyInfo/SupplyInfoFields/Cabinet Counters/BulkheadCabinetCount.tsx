//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

//Local Imports
import { useRootStore } from "../../../../../providers/RootStoreProvider";
import { CabinetCountModelType } from "../../../../../models/cabinet-count-model";

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
    <div className="text-xl flex flex-row gap-2">
      <h1 className="font-black">Bulkhead Qty:</h1>
      <h2>{cabinetInformation.cabinetCountBulkhead}</h2>
    </div>
  );
});

export default BulkheadCabinetCount;
