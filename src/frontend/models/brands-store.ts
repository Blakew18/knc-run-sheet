import { types, Instance } from "mobx-state-tree";

const BrandsStore = types.model("BrandsModel", {
  brand: types.string,
});

export type BrandsStoreType = Instance<typeof BrandsStore>;
export default BrandsStore;
