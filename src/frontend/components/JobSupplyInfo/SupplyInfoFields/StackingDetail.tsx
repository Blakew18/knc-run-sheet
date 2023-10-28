//NPM Imports
import React from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../models/job-information-model";
import "./supply-info-fields.css";

const StackingDetail: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const updateStackingDetail = (stackingDetail: string) => {
    jobInformation.setJobStackingDetails(stackingDetail);
  };

  return (
    <div className="p-inputgroup h-4/6 text-xs w-1/3">
      <span className="p-inputgroup-addon w-32">Stacking Details</span>
      <Dropdown
        className="text-xs"
        value={jobInformation.jobStackingDetails}
        options={jobInformation.jobStackingDetailsOptions}
        onChange={(e: DropdownChangeEvent) => updateStackingDetail(e.value)}
        optionLabel="name"
        optionValue="value"
      />
    </div>
  );
});

export default StackingDetail;
