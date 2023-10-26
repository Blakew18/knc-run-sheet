//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import { InputText } from "primereact/inputtext";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";

import { JobInformationModelType } from "../../../models/job-information-model";

const KNCJobNumber: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  return (
    <div className="h-[100%] w-full">
      <div className="p-inputgroup h-full">
        <span className="p-inputgroup-addon w-36">KNC Job Number:</span>
        <InputText
          id="kncJobNumber"
          value={`KNC-${jobInformation.kncJobNumber.toString()}`}
          disabled
        />
      </div>
    </div>
  );
});

export default KNCJobNumber;
