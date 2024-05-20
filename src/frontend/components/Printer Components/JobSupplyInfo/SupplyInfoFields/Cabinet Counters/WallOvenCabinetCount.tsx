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

const WallOvenCabinetCount: React.FC = observer(() => {
  const { cabinetInformation }: { cabinetInformation: CabinetCountModelType } =
    useRootStore();

  const updateWallOvenCabinetCount = (wallOvenCabinetCount: number) => {
    if (wallOvenCabinetCount === null || wallOvenCabinetCount === undefined) {
      cabinetInformation.setCabinetCountWallOven(0);
      return;
    }
    cabinetInformation.setCabinetCountWallOven(wallOvenCabinetCount);
  };

  return (
    <div className="text-xl flex flex-row gap-2">
      <h1 className="font-black">Oven Tower Qty:</h1>
      <h2>{cabinetInformation.cabinetCountWallOven}</h2>
    </div>
  );
});

export default WallOvenCabinetCount;
