import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { store } from "./redux/store";
import Leaderboard from "./components/Leaderboard";
import ScoreEntry from "./components/ScoreEntry";
import CrashImage from "./components/CrashImage";
import RewardImage from "./components/RewardImage";
import TrackImage from "./components/TrackImage";
import TrajectoryImage from "./components/TrajectoryImage";

import 'react-toastify/dist/ReactToastify.css';
import "./styles/main.scss";

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
    path: "/crash",
    element: <CrashImage />
  },
  {
    path: "/reward",
    element: <RewardImage />
  },
  {
    path: "/track",
    element: <TrackImage />
  },
  {
    path: "/trajectory",
    element: <TrajectoryImage />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);