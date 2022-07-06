import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

serviceWorkerRegistration.register();
