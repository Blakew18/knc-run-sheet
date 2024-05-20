//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import { InputText } from "primereact/inputtext";

//Local Imports
import { useRootStore } from "../../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../../models/job-information-model";

const NestDate: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  return (
    <div className="h-[12%] w-full">
      <div className="p-inputgroup h-full">
        <span className="p-inputgroup-addon w-36">Nest Date:</span>
        <InputText
          id="nestDate"
          disabled
          value={jobInformation.jobNestDate.toLocaleString()}
        />
      </div>
    </div>
  );
});

export default NestDate;
