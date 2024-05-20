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
    <div className="text-xl flex flex-row gap-2">
      <h1 className="font-black">Inner Drawer Qty:</h1>
      <h2>{cabinetInformation.cabinetCountInnerDrawer}</h2>
    </div>
  );
});

export default InnerDrawerCabinetCount;
