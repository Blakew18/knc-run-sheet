//NPM Imports
import { types, flow, Instance } from "mobx-state-tree";

//Local Imports

const CabinetCountModel = types.model("CabinetCountModel", {
  cabinetCountBase: types.integer,
  cabinetCountWall: types.integer,
  cabinetCountTall: types.integer,
  cabinetCountKicks: types.integer,
  cabinetCountBulkhead: types.integer,
  cabinetCountWallOven: types.integer,
  cabinetCountDrawer: types.integer,
  cabinetCountInnerDrawer: types.integer,
});

export type CabinetCountModelType = Instance<typeof CabinetCountModel>;
export default CabinetCountModel;
