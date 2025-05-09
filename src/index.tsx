import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const initGreeter = async (): Promise<void> => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

document.body.style.backgroundColor = "black";

if (process.env.REACT_APP_ENV !== "dm") {
  initGreeter();
} else {
  window.addEventListener("GreeterReady", () => {
    initGreeter();
  });
}
