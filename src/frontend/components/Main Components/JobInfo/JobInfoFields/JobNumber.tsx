//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import { InputText } from "primereact/inputtext";

//Local Imports
import { useRootStore } from "../../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../../models/job-information-model";

const JobNumber: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const updateJobNumber = (jobNumber: string) => {
    jobInformation.setClientJobNumber(jobNumber);
  };

  return (
    <div className="h-[100%] w-full">
      <div className="p-inputgroup h-full">
        <span className="p-inputgroup-addon w-36">Client Job Number:</span>
        <InputText
          id="jobNumber"
          value={jobInformation.clientJobNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateJobNumber(e.target.value)
          }
        />
      </div>
    </div>
  );
});

export default JobNumber;
