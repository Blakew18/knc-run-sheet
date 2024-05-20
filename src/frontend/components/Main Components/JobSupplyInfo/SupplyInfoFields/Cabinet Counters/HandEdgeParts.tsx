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

const HandEdgeParts: React.FC = observer(() => {

  const rootStore: RootStoreType = useRootStore();
  const { cabinetInformation }: { cabinetInformation: CabinetCountModelType } =
    useRootStore();

  const updateHandEdgeParts = (handEdgeNumber: number) => {
    if (handEdgeNumber === null || handEdgeNumber === undefined) {
      cabinetInformation.setCabinetCountHandEdgeParts(0);
      return;
    }
    cabinetInformation.setCabinetCountHandEdgeParts(handEdgeNumber);
  };


  return (
    <div className="p-inputgroup h-full  text-[0.5rem] m-0 p-0 flex flex-col w-16">
      <span className="w-16 m-0 p-0 text-center">Hand Edge Qty:</span>
      <InputNumber
        inputId="integeronly"
        buttonLayout="vertical"
        value={cabinetInformation.cabinetHandEdgeParts}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          updateHandEdgeParts(e.value)
        }
      />
    </div>
  );
});

export default HandEdgeParts;
