import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import GamePage from "./components/Game/GamePage";
import LobbyPage from "./components/Game/LobbyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  {
    path: "/game/:gameId",
    element: <GamePage />,
  },
  {
    path: "/lobby/:gameId",
    element: <LobbyPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
