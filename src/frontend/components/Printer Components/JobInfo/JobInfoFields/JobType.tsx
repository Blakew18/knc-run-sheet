//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import { InputText } from "primereact/inputtext";

//Local Imports
import { useRootStore } from "../../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../../models/job-information-model";

const JobType: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const updateJobType = (jobType: string) => {
    jobInformation.setJobType(jobType);
  };

  return (
    <div className="h-[12%] w-full">
      <div className="p-inputgroup h-full">
        <span className="p-inputgroup-addon w-36">Job Type:</span>
        <InputText
          id="jobName"
          value={jobInformation.jobType}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateJobType(e.target.value)
          }
        />
      </div>
    </div>
  );
});

export default JobType;
