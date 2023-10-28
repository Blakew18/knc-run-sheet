//NPM Imports
import React from "react";

//Local Imports
import Header from "./Header/Header";
import JobInfo from "./JobInfo/JobInfo";
import JobSupplyInfo from "./JobSupplyInfo/JobSupplyInfo";
import JobNotes from "./JobNotes/JobNotes";
import MaterialList from "./MaterialList/MaterialList";

const App: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="h-[8%]">
        <Header />
      </div>
      <div className="h-[22%] ">
        <JobInfo />
      </div>
      <div className="h-[35%] ">
        <MaterialList />
      </div>
      <div className="h-[8%] ">
        <JobSupplyInfo />
      </div>
      <div className="h-[22%] ">
        <JobNotes />
      </div>
      <div className="h-[5%] "></div>
    </div>
  );
};

export default App;
