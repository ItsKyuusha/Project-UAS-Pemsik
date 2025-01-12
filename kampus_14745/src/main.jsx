import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./pages/redux/store";
import RouteList from "./RouteList";
import "./index.css";

// Render aplikasi
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={RouteList} />
    </Provider>
  </React.StrictMode>
);
