//NPM Imports
import React from "react";

//Local Imports
import Header from "./Header/Header";
import JobInfo from "./JobInfo/JobInfo";

const App: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="h-[8%]">
        <Header />
      </div>
      <div className="h-[22%] ">
        <JobInfo />
      </div>
      <div className="h-[30%] bg-slate-500">
        <h1>HI</h1>
      </div>
      <div className="h-[10%] bg-slate-400">
        <h1>HI</h1>
      </div>
      <div className="h-[20%] bg-slate-500">
        <h1>HI</h1>
      </div>
      <div className="h-[10%] bg-slate-400">
        <h1>HI</h1>
      </div>
    </div>
  );
};

export default App;
