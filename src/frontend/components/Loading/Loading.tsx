//NPM Imports
import React from "react";
import Lottie from "react-lottie-player";
import kitchen from "./kitchen.json";

const LoadingPage = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Lottie
        loop
        animationData={kitchen}
        play
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
};

export default LoadingPage;
