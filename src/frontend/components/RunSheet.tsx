//NPM Imports
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'

//Local Imports
import Header from "./Main Components/Header/Header";
import JobInfo from "./Main Components/JobInfo/JobInfo";
import JobSupplyInfo from "./Main Components/JobSupplyInfo/JobSupplyInfo";
import JobNotes from "./Main Components/JobNotes/JobNotes";
import MaterialList from "./Main Components/MaterialList/MaterialList";
import CurrentConnection from "./CurrentConnection/CurrentConnection";
import { useRootStore } from "../providers/RootStoreProvider";
import { RootStoreType } from "../models/root-store";
const { ipcRenderer } = window.require('electron');


const RunSheet: React.FC = () => {
  const rootStore: RootStoreType = useRootStore();
  const navigate = useNavigate();
  const toast = useToast()

  ipcRenderer.on('updateDownloaded', (event, message) => {
    console.log(message);
    toast({
      title: 'Update Available.',
      description: "We have detected an update. Please restart the application to apply the update.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  });

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

  return (
    <div className="h-screen w-screen">
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
