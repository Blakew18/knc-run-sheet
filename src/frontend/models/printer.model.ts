//NPM Import
import { types, Instance } from "mobx-state-tree";

const PrinterModel = types.model("PrinterModel", {
  silent: types.boolean,
  printBackground: types.boolean,
  deviceName: types.string,
  color: types.boolean,
  margins: types.model({
    marginType: types.enumeration("MarginType", [
      "default",
      "none",
      "printableArea",
      "custom",
    ]),
    top: types.maybe(types.number),
    bottom: types.maybe(types.number),
    left: types.maybe(types.number),
    right: types.maybe(types.number),
  }),
  landscape: types.boolean,
  pageSize:
    types.enumeration("PageSize", [
      "A0",
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "Legal",
      "Letter",
      "Tabloid ",
    ]) || types.model({ height: types.number, width: types.number }),
});

export type PrinterModelType = Instance<typeof PrinterModel>;
export default PrinterModel;
