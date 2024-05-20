//NPM Imports
import React, { useState } from "react";
import { observer } from "mobx-react";


const Header: React.FC = observer(() => {

  return (
    <div className="flex h-full justify-around items-center">
      <div className="text-3xl font-bold underline decoration-solid">
        CNC Run Sheet
      </div>
    </div>
  );
});

export default Header;
