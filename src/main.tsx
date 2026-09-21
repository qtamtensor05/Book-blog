import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";

const Scene = lazy(() => import("./Scene").then((module) => ({ default: module.Scene })));

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div className="loading-host" role="status">Loading Working Volumes…</div>}>
    <Scene />
  </Suspense>,
);
