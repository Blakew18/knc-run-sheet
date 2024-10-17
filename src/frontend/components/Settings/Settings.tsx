//NPM Import
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
//Loacl Import
import MenuBar from "./MenuBar";
import FileNameSelector from "./FileNameSelector";
import DatabaseConnector from "./DatabaseConnector";
import PrinterSettings from "./PrinterSettings";
import CompanySettings from "./CompanySettings";
import LabelPrinterSettings from "./LabelPrinterSettings";
import { useRootStore } from "../../providers/RootStoreProvider";
import { RootStoreType } from "../../models/root-store";

const Settings: React.FC = observer(() => {
  const [currentMenu, setCurrentMenu] = useState<string>("System Settings");
  const rootStore: RootStoreType = useRootStore();

  const menuSelector = () => {
    switch (currentMenu) {
      case "Database Connections":
        return <DatabaseConnector />;
      case "Material Name Settings":
        return <FileNameSelector />;
      case "Nest Sheet Printer Settings":
        return <PrinterSettings />;
      case "Label Printer Settings":
        return <LabelPrinterSettings />;
      case "System Settings":
        return <CompanySettings />;
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
    <div id="settings" className="h-screen ">
      <div className="flex h-[8%] justify-around items-center">
        <h1 className=" text-4xl font-bold">SETTINGS</h1>
      </div>
      <div className="h-[80%] flex justify-around items-center">
        <Card title={currentMenu} className="h-[80%] w-[56%] relative">
          {menuSelector()}
        </Card>
      </div>
      <MenuBar setCurrentMenu={setCurrentMenu} />
      <p className="absolute bottom-0 right-0 m-4">
        Version: {rootStore.appVersion}
      </p>
    </div>
  );
});

export default Settings;
