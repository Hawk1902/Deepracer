import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Leaderboard from "./components/Leaderboard";
import ScoreEntry from "./components/ScoreEntry";

import "./styles/main.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Leaderboard />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/score",
    element: <ScoreEntry />,
  },
  {
    path: "/track",
    element: <div>track</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// <React.StrictMode>
