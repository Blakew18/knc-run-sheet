//NPM Imports
import React, { createContext, useContext, useEffect, useState } from "react";

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
