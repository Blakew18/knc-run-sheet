//NPM Imports
import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

//Local Imports
import { useRootStore } from "../../providers/RootStoreProvider";
import { SettingsInformationModelType } from "../../models/settings-information-model";
import { Button } from "primereact/button";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { verifyDatabaseConnection } from "../../providers/Services";
import { DataProviderModelType } from "../../models/data-provider-model";

interface NewDatabaseConnectionProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  currentConnection?: DataProviderModelType;
  setCurrentConnection?: (connection: DataProviderModelType) => void;
}

const archOptions: string[] = ["64Bit", "32Bit"];
const providerOptions: string[] = [
  "Microsoft.ACE.OLEDB.12.0",
  "Microsoft.Jet.OLEDB.4.0",
];

const NewDatabaseConnection: React.FC<NewDatabaseConnectionProps> = observer(
  ({ visible, setVisible, currentConnection, setCurrentConnection }) => {
    const toast = useRef<Toast>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { settings }: { settings: SettingsInformationModelType } =
      useRootStore();

    const [verified, setVerified] = useState<boolean>(false);
    const [connectionName, setConnectionName] = useState<string>(
      currentConnection?.dataProviderName || ""
    );
    const [arch, setArch] = useState<boolean>(
      currentConnection?.dataProviderArchitecture || true
    );
    const [provider, setProvider] = useState<string>(
      currentConnection?.dataProviderConnectionType || providerOptions[0]
    );
    const [dbPath, setDbPath] = useState<string>(
      currentConnection?.dataProviderDBPath || ""
    );
    const [checkVerification, setCheckVerification] = useState(false);

    const defaultAllState = () => {
      setVerified(false);
      setConnectionName("");
      setArch(true);
      setProvider(providerOptions[0]);
      setDbPath("");
      setCheckVerification(false);
    };

    const unVerifiyConnection = () => {
      setVerified(false);
    };

    const verifyConnectionName = (): boolean => {
      return !settings.checkForDataProviderName(
        connectionName,
        currentConnection?.dataProviderID
      );
    };

    const verifyConnectionToDb = async (): Promise<boolean> => {
      try {
        return await verifyDatabaseConnection(dbPath, provider, arch);
      } catch {
        return false;
      }
    };

    const verifyNewConnection = async () => {
      setCheckVerification(true);
      const dBConnection = await verifyConnectionToDb();
      const dBConnectionName = verifyConnectionName();
      setVerified(dBConnection && dBConnectionName);

      if (!dBConnection) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Connection To Database Not Possible",
          life: 3000,
        });
      }

      if (!dBConnectionName) {
        toast.current?.show({
          severity: "warn",
          summary: "Warning",
          detail: "Name In use, Please Try Another Name",
          life: 3000,
        });
      }

      setCheckVerification(false);
    };

    const saveNewConnection = () => {
      settings.addDataProvider(connectionName, dbPath, provider, arch);
      defaultAllState();
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files?.length > 0) {
        const path = files[0].path; // Note: This might not work in all browsers as mentioned
        setVerified(false);
        setDbPath(path);
      }
    };

    const openFileDialog = () => {
      fileInputRef.current?.click();
    };

    const setNewConnectionName = (name: string) => {
      unVerifiyConnection();
      setConnectionName(name);
    };

    const setNewProvider = (provider: string) => {
      unVerifiyConnection();
      setProvider(provider);
    };

    const setNewArch = (arch: string) => {
      unVerifiyConnection();
      if (arch === "64Bit") {
        setArch(true);
      } else {
        setArch(false);
      }
    };

    const displayArch = () => {
      if (arch) {
        return archOptions[0];
      } else {
        return archOptions[1];
      }
    };

    const renderVerifyOrSaveButton = () =>
      verified ? (
        <Button
          label="Save"
          className="bg-blue-400 hover:bg-blue-500 text-white rounded shadow"
          onClick={() => {
            saveNewConnection();
            setVisible(false);
          }}
        />
      ) : (
        <Button
          label="Verify"
          className="bg-blue-400 hover:bg-blue-500 text-white rounded shadow"
          onClick={verifyNewConnection}
          icon="pi pi-check"
          loading={checkVerification}
        />
      );

    useEffect(() => {
      if (currentConnection) {
        setConnectionName(currentConnection.dataProviderName || "");
        setArch(currentConnection.dataProviderArchitecture || true);
        setProvider(
          currentConnection.dataProviderConnectionType || providerOptions[0]
        );
        setDbPath(currentConnection.dataProviderDBPath || "");
      } else {
        defaultAllState(); // Reset to default state if currentConnection is null
      }
    }, [currentConnection]);

    return (
      <div>
        <Toast ref={toast} />
        <Dialog
          header="New Connection"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => {
            defaultAllState();
            setVisible(false);
            if (setCurrentConnection) {
              setCurrentConnection(null);
            }
          }}
        >
          <div className="p-inputgroup h-full text-xs font-semibold">
            <span className="p-inputgroup-addon w-36">Connection Name</span>
            <InputText
              value={connectionName}
              onChange={(e) => setNewConnectionName(e.target.value)}
            />
          </div>
          <div className="p-inputgroup h-full text-xs font-semibold">
            <span className="p-inputgroup-addon w-36">Database Path</span>
            <InputText value={dbPath} disabled />
            <Button
              label="Browse"
              className="p-button-outlined"
              onClick={openFileDialog}
            />
          </div>
          <div className="p-inputgroup h-full text-xs font-semibold">
            <span className="p-inputgroup-addon w-36">Connection Provider</span>
            <SelectButton
              value={provider}
              onChange={(e: SelectButtonChangeEvent) => setNewProvider(e.value)}
              options={providerOptions}
            />
          </div>
          <div className="p-inputgroup h-full text-xs font-semibold">
            <span className="p-inputgroup-addon w-36">Database Arch</span>
            <SelectButton
              value={displayArch()}
              onChange={(e: SelectButtonChangeEvent) => setNewArch(e.value)}
              options={archOptions}
            />
          </div>
          <div className="flex justify-end">{renderVerifyOrSaveButton()}</div>
        </Dialog>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: "none" }}
          accept=".accdb,.mdb"
        />
      </div>
    );
  }
);

export default NewDatabaseConnection;
