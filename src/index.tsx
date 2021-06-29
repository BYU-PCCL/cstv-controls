import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CstvControlsApp from "./CstvControlsApp";
// import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <CstvControlsApp />
  </React.StrictMode>,
  document.getElementById("root")
);

// @vinhowe: We may want to report performance monitoring in the future
// to an analytics service like Google Analytics or Mixpanel
// See https://create-react-app.dev/docs/measuring-performance/ for details
// reportWebVitals();
