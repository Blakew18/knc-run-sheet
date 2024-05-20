//NPM Imports
import React from "react";
import { Route, Routes } from "react-router-dom";
//Local Imports
import RunSheet from "./RunSheet";
import Settings from "./Settings/Settings";
import PrintedSheet from "./PrintedSheet";

import "./app.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/print-run-sheet" element={<PrintedSheet />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<RunSheet />} />
    </Routes>
  );
};

export default App;
