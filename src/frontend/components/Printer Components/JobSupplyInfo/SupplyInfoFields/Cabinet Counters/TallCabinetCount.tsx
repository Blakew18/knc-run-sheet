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

const TallCabinetCount: React.FC = observer(() => {
  const { cabinetInformation }: { cabinetInformation: CabinetCountModelType } =
    useRootStore();

  const updateTallCabinetCount = (tallCabinetCount: number) => {
    if (tallCabinetCount === null || tallCabinetCount === undefined) {
      cabinetInformation.setCabinetCountTall(0);
      return;
    }
    cabinetInformation.setCabinetCountTall(tallCabinetCount);
  };

  return (
    <div className="text-xl flex flex-row gap-2">
      <h1 className="font-black">Tall Qty:</h1>
      <h2>{cabinetInformation.cabinetCountTall}</h2>
    </div>
  );
});

export default TallCabinetCount;
