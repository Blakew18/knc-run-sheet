//NPM Imports
import { types, flow, Instance } from "mobx-state-tree";

//Local Imports

const CabinetCountModel = types
  .model("CabinetCountModel", {
    cabinetCountBase: types.integer,
    cabinetCountWall: types.integer,
    cabinetCountTall: types.integer,
    cabinetCountKicks: types.integer,
    cabinetCountBulkhead: types.integer,
    cabinetCountWallOven: types.integer,
    cabinetCountDrawer: types.integer,
    cabinetCountInnerDrawer: types.integer,
    cabinetHandEdgeParts: types.integer,
    cabinetSharkNoseParts: types.integer,
  })
  .actions((self) => {
    return {
      setCabinetCountBase(value: number) {
        self.cabinetCountBase = value;
      },
      setCabinetCountWall(value: number) {
        self.cabinetCountWall = value;
      },
      setCabinetCountTall(value: number) {
        self.cabinetCountTall = value;
      },
      setCabinetCountKicks(value: number) {
        self.cabinetCountKicks = value;
      },
      setCabinetCountBulkhead(value: number) {
        self.cabinetCountBulkhead = value;
      },
      setCabinetCountWallOven(value: number) {
        self.cabinetCountWallOven = value;
      },
      setCabinetCountDrawer(value: number) {
        self.cabinetCountDrawer = value;
      },
      setCabinetCountInnerDrawer(value: number) {
        self.cabinetCountInnerDrawer = value;
      },
      setCabientCountSharkNoseParts(value: number) {
        self.cabinetSharkNoseParts = value;
      },
      setCabinetCountHandEdgeParts(value: number) {
        self.cabinetHandEdgeParts = value;
      },
      resetCabinetCount() {
        self.cabinetCountBase = 0;
        self.cabinetCountWall = 0;
        self.cabinetCountTall = 0;
        self.cabinetCountKicks = 0;
        self.cabinetCountBulkhead = 0;
        self.cabinetCountWallOven = 0;
        self.cabinetCountDrawer = 0;
        self.cabinetCountInnerDrawer = 0;
        self.cabinetSharkNoseParts = 0;
        self.cabinetHandEdgeParts = 0;
      },
    };
  });

export type CabinetCountModelType = Instance<typeof CabinetCountModel>;
export default CabinetCountModel;
