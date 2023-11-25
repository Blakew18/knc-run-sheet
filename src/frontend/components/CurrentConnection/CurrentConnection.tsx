//NPM Import
import React, { useState } from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
//Local Imports
import { useRootStore } from "../../providers/RootStoreProvider";
import { RootStoreType } from "../../models/root-store";
import { SettingsInformationModelType } from "../../models/settings-information-model";
import LoadingDialog from "../Loading/LoadingDialog";
type DropDownSelectorObject = {
  id: number;
  name: string;
};

const CurrentConnection: React.FC = observer(() => {
  const rootStore: RootStoreType = useRootStore();
  const { settings }: { settings: SettingsInformationModelType } =
    useRootStore();

  const [loading, setLoading] = useState(false);

  const loadingDialog = () => {
    if (loading) {
      return <LoadingDialog />;
    }
  };

  const providerOptions: DropDownSelectorObject[] =
    settings.providersForDropdown;

  const handleProviderChange = async (e: DropdownChangeEvent) => {
    settings.setCurrentDataProvider(e.value.id);
    await handleRefresh();
  };

  const handleRefresh = async () => {
    rootStore.rsAdrianRandomiser();
    setLoading(true);
    await rootStore.jobInformation.resetJobInfoStore(rootStore.companySettings);
    rootStore.cabinetInformation.resetCabinetCount();
    await rootStore.rsFetchCabinetVisionMaterials();
    await rootStore.rsFetchCabinetVisionMaterials();
    if (rootStore.isAdrian) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row-reverse h-full content-center py-2 pr-2">
      {loadingDialog()}
      <Button label="Refresh" onClick={handleRefresh} />
      <div className="w-48">
        <Dropdown
          className="run-sheet-dropdown"
          value={settings.currentDataProviderForDropDown}
          onChange={handleProviderChange}
          options={providerOptions}
          optionLabel="name"
          placeholder="Select Data Provider"
        />
      </div>
    </div>
  );
});

export default CurrentConnection;
