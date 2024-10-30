import React from "react";
 import Lottie from "react-lottie-player"; import ocrIDFront from "./Idcardgif.json";
  const Idcardgif = () => { return (<div className="ml-20">      <Lottie loop animationData={ocrIDFront} play style={{ width: "300px", height: "300px", background: "transparent" }} />      <div id="animation-container" lang="en" role="img" className="main" aria-label="Lottie animation"      >        <div id="animation" className="animation" style={{ background: "transparent" }}        >            </div>      </div>    </div>); };
 export default Idcardgif; 