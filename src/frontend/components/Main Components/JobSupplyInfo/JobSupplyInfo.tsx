//NPM Imports
import React from "react";

//Local Imports
import StackingDetail from "./SupplyInfoFields/StackingDetail";
import AssemblyDetail from "./SupplyInfoFields/AssembleyDetail";
import PaymentDetail from "./SupplyInfoFields/PaymentDetail";
import BaseCabinetCount from "./SupplyInfoFields/Cabinet Counters/BaseCabinetCount";
import WallCabinetCount from "./SupplyInfoFields/Cabinet Counters/WallCabinetCount";
import TallCabinetCount from "./SupplyInfoFields/Cabinet Counters/TallCabinetCount";
import WallOvenCabinetCount from "./SupplyInfoFields/Cabinet Counters/WallOvenCabinetCount";
import KickCabinetCount from "./SupplyInfoFields/Cabinet Counters/KicksCabinetCount";
import BulkheadCabinetCount from "./SupplyInfoFields/Cabinet Counters/BulkheadCabinetCount";
import DrawerCabinetCount from "./SupplyInfoFields/Cabinet Counters/DrawerCabinetCount";
import InnerDrawerCabinetCount from "./SupplyInfoFields/Cabinet Counters/InnerDrawerCabinetCount";
import HandEdgeParts from "./SupplyInfoFields/Cabinet Counters/HandEdgeParts";
import ShakrNoseParts from "./SupplyInfoFields/Cabinet Counters/SharkNoseParts copy";

const JobSupplyInfo: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center w-full">
      <div className="flex justify-around w-full h-1/2 gap-4 ">
        <StackingDetail />
        <AssemblyDetail />
        <PaymentDetail />
      </div>
      <div className="flex h-1/2 justify-center gap-2">
        <BaseCabinetCount />
        <WallCabinetCount />
        <TallCabinetCount />
        <WallOvenCabinetCount />
        <KickCabinetCount />
        <BulkheadCabinetCount />
        <DrawerCabinetCount />
        <InnerDrawerCabinetCount />
        <HandEdgeParts />
        <ShakrNoseParts />
      </div>
    </div>
  );
};

export default JobSupplyInfo;
