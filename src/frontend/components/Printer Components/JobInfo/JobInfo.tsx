//NPM Imports
import React from "react";
import { Image } from "primereact/image";
import { observer } from "mobx-react";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { RootStoreType } from "../../../models/root-store";
import JobInfoTable from "./JobInfoTable";
import { JobInformationModelType } from "../../../models/job-information-model";

const JobInfo: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();
  return (
    <div className="flex h-full items-center justify-around px-2 ">
      <div className="basis-3/4 px-4 h-full">
        <JobInfoTable />
      </div>
      <img className="max-h-[60%]" src={jobInformation.jobImage} alt="Image" />
    </div>
  );
});

export default JobInfo;
