import { useEffect } from "react";
const { ipcRenderer } = window.require("electron");
import { applySnapshot } from "mobx-state-tree";
import { useRootStore } from "../providers/RootStoreProvider";

const useStoreSync = () => {
  const rootStore = useRootStore();

  useEffect(() => {
    const syncStore = (
      event: Electron.IpcRendererEvent,
      storeSnapshot: any
    ) => {
      console.log("SYNC STORE");
      if (rootStore) {
        applySnapshot(rootStore, storeSnapshot);
      }
    };

    ipcRenderer.on("store-updated", syncStore);

    return () => {
      ipcRenderer.removeListener("store-updated", syncStore);
    };
  }, [rootStore]);
};

export default useStoreSync;
