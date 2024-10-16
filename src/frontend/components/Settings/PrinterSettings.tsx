//NPM Imports
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { ToggleButton, ToggleButtonChangeEvent } from "primereact/togglebutton";
import _ from "lodash";

//Local Imports
import { useRootStore } from "../../providers/RootStoreProvider";
import { SettingsInformationModelType } from "../../models/settings-information-model";
import { PrinterModelType } from "../../models/printer-model";
import { RootStoreType } from "../../models/root-store";

const marginOptions = [
  { name: "Default", code: "default" },
  { name: "None", code: "none" },
  { name: "Printable Area", code: "printableArea" },
  { name: "Custom", code: "custom" },
];

const pageSizes = [
  { name: "A0" },
  { name: "A1" },
  { name: "A2" },
  { name: "A3" },
  { name: "A4" },
  { name: "A5" },
  { name: "A6" },
  { name: "Legal" },
  { name: "Letter" },
  { name: "Tabloid " },
  { name: "Custom" },
];

const PrinterSettings: React.FC = observer(() => {
  const rootStore: RootStoreType = useRootStore();
  const { settings }: { settings: SettingsInformationModelType } =
    useRootStore();
  const nestPrinter: PrinterModelType = settings.nestSheetPrinter;

  return (
    <div>
      <div className="flex gap-2">
        <div>
          <div className="p-inputgroup h-full text-xs font-semibold py-2">
            <span className="p-inputgroup-addon w-28">Device</span>
            <Dropdown
              value={nestPrinter.deviceName}
              onChange={(e: DropdownChangeEvent) => {
                console.log("Printer Name", _.cloneDeep(e.value));
                nestPrinter.setDeviceName(_.cloneDeep(e.value));
              }}
              options={rootStore.availablePrinters}
              optionLabel="displayName"
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup text-xs font-semibold py-2">
            <span className="p-inputgroup-addon w-28">Landscape</span>
            <ToggleButton
              checked={nestPrinter.landscape}
              onChange={(e: ToggleButtonChangeEvent) =>
                nestPrinter.setLandscape(e.value)
              }
            />
          </div>
        </div>
      </div>
      <div className="flex  gap-2">
        <div>
          <div className="p-inputgroup text-xs font-semibold">
            <span className="p-inputgroup-addon w-28">Silent Printing</span>
            <ToggleButton
              checked={nestPrinter.silent}
              onChange={(e: ToggleButtonChangeEvent) =>
                nestPrinter.setSilent(e.value)
              }
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup text-xs font-semibold">
            <span className="p-inputgroup-addon  w-28">Print Background</span>
            <ToggleButton
              checked={nestPrinter.printBackground}
              onChange={(e: ToggleButtonChangeEvent) =>
                nestPrinter.setPrintBackground(e.value)
              }
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup text-xs font-semibold">
            <span className="p-inputgroup-addon  w-28">Colour</span>
            <ToggleButton
              checked={nestPrinter.color}
              onChange={(e: ToggleButtonChangeEvent) =>
                nestPrinter.setColour(e.value)
              }
            />
          </div>
        </div>
      </div>
      <div className="flex  gap-2  w-full">
        <div>
          <div className="p-inputgroup h-full text-xs font-semibold py-2 ">
            <span className="p-inputgroup-addon w-28">Page Size</span>
            <Dropdown
              value={nestPrinter.pageSizeNameForDropDown()}
              onChange={(e: DropdownChangeEvent) =>
                nestPrinter.setPageSizeName(e.value.name)
              }
              options={pageSizes}
              optionLabel="name"
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup h-full text-xs font-semibold py-2 ">
            <span className="p-inputgroup-addon w-16 p-0">Height</span>
            <InputNumber
              value={nestPrinter.pageSizeHeight}
              disabled={!nestPrinter.pageSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                nestPrinter.setPageSizeHeight(e.value)
              }
              suffix="px"
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup h-full text-xs font-semibold py-2 ">
            <span className="p-inputgroup-addon w-16 p-0">Width</span>
            <InputNumber
              value={nestPrinter.pageSizeWidth}
              disabled={!nestPrinter.pageSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                nestPrinter.setPageSizeWidth(e.value)
              }
              suffix="px"
            />
          </div>
        </div>
      </div>
      <div className="flex  gap-2 w-full">
        <div>
          <div className="p-inputgroup h-full text-xs font-semibold py-2 ">
            <span className="p-inputgroup-addon w-28">Margin</span>
            <Dropdown
              value={nestPrinter.marginTypeForDropDown()}
              onChange={(e: DropdownChangeEvent) =>
                nestPrinter.setMarginType(e.value.code)
              }
              options={marginOptions}
              optionLabel="name"
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup h-full text-xs font-semibold py-2 ">
            <span className="p-inputgroup-addon w-8 p-0">T</span>
            <InputNumber
              className="margin-settings"
              value={nestPrinter.marginTop}
              min={0}
              max={99}
              disabled={!nestPrinter.marginTypeSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                nestPrinter.setMarginTop(e.value)
              }
              suffix="px"
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup h-full text-xs font-semibold py-2 ">
            <span className="p-inputgroup-addon w-8 p-0">B</span>
            <InputNumber
              className="margin-settings"
              value={nestPrinter.marginBottom}
              min={0}
              max={99}
              disabled={!nestPrinter.marginTypeSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                nestPrinter.setMarginBottom(e.value)
              }
              suffix="px"
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup h-full text-xs font-semibold py-2 ">
            <span className="p-inputgroup-addon w-8 p-0">L</span>
            <InputNumber
              className="margin-settings"
              value={nestPrinter.marginLeft}
              min={0}
              max={99}
              disabled={!nestPrinter.marginTypeSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                nestPrinter.setMarginLeft(e.value)
              }
              suffix="px"
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup h-full text-xs font-semibold py-2 ">
            <span className="p-inputgroup-addon w-8 p-0">R</span>
            <InputNumber
              className="margin-settings"
              value={nestPrinter.marginRight}
              min={0}
              max={99}
              disabled={!nestPrinter.marginTypeSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                nestPrinter.setMarginRight(e.value)
              }
              suffix="px"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default PrinterSettings;
