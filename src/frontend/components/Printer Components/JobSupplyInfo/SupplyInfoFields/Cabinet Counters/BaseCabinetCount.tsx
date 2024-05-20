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
import { RootStoreType } from "../../../../../models/root-store";

const BaseCabinetCount: React.FC = observer(() => {

  const rootStore: RootStoreType = useRootStore();
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
    <div className="text-xl flex flex-row gap-2">
      <h1 className="font-black">Base Qty:</h1>
      <h2>{cabinetInformation.cabinetCountBase}</h2>
    </div>
  );
});

export default BaseCabinetCount;
