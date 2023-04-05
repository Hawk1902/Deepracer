import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Leaderboard from "./components/Leaderboard";

import "./styles/main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Main Page</div>,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
