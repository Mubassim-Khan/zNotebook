import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import NoteState from "./context/notes/noteState";
import { BrowserRouter } from "react-router-dom";
import { ToasterProvider } from "./components/ToasterProvider";
import "react-quill-new/dist/quill.snow.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NoteState>
    <BrowserRouter>
      <ToasterProvider />
      <App />
    </BrowserRouter>
  </NoteState>
);
