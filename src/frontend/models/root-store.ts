//NPM Imports
import { types, Instance } from "mobx-state-tree";

export const RootStoreModel = types.model("RootStore", {
  appName: types.string,
});

//Export Root Store and Type
export type RootStoreType = Instance<typeof RootStoreModel>;
export const setupRootStore = () => {
  const rs: RootStoreType = RootStoreModel.create({
    appName: "THIS IS AN APP",
  });
  console.log("Root Store Initilizing");
  return rs;
};
