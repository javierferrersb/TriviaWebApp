import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<App />);

serviceWorkerRegistration.register();
