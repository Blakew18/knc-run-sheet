//NPM Imports
import React from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

//Local Imports
import { useRootStore } from "../../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../../models/job-information-model";

const StackingDetail: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const updateStackingDetail = (stackingDetail: string) => {
    jobInformation.setJobStackingDetails(stackingDetail);
  };

  return (
    <div className="text-xl flex flex-row gap-2">
      <h1 className="font-black">Stacking Details:</h1>
      <h2>{jobInformation.jobStackingDetails}</h2>
    </div>
  );
});

export default StackingDetail;
