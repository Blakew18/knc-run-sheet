//NPM Imports
import React from "react";
import { observer } from "mobx-react";

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
import { useRootStore } from "../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../models/job-information-model";
import HandEdgeParts from "./SupplyInfoFields/Cabinet Counters/HandEdgeParts";
import ShakrNoseParts from "./SupplyInfoFields/Cabinet Counters/SharkNoseParts copy";

const JobSupplyInfo: React.FC = observer(() => {

  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const assemblyInfo = () => {
    console.log(jobInformation.jobType)
    console.log(jobInformation.jobAssemblyDetails)
    if (jobInformation.jobType === "Supply Cabinets" && jobInformation.jobAssemblyDetails === "KNC Queensland"  ){
    return (
      <>
      <div className="flex justify-center gap-8 pb-2">
      <BaseCabinetCount />
      <WallCabinetCount />
      <TallCabinetCount />
      <WallOvenCabinetCount />
      </div>
      <div className="flex justify-center gap-8 py-2">
      <KickCabinetCount />
      <BulkheadCabinetCount />
      <DrawerCabinetCount />
      <InnerDrawerCabinetCount />
    </div>
    <div className="flex justify-center gap-8 py-2">
      <HandEdgeParts />
      <ShakrNoseParts />
    </div>
    </>
    )
  }
}

  return (
    <div className="h-full flex flex-col justify-center w-full">
      <div className="flex justify-around w-full my-6 gap-2">
        <StackingDetail />
        <AssemblyDetail />
      </div>
      <div className="h-1/2">
        {assemblyInfo()}
      </div>
    </div>
  );
});

export default JobSupplyInfo;
