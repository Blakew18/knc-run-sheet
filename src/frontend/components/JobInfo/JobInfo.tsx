//NPM Imports
import React from "react";
import { Image } from "primereact/image";
import { observer } from "mobx-react";

//Local Imports
import { useRootStore } from "../../providers/RootStoreProvider";
import { RootStoreType } from "../../models/root-store";
import JobInfoTable from "./JobInfoTable";
import { JobInformationModelType } from "../../models/job-information-model";

const JobInfo: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();
  return (
    <div className="flex h-full items-center justify-around px-2">
      <img className="max-h-[60%]" src={jobInformation.jobImage} alt="Image" />
      <div className="basis-1/2 px-4 h-full">
        <JobInfoTable />
      </div>
      <img
        className="max-h-[60%]"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc1uRzlkpSeFYLk3nf04hkF9RapDMgTrJpp9keNejrfM0m_dQ1IsSz4v6sSmChtSK-nis&usqp=CAU"
        alt="Image"
      />
    </div>
  );
});

export default JobInfo;
