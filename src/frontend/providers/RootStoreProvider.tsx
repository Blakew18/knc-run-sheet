//NPM Imports
import React, { createContext, useContext, useEffect, useState } from "react";
import { onSnapshot, applySnapshot } from "mobx-state-tree";

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

      let windowType = '';
      await window.electronAPI.getWindowType((type: string) => {
        windowType = type;
      });
      console.log("WINDOW = ", windowType)
      if (windowType === 'main_window') {
        console.log("Setting up snapshot listener for main window");

        onSnapshot(store, (snapshot) => {
          console.log("Sending store update to main process");
          window.electronAPI.updateStore(snapshot);
        });
      } else {
        console.log("Setting up store update listener for other windows");

        const syncStore = (event: Electron.IpcRendererEvent, snapshot: any) => {
          if (store) {
            applySnapshot(store, snapshot);
          }
        };

        window.electronAPI.onStoreUpdated(syncStore);

        return () => {
          window.electronAPI.removeStoreUpdatedListener(syncStore);
        };
      }
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
