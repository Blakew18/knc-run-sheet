//NPM Imports
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
//Local Imports
import Header from "./Main Components/Header/Header";
import JobInfo from "./Main Components/JobInfo/JobInfo";
import JobSupplyInfo from "./Main Components/JobSupplyInfo/JobSupplyInfo";
import JobNotes from "./Main Components/JobNotes/JobNotes";
import MaterialList from "./Main Components/MaterialList/MaterialList";
import CurrentConnection from "./CurrentConnection/CurrentConnection";
import { useRootStore } from "../providers/RootStoreProvider";
import { RootStoreType } from "../models/root-store";

const RunSheet: React.FC = () => {
  const rootStore: RootStoreType = useRootStore();
  const navigate = useNavigate();
  const toast = useRef(null);

  const clearToast = () => {
    toast.current.clear();
  };

  const restartApp = () => {
    window.electronAPI.restartApp();
  };

  const toastTemplate = (props: any) => {
    return (
      <div className="flex flex-col align-items-left w-full">
        <span className="font-bold text-900">{props.message.summary}</span>
        <div className="font-medium text-lg my-3 text-900">
          {props.message.detail}
        </div>
        <h1>Would you like to restart now?</h1>
        <div className=" flex flex-row w-full font-medium text-lg my-3 text-900 gap-1">
          <Button
            className="p-button-sm flex"
            label="Restart Now"
            severity="success"
            onClick={restartApp}
          ></Button>
          <Button
            className="p-button-sm flex"
            label="Restart Later"
            severity="danger"
            onClick={clearToast}
          ></Button>
        </div>
      </div>
    );
  };

  const showSucc = (message: string) => {
    toast.current.show({
      severity: "info",
      summary: "Update Available",
      detail: message,
      sticky: true,
      content: (props: any) => toastTemplate(props),
    });
  };
  const showErr = (message: string) => {
    toast.current.show({
      severity: "danger",
      summary: "Update Failed Notify Blake",
      detail: message,
      sticky: true,
      content: (props: any) => toastTemplate(props),
    });
  };

  useEffect(() => {
    if (rootStore.settings.dataProviders.length < 1) {
      navigate("/settings");
    } else {
      if (
        rootStore.settings.currentDataProvider === null ||
        rootStore.settings.currentDataProvider === undefined
      ) {
        rootStore.settings.setCurrentDataProvider(
          rootStore.settings.dataProviders[0].dataProviderID
        );
      }
    }
  }),
    [];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === "KeyK") {
        event.preventDefault();
        navigate("/settings");
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  useEffect(() => {
    const handleUpdateDownloaded = (
      event: Electron.IpcRendererEvent,
      message: string
    ) => {
      showSucc(message);
    };

    const handleAutoUpdateError = (
      event: Electron.IpcRendererEvent,
      message: string
    ) => {
      showErr(message);
    };

    window.electronAPI.onUpdateDownloaded(handleUpdateDownloaded);
    window.electronAPI.onAutoUpdateError(handleAutoUpdateError);

    return () => {
      window.electronAPI.removeUpdateDownloadedListener(handleUpdateDownloaded);
      window.electronAPI.removeAutoUpdateErrorListener(handleAutoUpdateError);
    };
  }, []);

  return (
    <div className="h-screen w-screen">
      <Toast ref={toast} position="bottom-left" />
      <div className="h-[8%]">
        <Header />
      </div>
      <div className="h-[22%] ">
        <JobInfo />
      </div>
      <div className="h-[35%] ">
        <MaterialList />
      </div>
      <div className="h-[8%] ">
        <JobSupplyInfo />
      </div>
      <div className="h-[22%] ">
        <JobNotes />
      </div>
      <div className="h-[5%] ">
        <CurrentConnection />
      </div>
    </div>
  );
};

export default RunSheet;
