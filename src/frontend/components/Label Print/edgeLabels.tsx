//Npm Imports
import React from "react";

//Local Imports
import { useRootStore } from "../../providers/RootStoreProvider";
import { RootStoreType } from "../../models/root-store";
import { observer } from "mobx-react";
import useStoreSync from "../../Hooks/useStoreSync";

const EdgeLabels: React.FC = observer(() => {
  useStoreSync();
  const rootStore: RootStoreType = useRootStore();

  

  const renderEdgeLabels = () => {
    const materials = rootStore.materialNamesForEdging;
    console.log(materials);
    return materials.map((material) => {
        console.log(material);
      return (
        <div key={material}
        className="border border-black w-[87mm] h-[17mm] flex flex-col items-center justify-center p-2 gap-1"
        style={{ height: '17mm', width: '87mm', pageBreakBefore: 'always' }}>
          <span className="text-center text-xl">{material}</span>
          <span className="barcode leading-none">*{material}*</span>
        </div>
      );
    });
  }

  return (
    <>{renderEdgeLabels()}</>
    
  );
});

export default EdgeLabels;