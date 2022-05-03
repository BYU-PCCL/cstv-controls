import React from "react";
import "./index.css";
import FootronControlsApp from "./FootronControlsApp";
import { createRoot } from "react-dom/client";
// import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <FootronControlsApp />
    </React.StrictMode>
  );
}

// @vinhowe: We may want to report performance monitoring in the future
// to an analytics service like Google Analytics or Mixpanel
// See https://create-react-app.dev/docs/measuring-performance/ for details
// reportWebVitals();
