//NPM Import
import { types, Instance, isStateTreeNode } from "mobx-state-tree";

const marginType = ["default", "none", "printableArea", "custom"];

const pageSizes = [
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
  "Custom",
];

const PrinterModel = types
  .model("PrinterModel", {
    silent: types.boolean,
    printBackground: types.boolean,
    deviceName: types.model({
      name: types.string,
      displayName: types.string,
    }),
    color: types.boolean,
    marginType: types.enumeration("MarginType", marginType),
    marginTop: types.maybe(types.number),
    marginBottom: types.maybe(types.number),
    marginLeft: types.maybe(types.number),
    marginRight: types.maybe(types.number),
    landscape: types.boolean,
    pageSizeName: types.enumeration("PageSize", pageSizes),
    pageSizeHeight: types.number,
    pageSizeWidth: types.number,
  })
  .views((self) => {
    return {
      pageSizeNameForDropDown() {
        return { name: self.pageSizeName };
      },
      pageSetAsCustom() {
        return self.pageSizeName === "Custom";
      },
      marginTypeForDropDown() {
        const result = self.marginType.replace(/([A-Z])/g, " $1").trim();
        return {
          name: result.charAt(0).toUpperCase() + result.slice(1),
          code: self.marginType,
        };
      },
      marginTypeSetAsCustom() {
        return self.marginType === "custom";
      },
      printerForElectron() {
        return {
          silent: self.silent,
          printBackground: self.printBackground,
          deviceName: self.deviceName?.name,
          color: self.color,
          margins: {
            marginType: self.marginType,
          },
          landscape: self.landscape,
          pageSize:
            self.pageSizeName === "Custom"
              ? {
                  height: self.pageSizeHeight,
                  width: self.pageSizeWidth,
                }
              : self.pageSizeName,
        };
      },
    };
  })
  .actions((self) => {
    return {
      setSilent(silent: boolean) {
        self.silent = silent;
      },
      setPrintBackground(printBackground: boolean) {
        self.printBackground = printBackground;
      },
      setDeviceName(deviceName: Instance<typeof self.deviceName>) {
        self.deviceName = deviceName;
      },
      setColour(colour: boolean) {
        self.color = colour;
      },
      setMarginType(marginType: Instance<typeof self.marginType>) {
        self.marginType = marginType;
      },
      setMarginTop(marginTop: number) {
        self.marginTop = marginTop;
      },
      setMarginBottom(marginBottom: number) {
        self.marginBottom = marginBottom;
      },
      setMarginLeft(marginLeft: number) {
        self.marginLeft = marginLeft;
      },
      setMarginRight(marginRight: number) {
        self.marginRight = marginRight;
      },
      setLandscape(landscape: boolean) {
        self.landscape = landscape;
      },
      setPageSizeName(pageSizeName: Instance<typeof self.pageSizeName>) {
        self.pageSizeName = pageSizeName;
      },
      setPageSizeHeight(pageSizeHeight: number) {
        self.pageSizeHeight = pageSizeHeight;
      },
      setPageSizeWidth(pageSizeWidth: number) {
        self.pageSizeWidth = pageSizeWidth;
      },
    };
  });

export type PrinterModelType = Instance<typeof PrinterModel>;
export default PrinterModel;

export type PrinterModelForElectronType = {
  silent: boolean;
  printBackground: boolean;
  deviceName?: string;
  color: boolean;
  margins: {
    marginType: string;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  landscape: boolean;
  pageSize:
    | string
    | {
        height: number;
        width: number;
      };
};
