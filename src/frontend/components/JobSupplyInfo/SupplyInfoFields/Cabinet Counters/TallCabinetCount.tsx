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
    <div className="p-inputgroup h-full text-[0.5rem] m-0 p-0 flex flex-col w-16">
      <span className="w-16 m-0 p-0 text-center">Tall Qty:</span>
      <InputNumber
        inputId="integeronly"
        buttonLayout="vertical"
        value={cabinetInformation.cabinetCountTall}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          updateTallCabinetCount(e.value)
        }
      />
    </div>
  );
});

export default TallCabinetCount;
