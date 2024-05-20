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
    <div className="p-inputgroup h-full  text-[0.5rem] m-0 p-0 flex flex-col w-16">
      <span className="w-16 m-0 p-0 text-center">Hand Edge Qty:</span>
      <InputNumber
        inputId="integeronly"
        buttonLayout="vertical"
        value={cabinetInformation.cabinetSharkNoseParts}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          updateSharkNoseQty(e.value)
        }
      />
    </div>
  );
});

export default ShakrNoseParts;
