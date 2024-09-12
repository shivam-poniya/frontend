import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { UploadVideo } from "./components/UploadVideo";
import { VideoList } from "./components/VideoList";
import VideoPlayerPage from "./components/VideoPlayer";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/" element={
            <div>
              <h1>CLaw Video Storage</h1>
              <UploadVideo />
              <VideoList />
            </div>
          }
        ></Route>
        <Route path="/video/:id" element={<VideoPlayerPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
