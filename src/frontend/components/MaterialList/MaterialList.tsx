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

const MaterialList: React.FC = observer(() => {
  const rootStore: RootStoreType = useRootStore();

  const brandSelector = (material: MaterialModelType) => {
    return <BrandSelector material={material} />;
  };

  const nameSelector = (material: MaterialModelType) => {
    return <NameSelector material={material} />;
  };

  return (
    <div className="h-full p-4">
      <DataTable
        value={rootStore.materials}
        scrollable
        scrollHeight="100%"
        style={{ height: "100%" }}
      >
        <Column field="materialImage" header="Image"></Column>
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
        <Column field="materialFinish" header="Finish"></Column>
        <Column field="materialNotes" header="Notes"></Column>
        <Column field="materialNextSheet" header="Next Sheet"></Column>
        <Column field="materialCutBy" header="Cut By"></Column>
      </DataTable>
    </div>
  );
});

export default MaterialList;
