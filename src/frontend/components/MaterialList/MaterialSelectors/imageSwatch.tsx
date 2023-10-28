//NPM Import
import React from "react";
import { observer } from "mobx-react";
import { Image } from "primereact/image";

//Local Imports
import { MaterialModelType } from "../../../models/material-model";

type BrandSelectorProps = {
  material: MaterialModelType;
};

const imageSwatch: React.FC<BrandSelectorProps> = observer(({ material }) => {
  const imageURL =
    material.materialFinish?.materialFinishImage ||
    material.materialName?.materialNameImage ||
    "";

  return (
    <div className="card flex justify-content-center">
      <Image src={imageURL} alt="Image" width="24" height="24" preview />
    </div>
  );
});

export default imageSwatch;
