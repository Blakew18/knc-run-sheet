//NPM Imports
import React, { useState } from "react";
import { Button } from "primereact/button";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { observer } from "mobx-react";
import { Dialog } from "primereact/dialog";

//Local Imports
import { useRootStore } from "../../../providers/RootStoreProvider";
import { RootStoreType } from "../../../models/root-store";
import LoadingDialog from "../../Loading/LoadingDialog";

const Header: React.FC = observer(() => {
  const rootStore: RootStoreType = useRootStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string>("");


  const loadingDialog = () => {
    if (loading) {
      return <LoadingDialog />;
    }
  };

  const setJobStatus = (e: SelectButtonChangeEvent) => {
    if (e.value) rootStore.setJobStatus(e.value);
  };

  const updateCVMaterials = async () => {
    setLoading(true);
    const validStore = rootStore.validateRootStoreForUpdate();
    if (validStore.isValid) {
      await rootStore.rsUpdateCabinetVisionmaterials();
      await rootStore.rsPrintRunSheet();
    } else {
      setErrorMessages(validStore.errors);
      setError(true);
    }
    setLoading(false);
  };

  const submitButton = () => {
    if (rootStore.browserInstance === "Print"){
      return <></>
    } else{
      return <Button label="Submit" icon="pi pi-check" onClick={updateCVMaterials} />
    }
  }
  const printLabeltButton = () => {
    if (rootStore.browserInstance === "Print"){
      return <></>
    } else{
      return <Button label="Print Labels" icon="pi pi-check" onClick={() => rootStore.rsPrintLabels()} />
    }
  }

  return (
    <div className="flex h-full items-center w-full border border-white ">
      {loadingDialog()}
      <Dialog
        header="Error In Form Validation"
        visible={error}
        style={{ width: "50vw" }}
        onHide={() => setError(false)}
      >
        <p className="m-0">
          {errorMessages.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </Dialog>
       <div className="flex flex-1 justify-center">
    <div className="flex gap-1">
      {submitButton()}
      {printLabeltButton()}
    </div>
  </div>
  <div className="text-3xl font-bold underline decoration-solid mx-20">
    CNC Run Sheet
  </div>
  <div className="flex flex-1 justify-center">
    <SelectButton
      value={rootStore.jobStatus}
      onChange={(e: SelectButtonChangeEvent) => setJobStatus(e)}
      options={rootStore.jobStatusOptions}
    />
  </div>
    </div>
  );
});

export default Header;
