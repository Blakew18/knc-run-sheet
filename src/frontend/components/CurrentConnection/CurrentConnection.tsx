//NPM Import
import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
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

  const toast = useRef(null);

  const accept = () => {
    handleRefresh()
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
}

const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
}

const confirm1 = () => {
  confirmDialog({
      message: 'Are you sure you want to refresh?',
      header: 'Refresh Page?',
      icon: 'pi pi-exclamation-triangle',
      // defaultFocus: 'accept',
      accept,
      reject
  });
};


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

  if (rootStore.browserInstance === 'Print') return <></>


  return (
    <div className="flex flex-row-reverse h-full content-center py-2 pr-2">
      {loadingDialog()}
      <Toast ref={toast} />
      <ConfirmDialog />
      <Button label="Refresh" onClick={confirm1} />
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
