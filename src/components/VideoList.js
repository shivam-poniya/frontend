import { useEffect, useState } from "react";
import axios from "axios";
import VideoPlayer from "./VideoPlayer";
import { useNavigate } from "react-router-dom";
import "./VideoList.css";

export const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/videos/");
        setVideos(response.data);
      } catch (error) {
        setError("Failed to fetch videos...");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const videoOptions = {
    controls: true,
    autoplay: false,
    preload: "auto",
  };

  const handleSelectedVideo = (video) => {
    navigate(`/video/${video.id}`, { state: { video } });
  };
  if (loading) return <p>Loading Videos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Videos List</h1>
      <div className="video-list">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-item">
              <p>{video.filename}</p>
              <button
                onClick={() => {
                  handleSelectedVideo(video);
                }}
              >
                Play Video
              </button>
            </div>
          ))
        ) : (
          <p>No Videos to Play...</p>
        )}
      </div>
    </div>
  );
};