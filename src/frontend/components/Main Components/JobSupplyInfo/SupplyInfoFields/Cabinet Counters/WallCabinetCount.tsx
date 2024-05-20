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
    <div className="p-inputgroup h-full text-[0.5rem] m-0 p-0 flex flex-col w-16">
      <span className="w-16 m-0 p-0 text-center">Wall Qty:</span>
      <InputNumber
        inputId="integeronly"
        buttonLayout="vertical"
        value={cabinetInformation.cabinetCountWall}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          updateWallCabinetCount(e.value)
        }
      />
    </div>
  );
});

export default WallCabinetCount;
