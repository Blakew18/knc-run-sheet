//NPM Imports
import React from "react";
import { observer } from "mobx-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../../models/job-information-model";
import "./supply-info-fields.css";

const PaymentDetail: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const updatePaymentDetail = (paymentDetail: string) => {
    jobInformation.setJobPaymentTerms(paymentDetail);
  };

  return (
    <div className="p-inputgroup h-4/6 text-xs w-1/4">
      <span className="p-inputgroup-addon w-32">Payment Terms</span>
      <Dropdown
        className="text-xs"
        value={jobInformation.jobPaymentTerms}
        options={jobInformation.jobPaymentTermsOptions}
        onChange={(e: DropdownChangeEvent) => updatePaymentDetail(e.value)}
        optionLabel="name"
        optionValue="value"
      />
    </div>
  );
});

export default PaymentDetail;
