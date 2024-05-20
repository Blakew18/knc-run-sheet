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

const DrawerCabinetCount: React.FC = observer(() => {
  const { cabinetInformation }: { cabinetInformation: CabinetCountModelType } =
    useRootStore();

  const updateDrawerCabinetCount = (drawerCabinetCount: number) => {
    if (drawerCabinetCount === null || drawerCabinetCount === undefined) {
      cabinetInformation.setCabinetCountDrawer(0);
      return;
    }
    cabinetInformation.setCabinetCountDrawer(drawerCabinetCount);
  };

  return (
    <div className="text-xl flex flex-row gap-2">
      <h1 className="font-black">Drawer Qty:</h1>
      <h2>{cabinetInformation.cabinetCountDrawer}</h2>
    </div>
  );
});

export default DrawerCabinetCount;
