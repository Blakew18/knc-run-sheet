//NPM Imports
import React, { useState } from "react";
import { Button } from "primereact/button";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { observer } from "mobx-react";
//Local Imports
import { useRootStore } from "../../providers/RootStoreProvider";
import { RootStoreType } from "../../models/root-store";

const Header: React.FC = observer(() => {
  const rootStore: RootStoreType = useRootStore();

  const setJobStatus = (e: SelectButtonChangeEvent) => {
    if (e.value) rootStore.setJobStatus(e.value);
  };

  return (
    <div className="flex h-full justify-around items-center">
      <Button label="Submit" icon="pi pi-check" />
      <div className="text-3xl font-bold underline decoration-solid">
        CNC Run Sheet
      </div>
      <SelectButton
        value={rootStore.jobStatus}
        onChange={(e: SelectButtonChangeEvent) => setJobStatus(e)}
        options={rootStore.jobStatusOptions}
      />
    </div>
  );
});

export default Header;
