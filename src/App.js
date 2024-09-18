import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { UploadVideo } from "./components/UploadVideo";
import { VideoList } from "./components/VideoList";
import VideoPlayerPage from "./components/VideoPlayerPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header/>
      <div className="main-content">
      <Routes>
        <Route
          path="/" element={
            <div>
              <UploadVideo />
              <VideoList />
            </div>
          }
        ></Route>
        <Route path="/video/:id" element={<VideoPlayerPage />}></Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
