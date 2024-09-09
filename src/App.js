import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import { UploadVideo } from "./components/UploadVideo";

function App() {
  return (
    <div>
      <h1>Claw Video file Store</h1>
      <UploadVideo></UploadVideo>
    </div>
  );
}

export default App;
