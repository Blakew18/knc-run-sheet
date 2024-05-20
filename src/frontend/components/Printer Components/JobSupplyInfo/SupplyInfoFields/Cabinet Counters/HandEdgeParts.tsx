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
    <div className="text-xl flex flex-row gap-2">
      <h1 className="font-black">Hand Edge Qty:</h1>
      <h2>{cabinetInformation.cabinetHandEdgeParts}</h2>
    </div>
  );
});

export default HandEdgeParts;
