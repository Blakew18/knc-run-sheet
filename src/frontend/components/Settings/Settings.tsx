//NPM Import
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
//Loacl Import
import MenuBar from "./MenuBar";
import FileNameSelector from "./FileNameSelector";
import DatabaseConnector from "./DatabaseConnector";
import PrinterSettings from "./PrinterSettings";

const Settings: React.FC = () => {
  const [currentMenu, setCurrentMenu] = useState<string>(
    "Nest Sheet Printer Settings"
  );

  const menuSelector = () => {
    switch (currentMenu) {
      case "Database Connections":
        return <DatabaseConnector />;
      case "Material Name Settings":
        return <FileNameSelector />;
      case "Nest Sheet Printer Settings":
        return <PrinterSettings />;
      case "Label Printer Settings":
        return <div>Label Printer Settings</div>;
      default:
        return <div>None</div>;
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === "KeyK") {
        event.preventDefault();
        navigate("/");
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="h-screen ">
      <div className="flex h-[8%] justify-around items-center">
        <h1 className=" text-4xl font-bold">SETTINGS</h1>
      </div>
      <div className="h-[85%] flex justify-around items-center">
        <Card title={currentMenu} className="h-[80%] w-[55%] relative">
          {menuSelector()}
        </Card>
      </div>
      <MenuBar setCurrentMenu={setCurrentMenu} />
    </div>
  );
};

export default Settings;
