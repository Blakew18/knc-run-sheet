//NMP Imports
import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
//Local Imports
import { useRootStore } from "../../providers/RootStoreProvider";
import { CompanyInformationModelType } from "../../models/company-information-model";
import {
  generateNewCompanyKey,
  testCompanyKey,
} from "../../providers/Services";
const CompanySettings: React.FC = observer(() => {
  const toast = useRef<Toast>(null);

  const { companySettings }: { companySettings: CompanyInformationModelType } =
    useRootStore();

  const [companyName, setCompanyName] = useState<string>(
    companySettings.companyName || ""
  );
  const [companyKey, setCompanyKey] = useState<string>(
    companySettings.companyKey || ""
  );

  const [pathStatus, setPathStatus] = useState<boolean>(false);
  const [checkVerification, setCheckVerification] = useState(false);
  const generateNewCompany = async () => {
    const newCompany = await generateNewCompanyKey(companyName);
    if (newCompany.companyKey && newCompany.companyName) {
      setCompanyName(newCompany.companyName);
      setCompanyKey(newCompany.companyKey);
    } else {
      console.log("Error Generating New Company");
    }
  };

  const saveNewCompanySettings = async () => {
    companySettings.setCompanyName(companyName);
    companySettings.setCompanyKey(companyKey);
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Saved",
      life: 3000,
    });
  };

  const verifiyNewCompanySettings = async () => {
    setCheckVerification(true);
    const verify = await testCompanyKey(companyName, companyKey);
    if (verify) {
      setPathStatus(true);
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Message Content",
        life: 3000,
      });
    } else {
      setPathStatus(false);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: `Company Not Found,`,
        life: 3000,
      });
    }
    setCheckVerification(false);
  };

  const renderVerifyOrSaveButton = () =>
    pathStatus ? (
      <Button
        label="Save"
        className="bg-blue-400 hover:bg-blue-500 text-white rounded shadow"
        onClick={() => {
          saveNewCompanySettings();
        }}
      />
    ) : (
      <Button
        label="Verify"
        className="bg-blue-400 hover:bg-blue-500 text-white rounded shadow"
        onClick={verifiyNewCompanySettings}
        icon="pi pi-check"
        loading={checkVerification}
      />
    );

  useEffect(() => {
    setPathStatus(false);
  }, [companyName, companyKey]);

  return (
    <div>
      <Toast ref={toast} />
      <div className="p-inputgroup h-full text-xs font-semibold">
        <span className="p-inputgroup-addon w-36">Compnay Name</span>
        <InputText
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div className="p-inputgroup h-full text-xs font-semibold">
        <span className="p-inputgroup-addon w-36">Database Path</span>
        <InputText
          value={companyKey}
          onChange={(e) => setCompanyKey(e.target.value)}
        />
        <Button
          label="Generate New Key"
          className="p-button-outlined"
          onClick={generateNewCompany}
        />
      </div>
      <div className="flex justify-end m-4">{renderVerifyOrSaveButton()}</div>
    </div>
  );
});

export default CompanySettings;
