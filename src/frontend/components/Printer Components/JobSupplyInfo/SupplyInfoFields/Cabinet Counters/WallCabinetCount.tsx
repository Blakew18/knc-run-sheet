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

const WallCabinetCount: React.FC = observer(() => {
  const { cabinetInformation }: { cabinetInformation: CabinetCountModelType } =
    useRootStore();

  const updateWallCabinetCount = (wallCabinetCount: number) => {
    if (wallCabinetCount === null || wallCabinetCount === undefined) {
      cabinetInformation.setCabinetCountWall(0);
      return;
    }
    cabinetInformation.setCabinetCountWall(wallCabinetCount);
  };

  return (
    <div className="text-xl flex flex-row gap-2">
      <h1 className="font-black">Wall Qty:</h1>
      <h2>{cabinetInformation.cabinetCountWall}</h2>
    </div>
  );
});

export default WallCabinetCount;
