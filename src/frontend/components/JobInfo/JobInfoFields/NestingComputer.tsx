//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import { InputText } from "primereact/inputtext";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { RootStoreType } from "../../../models/root-store";

const NestingComputer: React.FC = observer(() => {
  const rootStore: RootStoreType = useRootStore();

  return (
    <div className="h-[12%] w-full">
      <div className="p-inputgroup h-full">
        <span className="p-inputgroup-addon w-36">Nesting Computer:</span>
        <InputText disabled id="nestComputer" value={rootStore.computerName} />
      </div>
    </div>
  );
});

export default NestingComputer;
