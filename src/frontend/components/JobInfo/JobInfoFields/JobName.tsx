//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import { InputText } from "primereact/inputtext";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../models/job-information-model";

const JobName: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const updateJobName = (jobName: string) => {
    jobInformation.setJobName(jobName);
  };

  return (
    <div className="h-[12%] w-full">
      <div className="p-inputgroup h-full">
        <span className="p-inputgroup-addon w-36">Job Name or Address:</span>
        <InputText
          id="jobName"
          value={jobInformation.jobName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateJobName(e.target.value)
          }
        />
      </div>
    </div>
  );
});

export default JobName;
