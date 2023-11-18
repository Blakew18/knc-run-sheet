//NPM Imports
import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Local Imports
import { useRootStore } from "../../providers/RootStoreProvider";
import { SettingsInformationModelType } from "../../models/settings-information-model";
import { DataProviderModelType } from "../../models/data-provider-model";
import { Button } from "primereact/button";
import NewDatabaseConnection from "./NewDatabaseConnecion";

const DatabaseConnector: React.FC = observer(() => {
  const { settings }: { settings: SettingsInformationModelType } =
    useRootStore();

  const [visible, setVisible] = useState<boolean>(false);
  const [edit, setEdit] = useState<DataProviderModelType>(null);

  const editButton = (rowData: DataProviderModelType) => {
    return (
      <Button
        className="bg-blue-400 hover:bg-blue-500 text-white shadow"
        icon="pi pi-pencil"
        rounded
        aria-label="Filter"
        onClick={() => {
          setEdit(rowData);
        }}
      />
    );
  };

  const deleteButton = (rowData: DataProviderModelType) => {
    return (
      <Button
        className="bg-red-400 hover:bg-red-500 text-white shadow"
        icon="pi pi-times"
        rounded
        aria-label="Filter"
        onClick={() => {
          settings.deleteProvider(rowData.dataProviderID);
        }}
      />
    );
  };

  useEffect(() => {
    if (edit !== null) {
      setVisible(true);
    }
  }, [edit]);

  return (
    <div className="h-[100%] ">
      <div className="absolute top-2 right-2">
        <Button
          className="bg-blue-400 hover:bg-blue-500 text-white rounded shadow"
          icon="pi pi-plus-circle"
          rounded
          onClick={() => {
            setEdit(null);
            setVisible(true);
          }}
        />
      </div>
      <DataTable
        scrollable
        scrollHeight="100%"
        key={settings.providerArrayUniqueID}
        value={settings.dataProviders}
        tableStyle={{ minWidth: "50rem" }}
        style={{ height: "100%" }}
      >
        <Column field="dataProviderName" header="Name"></Column>
        <Column field="dataProviderDBPath" header="Path"></Column>
        <Column field="dataProviderConnectionType" header="Provider?"></Column>
        <Column field="dataProviderArchitecture" header="64Bit?"></Column>
        <Column header="Edit" body={editButton}></Column>
        <Column header="Delete" body={deleteButton}></Column>
      </DataTable>
      <NewDatabaseConnection
        visible={visible}
        setVisible={setVisible}
        currentConnection={edit}
        setCurrentConnection={setEdit}
      />
    </div>
  );
});

export default DatabaseConnector;
