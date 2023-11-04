//NPM Import
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";

//Loacl Import
import MenuBar from "./MenuBar";
import FileNameSelector from "./FileNameSelector";
const Settings: React.FC = () => {
  const [currentMenu, setCurrentMenu] = useState<string>("CV Versions");

  return (
    <div className="h-screen ">
      <div className="flex h-[8%] justify-around items-center">
        <h1 className=" text-4xl font-bold">SETTINGS</h1>
      </div>
      <div className="h-[85%] flex justify-around items-center">
        <Card title={currentMenu} className="h-[80%] w-[50%] ">
          <FileNameSelector />
        </Card>
      </div>
      <MenuBar setCurrentMenu={setCurrentMenu} />
    </div>
  );
};

export default Settings;
