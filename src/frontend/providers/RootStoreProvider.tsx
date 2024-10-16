//NPM Imports
import React, { createContext, useContext, useEffect, useState } from "react";
import { onSnapshot, applySnapshot } from "mobx-state-tree";
const { ipcRenderer } = window.require("electron");

//Local Imports
import { RootStoreType, setupRootStore } from "../models/root-store";
import LoadingPage from "../components/Loading/Loading";

export const RootStoreContext = createContext<RootStoreType | null>(null);

const RootStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rootStore, setRootStore] = useState<RootStoreType>();

  useEffect(() => {
    async function start() {
      const store = await setupRootStore();
      setRootStore(store);

      // Listen for store changes
      console.log("Listening for store changes");
      console.log(
        window.location.href.substring(window.location.href.length - 9)
      );

      let isUpdateFromMain = false;
      if (
        window.location.href.substring(window.location.href.length - 11) ===
        "main_window"
      ) {
        console.log("This is the Main Window");
        isUpdateFromMain = true;
      }

      onSnapshot(store, (snapshot) => {
        console.log("STORE UPDATED");
        if (isUpdateFromMain && ipcRenderer) {
          console.log("Sending store update to main process");
          ipcRenderer.send("update-store", snapshot);
        }
      });

      // Listen for updates from the main process
      ipcRenderer?.on("store-updated", (event, snapshot) => {
        console.log("Store Updated");
        applySnapshot(store, snapshot);
      });
    }
    start();
  }, []);

  if (!rootStore) return <LoadingPage />;
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = (): RootStoreType => {
  const context = useContext(RootStoreContext);
  if (context === undefined) {
    throw new Error("useRootStore must be used within a RootStoreProvider");
  }
  return context;
};
export default RootStoreProvider;
