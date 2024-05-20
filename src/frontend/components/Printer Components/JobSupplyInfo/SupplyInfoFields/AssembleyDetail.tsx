//NPM Imports
import React from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

//Local Imports
import { useRootStore } from "../../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../../models/job-information-model";

const AssemblyDetail: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const updateAssemblyDetail = (assemblyDetail: string) => {
    jobInformation.setJobAssemblyDetails(assemblyDetail);
  };

  return (
    <div className="text-xl flex flex-row gap-2">
      <h3 className="font-black">Assemble By: </h3>
      <h3 >{jobInformation.jobAssemblyDetails}</h3>
    </div>
  );
});

export default AssemblyDetail;
