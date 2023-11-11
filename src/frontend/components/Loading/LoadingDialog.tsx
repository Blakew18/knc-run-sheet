//NPM Imports
import React from "react";
import Lottie from "react-lottie-player";
import { Dialog } from "primereact/dialog";

//Local Imports
import kitchen from "./kitchen.json";

const LoadingDialog = () => {
  return (
    <Dialog visible={true} closable={false} onHide={() => console.log()}>
      <Lottie
        loop
        animationData={kitchen}
        play
        style={{ width: 400, height: 400 }}
      />
    </Dialog>
  );
};

export default LoadingDialog;
