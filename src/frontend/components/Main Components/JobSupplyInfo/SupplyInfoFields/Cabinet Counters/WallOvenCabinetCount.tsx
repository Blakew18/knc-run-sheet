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
    <div className="p-inputgroup h-full text-[0.5rem] m-0 p-0 flex flex-col w-16">
      <span className="w-16 m-0 p-0 text-center">W/Oven Qty:</span>
      <InputNumber
        inputId="integeronly"
        buttonLayout="vertical"
        value={cabinetInformation.cabinetCountWallOven}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          updateWallOvenCabinetCount(e.value)
        }
      />
    </div>
  );
});

export default WallOvenCabinetCount;
