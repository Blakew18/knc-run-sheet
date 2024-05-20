//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import { InputText } from "primereact/inputtext";

//Local Imports
import { useRootStore } from "../../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../../models/job-information-model";

const NestedBy: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const updateNestedBy = (nestedBy: string) => {
    jobInformation.setJobNestedBy(nestedBy);
  };

  return (
    <div className="h-[12%] w-full">
      <div className="p-inputgroup h-full">
        <span className="p-inputgroup-addon w-36">Nested By:</span>
        <InputText
          id="nestedBy"
          value={jobInformation.jobNestedBy}
          onChange={(e) => updateNestedBy(e.target.value)}
        />
      </div>
    </div>
  );
});

export default NestedBy;
