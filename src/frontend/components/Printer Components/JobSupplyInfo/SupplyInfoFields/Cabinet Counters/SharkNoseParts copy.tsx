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

const ShakrNoseParts: React.FC = observer(() => {

  const rootStore: RootStoreType = useRootStore();
  const { cabinetInformation }: { cabinetInformation: CabinetCountModelType } =
    useRootStore();

  const updateSharkNoseQty = (sharkNoseQty: number) => {
    if (sharkNoseQty === null || sharkNoseQty === undefined) {
      cabinetInformation.setCabientCountSharkNoseParts(0);
      return;
    }
    cabinetInformation.setCabientCountSharkNoseParts(sharkNoseQty);
  };


  return (
    <div className="text-xl flex flex-row gap-2">
      <h1 className="font-black">Shark Nose Qty:</h1>
      <h2>{cabinetInformation.cabinetSharkNoseParts}</h2>
    </div>
  );
});

export default ShakrNoseParts;
