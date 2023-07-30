import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import MovieList from "./MovieList.jsx";
import Layout from "./Layout.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
