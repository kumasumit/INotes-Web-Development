import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* here we wrap our entire app in browserRouter so that our app can use routes */}
    <App />
  </React.StrictMode>
);
