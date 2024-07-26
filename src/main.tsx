import React from "react";
import ReactDOM from "react-dom/client";
import App from "./AppCam.tsx";

import { CssBaseline } from "@mui/material";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  return;

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  );
});
