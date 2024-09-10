import React from "react";
import Home from "./components/Home";
import "./App.css";
import { UploadVideo } from "./components/UploadVideo";
import { VideoList } from "./components/VideoList";

function App() {
  return (
    <div>
      <h1>Claw Video file Store</h1>
      <UploadVideo></UploadVideo>
      <VideoList></VideoList>
    </div>
  );
}

export default App;
