//NPM Imports
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
//Local Imports
import RunSheet from "./RunSheet";
import Settings from "./Settings/Settings";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<Settings />} />
    </Routes>
  );
};

export default App;
