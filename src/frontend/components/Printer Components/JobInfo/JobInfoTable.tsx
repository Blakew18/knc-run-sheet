//NPM Imports
import React from "react";

//Local Imports
import JobName from "./JobInfoFields/JobName";
import NestedBy from "./JobInfoFields/NestedBy";
import SetOutBy from "./JobInfoFields/SetOutBy";
import NestingComputer from "./JobInfoFields/NestingComputer";
import NestDate from "./JobInfoFields/NestDate";
import JobType from "./JobInfoFields/JobType";
import JobNumber from "./JobInfoFields/JobNumber";
import KNCJobNumber from "./JobInfoFields/KNCJobNumber";

const JobInfoTable: React.FC = () => {
  return (
    <div className="h-full  flex flex-col justify-center items-center text-xs font-semibold">
      <div className="flex m-0 p-0 h-[12%] w-full">
        <JobNumber />
        <KNCJobNumber />
      </div>
      <JobName />
      <NestDate />
      <JobType />
      <SetOutBy />
      <NestingComputer />
    </div>
  );
};

export default JobInfoTable;
