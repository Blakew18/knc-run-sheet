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

const InnerDrawerCabinetCount: React.FC = observer(() => {
  const { cabinetInformation }: { cabinetInformation: CabinetCountModelType } =
    useRootStore();

  const updateInnerDrawerCabinetCount = (innerDrawerCabinetCount: number) => {
    if (
      innerDrawerCabinetCount === null ||
      innerDrawerCabinetCount === undefined
    ) {
      cabinetInformation.setCabinetCountInnerDrawer(0);
      return;
    }
    cabinetInformation.setCabinetCountInnerDrawer(innerDrawerCabinetCount);
  };

  return (
    <div className="p-inputgroup h-full  text-[0.5rem] m-0 p-0 flex flex-col w-16">
      <span className="w-16 m-0 p-0 text-center">Inner Drawer Qty:</span>
      <InputNumber
        inputId="integeronly"
        buttonLayout="vertical"
        value={cabinetInformation.cabinetCountInnerDrawer}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          updateInnerDrawerCabinetCount(e.value)
        }
      />
    </div>
  );
});

export default InnerDrawerCabinetCount;
