import { useEffect } from 'react';
import { applySnapshot } from 'mobx-state-tree';
import { useRootStore } from '../providers/RootStoreProvider';

const useStoreSync = () => {
  const rootStore = useRootStore();

  useEffect(() => {
    const syncStore = (event: Electron.IpcRendererEvent, storeSnapshot: any) => {
      if (rootStore) {
        applySnapshot(rootStore, storeSnapshot);
      }
    };

    window.electronAPI.onStoreUpdated(syncStore);

    return () => {
      window.electronAPI.removeStoreUpdatedListener(syncStore);
    };
  }, [rootStore]);
};

export default useStoreSync;

