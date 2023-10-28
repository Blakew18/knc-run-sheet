//NPM Imports
import React from "react";
import { observer } from "mobx-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//Local Imports
import { useRootStore } from "../../providers/RootStoreProvider";
import { RootStoreType } from "../../models/root-store";
import { MaterialModelType } from "../../models/material-model";
//Import Table Selectors
import BrandSelector from "./MaterialSelectors/brandSelector";
import NameSelector from "./MaterialSelectors/nameSelector";
import FinishSelector from "./MaterialSelectors/finishSelector";
import NotesSwitch from "./MaterialSelectors/notesSwitch";
import ImageSwatch from "./MaterialSelectors/imageSwatch";

const MaterialList: React.FC = observer(() => {
  const rootStore: RootStoreType = useRootStore();

  const brandSelector = (material: MaterialModelType) => {
    return <BrandSelector material={material} />;
  };

  const nameSelector = (material: MaterialModelType) => {
    return <NameSelector material={material} />;
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

  return (
    <div className="h-full p-4">
      <DataTable
        value={rootStore.materials}
        size="normal"
        scrollable
        scrollHeight="100%"
        style={{ height: "100%" }}
      >
        <Column
          field="materialImage"
          header="Image"
          body={imageSwatch}
        ></Column>
        <Column field="materialQuantity" header="Quantity"></Column>
        <Column field="cvMaterialName" header="CV Material Name"></Column>
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
        <Column field="edgeqty" header="Edging Qty"></Column>
        <Column field="materialNextSheet" header="Next Sheet"></Column>
        <Column field="materialCutBy" header="Cut By"></Column>
      </DataTable>
    </div>
  );
});

export default MaterialList;
