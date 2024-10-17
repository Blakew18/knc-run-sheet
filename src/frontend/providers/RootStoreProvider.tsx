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
      const params = new URLSearchParams(window.location.search);
      const windowType = params.get("window");
      let isUpdateFromMain = windowType === "main";

      let updatingFromIpc = false;

      onSnapshot(store, (snapshot) => {
        if (updatingFromIpc) return; // Ignore updates from IPC
        if (isUpdateFromMain && ipcRenderer) {
          ipcRenderer.send("update-store", snapshot);
        }
      });

      ipcRenderer.on("store-updated", (event, snapshot) => {
        updatingFromIpc = true;
        applySnapshot(store, snapshot);
        updatingFromIpc = false;
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
