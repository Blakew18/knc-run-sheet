//NPM Imports
import React from "react";
import Lottie from "react-lottie-player";
import { Dialog } from "primereact/dialog";
import { observer } from "mobx-react";
//Local Imports
import kitchen from "./kitchen.json";
import adrian from "./adrian_1.json";
import { useRootStore } from "../../providers/RootStoreProvider";
import { RootStoreType } from "../../models/root-store";

const LoadingDialog: React.FC = observer(() => {
  const rootStore: RootStoreType = useRootStore();

  const lottieAnimation = () => {
    if (rootStore.isAdrian) {
      return adrian;
    }
    return kitchen;
  };

  return (
    <Dialog visible={true} closable={false} onHide={() => console.log()}>
      <Lottie
        loop
        animationData={lottieAnimation()}
        play
        style={{ width: 400, height: 400 }}
      />
    </Dialog>
  );
});

export default LoadingDialog;
