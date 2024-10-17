//NPM Imports
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Local Imports
import Header from "./Printer Components/Header/Header";
import JobInfo from "./Printer Components/JobInfo/JobInfo";
import JobSupplyInfo from "./Printer Components/JobSupplyInfo/JobSupplyInfo";
import JobNotes from "./Printer Components/JobNotes/JobNotes";
import MaterialList from "./Printer Components/MaterialList/MaterialList";
import useStoreSync from "../Hooks/useStoreSync";

import "./printedsheet.css";

const PrintedSheet: React.FC = () => {
  useStoreSync();

  return (
    <div id="printedSheet" className="h-screen pr-12 pl-6">
      <div className="h-[4%]">
        <Header />
      </div>
      <div className="h-[20%] ">
        <JobInfo />
      </div>
      <div className="h-[40%] ">
        <MaterialList />
      </div>
      <div className="h-[18%] ">
        <JobSupplyInfo />
      </div>
      <div className="h-[15%] ">
        <JobNotes />
      </div>
    </div>
  );
};

export default PrintedSheet;
