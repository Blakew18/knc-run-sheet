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

const KickCabinetCount: React.FC = observer(() => {
  const { cabinetInformation }: { cabinetInformation: CabinetCountModelType } =
    useRootStore();

  const updateKickCabinetCount = (kickCabinetCount: number) => {
    if (kickCabinetCount === null || kickCabinetCount === undefined) {
      cabinetInformation.setCabinetCountKicks(0);
      return;
    }
    cabinetInformation.setCabinetCountKicks(kickCabinetCount);
  };

  return (
    <div className="text-xl flex flex-row gap-2">
      <h1 className="font-black">Kick Qty:</h1>
      <h2>{cabinetInformation.cabinetCountKicks}</h2>
    </div>
  );
});

export default KickCabinetCount;
