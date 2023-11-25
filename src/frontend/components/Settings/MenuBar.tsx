//NPM Import
import React from "react";
import { Dock } from "primereact/dock";
import { Tooltip } from "primereact/tooltip";

interface MenuBarProps {
  setCurrentMenu: (menu: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ setCurrentMenu }) => {
  const items = [
    {
      label: "Database Connections",
      expanded: true,
      icon: () => (
        <img
          alt="Database Connections"
          src="static://assets/database.svg"
          width="100%"
        />
      ),
      command: () => {
        setCurrentMenu("Database Connections");
      },
    },
    {
      label: "Material Name Settings",
      expanded: true,
      icon: () => (
        <img
          alt="Material Name Settings"
          src="static://assets/config.svg"
          width="100%"
        />
      ),
      command: () => {
        setCurrentMenu("Material Name Settings");
      },
    },
    {
      label: "Nest Sheet Printer Settings",
      expanded: true,
      icon: () => (
        <img
          alt="Nest Sheet Printer Settings"
          src="static://assets/printer.svg"
          width="100%"
        />
      ),
      command: () => {
        setCurrentMenu("Nest Sheet Printer Settings");
      },
    },
    {
      label: "Label Printer Settings",
      icon: () => (
        <img
          alt="Label Printer Settings"
          src="static://assets/labelPrinter.svg"
          width="100%"
        />
      ),
      command: () => {
        setCurrentMenu("Label Printer Settings");
      },
    },
    {
      label: "System Settings",
      icon: () => (
        <img
          alt="System Settings"
          src="static://assets/config.svg"
          width="100%"
        />
      ),
      command: () => {
        setCurrentMenu("System Settings");
      },
    },
  ];

  return (
    <div className="card dock-demo">
      <Tooltip
        className="dark-tooltip"
        target=".dock-advanced .p-dock-action"
        my="center+15 bottom-15"
        at="center top"
        showDelay={150}
      />
      <div className="dock-window dock-advanced">
        <Dock model={items} />
      </div>
    </div>
  );
};

export default MenuBar;
