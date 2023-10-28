//NPM Imports
import React from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../models/job-information-model";
import "./supply-info-fields.css";

const AssemblyDetail: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const updateAssemblyDetail = (assemblyDetail: string) => {
    jobInformation.setJobAssemblyDetails(assemblyDetail);
  };

  return (
    <div className="p-inputgroup h-4/6 text-xs w-1/4">
      <span className="p-inputgroup-addon w-32">Assemble By</span>
      <Dropdown
        className="text-xs"
        value={jobInformation.jobAssemblyDetails}
        options={jobInformation.jobAssemblyDetailsOptions}
        onChange={(e: DropdownChangeEvent) => updateAssemblyDetail(e.value)}
        optionLabel="name"
        optionValue="value"
      />
    </div>
  );
});

export default AssemblyDetail;
