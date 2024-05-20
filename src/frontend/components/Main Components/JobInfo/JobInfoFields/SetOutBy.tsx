//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import { InputText } from "primereact/inputtext";

//Local Imports
import { useRootStore } from "../../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../../models/job-information-model";

const SetOutBy: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const updateJobSetOutBy = (jobSetOutBy: string) => {
    jobInformation.setJobSetOutBy(jobSetOutBy);
    console.log(jobInformation.jobSetOutBy);
  };

  return (
    <div className="h-[12%] w-full">
      <div className="p-inputgroup h-full">
        <span className="p-inputgroup-addon w-36">Set Out By:</span>
        <InputText
          id="jobNumber"
          value={jobInformation.jobSetOutBy}
          onChange={(e) => updateJobSetOutBy(e.target.value)}
        />
      </div>
    </div>
  );
});

export default SetOutBy;
