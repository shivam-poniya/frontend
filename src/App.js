import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { UploadVideo } from "./components/UploadVideo";
import { VideoList } from "./components/VideoList";
import VideoPlayerPage from "./components/VideoPlayerPage";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import {AuthContext} from "./components/AuthContext";

function App() {
  const { isAuthenticated } = useContext(AuthContext); // Get authentication status from context

  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          {/* Default Route: If not authenticated, redirect to login */}
          <Route
            path="/"
            element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/home" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Route: Only accessible if authenticated */}
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <div>
                  <UploadVideo />
                  <VideoList />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/video/:id"
            element={isAuthenticated ? <VideoPlayerPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
