//NPM Imports
import { observer } from "mobx-react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { RootStoreType } from "../../../models/root-store";
import { MaterialModelType } from "../../../models/material-model";
//Import Table Selectors
import BrandSelector from "./MaterialSelectors/brandSelector";
import NameSelector from "./MaterialSelectors/nameSelector";
import FinishSelector from "./MaterialSelectors/finishSelector";
import NotesSwitch from "./MaterialSelectors/notesSwitch";
import ImageSwatch from "./MaterialSelectors/imageSwatch";
import EdgeQtySelector from "./MaterialSelectors/edgeQtySelector";
import ThicknessSelector from "./MaterialSelectors/thickness";

const MaterialList: React.FC = observer(() => {
  const rootStore: RootStoreType = useRootStore();

  const availableMaterials = () => {
    return rootStore.materials;
  };

  const brandSelector = (material: MaterialModelType) => {
    return <BrandSelector material={material} />;
  };

  const nameSelector = (material: MaterialModelType) => {
    return <NameSelector material={material} />;
  };

  const thicknessSelector = (material: MaterialModelType) => {
    return <ThicknessSelector material={material} />;
  };

  const finishSelector = (material: MaterialModelType) => {
    return <FinishSelector material={material} />;
  };

  const noteSwitch = (material: MaterialModelType) => {
    return <NotesSwitch material={material} />;
  };

  const imageSwatch = (material: MaterialModelType) => {
    return <ImageSwatch material={material} />;
  };

  const edgeQtySelector = (material: MaterialModelType) => {
    return <EdgeQtySelector material={material} />;
  };

  const theSize = rootStore.browserInstance === "Print"? "small" : "normal"

  return (
    <div className="h-full p-4">
      <DataTable
        key={rootStore.materialArrayUniqueID}
        value={availableMaterials()}
        size='normal'
        scrollable
        scrollHeight="100%"
        style={{ height: "100%" }}
      >
        <Column
          field="materialImage"
          header="Image"
          body={imageSwatch}
        ></Column>
        <Column field="materialQuantity" header="QTY"></Column>
        <Column
          field="materialThickness"
          header="Thickness"
          body={thicknessSelector}></Column>
        <Column
          field="materialBrand"
          header="Brand"
          body={brandSelector}
        ></Column>
        <Column
          field="materialName"
          header="Material Name"
          body={nameSelector}
        ></Column>
        <Column
          field="materialFinish"
          header="Finish"
          body={finishSelector}
        ></Column>
        <Column field="materialNotes" header="Notes" body={noteSwitch}></Column>
        <Column
          field="edgeqty"
          header="Edging Qty"
          body={edgeQtySelector}
        ></Column>
        <Column field="materialNextSheet" header="Next Sheet"></Column>
        <Column field="materialCutBy" header="Cut By"></Column>
      </DataTable>
    </div>
  );
});

export default MaterialList;
