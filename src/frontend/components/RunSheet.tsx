//NPM Imports
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Local Imports
import Header from "./Header/Header";
import JobInfo from "./JobInfo/JobInfo";
import JobSupplyInfo from "./JobSupplyInfo/JobSupplyInfo";
import JobNotes from "./JobNotes/JobNotes";
import MaterialList from "./MaterialList/MaterialList";
import CurrentConnection from "./CurrentConnection/CurrentConnection";
import { useRootStore } from "../providers/RootStoreProvider";
import { RootStoreType } from "../models/root-store";

const RunSheet: React.FC = () => {
  const rootStore: RootStoreType = useRootStore();
  const navigate = useNavigate();

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
    <div className="h-screen">
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
