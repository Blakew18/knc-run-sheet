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

const LabelPrinterSettings: React.FC = observer(() => {
  const rootStore: RootStoreType = useRootStore();
  const { settings }: { settings: SettingsInformationModelType } =
    useRootStore();
  const labelPrinter: PrinterModelType = settings.labelPrinter;

  return (
    <div>
      <div className="flex gap-2">
        <div>
          <div className="p-inputgroup h-full text-xs font-semibold py-2">
            <span className="p-inputgroup-addon w-28">Device</span>
            <Dropdown
              value={labelPrinter.deviceName}
              onChange={(e: DropdownChangeEvent) =>
                labelPrinter.setDeviceName(_.cloneDeep(e.value))
              }
              options={rootStore.availablePrinters}
              optionLabel="displayName"
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup text-xs font-semibold py-2">
            <span className="p-inputgroup-addon w-28">Landscape</span>
            <ToggleButton
              checked={labelPrinter.landscape}
              onChange={(e: ToggleButtonChangeEvent) =>
                labelPrinter.setLandscape(e.value)
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
              checked={labelPrinter.silent}
              onChange={(e: ToggleButtonChangeEvent) =>
                labelPrinter.setSilent(e.value)
              }
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup text-xs font-semibold">
            <span className="p-inputgroup-addon  w-28">Print Background</span>
            <ToggleButton
              checked={labelPrinter.printBackground}
              onChange={(e: ToggleButtonChangeEvent) =>
                labelPrinter.setPrintBackground(e.value)
              }
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup text-xs font-semibold">
            <span className="p-inputgroup-addon  w-28">Colour</span>
            <ToggleButton
              checked={labelPrinter.color}
              onChange={(e: ToggleButtonChangeEvent) =>
                labelPrinter.setColour(e.value)
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
              value={labelPrinter.pageSizeNameForDropDown()}
              onChange={(e: DropdownChangeEvent) =>
                labelPrinter.setPageSizeName(e.value.name)
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
              value={labelPrinter.pageSizeHeight}
              disabled={!labelPrinter.pageSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                labelPrinter.setPageSizeHeight(e.value)
              }
              suffix="px"
            />
          </div>
        </div>
        <div>
          <div className="p-inputgroup h-full text-xs font-semibold py-2 ">
            <span className="p-inputgroup-addon w-16 p-0">Width</span>
            <InputNumber
              value={labelPrinter.pageSizeWidth}
              disabled={!labelPrinter.pageSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                labelPrinter.setPageSizeWidth(e.value)
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
              value={labelPrinter.marginTypeForDropDown()}
              onChange={(e: DropdownChangeEvent) =>
                labelPrinter.setMarginType(e.value.code)
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
              value={labelPrinter.marginTop}
              min={0}
              max={99}
              disabled={!labelPrinter.marginTypeSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                labelPrinter.setMarginTop(e.value)
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
              value={labelPrinter.marginBottom}
              min={0}
              max={99}
              disabled={!labelPrinter.marginTypeSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                labelPrinter.setMarginBottom(e.value)
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
              value={labelPrinter.marginLeft}
              min={0}
              max={99}
              disabled={!labelPrinter.marginTypeSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                labelPrinter.setMarginLeft(e.value)
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
              value={labelPrinter.marginRight}
              min={0}
              max={99}
              disabled={!labelPrinter.marginTypeSetAsCustom()}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                labelPrinter.setMarginRight(e.value)
              }
              suffix="px"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default LabelPrinterSettings;
