//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../models/job-information-model";

import "./job-type.css";

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
        <Dropdown
          className="text-xs"
          value={jobInformation.jobType}
          options={jobInformation.jobTypeOptions}
          onChange={(e: DropdownChangeEvent) => updateJobType(e.value)}
          placeholder="Select a Job Type"
          optionLabel="name"
          optionValue="value"
        />
      </div>
    </div>
  );
});

export default JobType;
