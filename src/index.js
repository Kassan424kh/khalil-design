import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from "./App";
const history = createBrowserHistory();

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Router history={history}>
        <StrictMode>
            <App />
        </StrictMode>
    </Router>,
    rootElement
);