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
    <div className="p-inputgroup h-full  text-[0.5rem] m-0 p-0 flex flex-col w-16">
      <span className="w-16 m-0 p-0 text-center">Kick Qty:</span>
      <InputNumber
        inputId="integeronly"
        buttonLayout="vertical"
        value={cabinetInformation.cabinetCountKicks}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          updateKickCabinetCount(e.value)
        }
      />
    </div>
  );
});

export default KickCabinetCount;
