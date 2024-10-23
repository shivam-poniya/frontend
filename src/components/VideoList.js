import { useContext, useEffect, useState } from "react";
import axios from "axios";
import VideoPlayer from "./VideoPlayer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./VideoList.css";

export const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/videos/`,{
          headers:{
            Authorization:`Bearer ${token}`,
          }
        });
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

  const deleteSelectedVideo = async (video) => {
    try {
      const id = video.id;
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/videos/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });
      setVideos(videos.filter(video => video.id != id));      
    } catch (error) {
      console.error('Error deleting video', error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-sans text-4xl font-bold my-2 py-2">Videos List</h1>
      <div className="video-list">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-item">
              <p>{video.filename}</p>
              <div className="flex flex-row mx-2 px-2 gap-4">
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-red-500 transition-colors duration-300"
                onClick={() => {
                  handleSelectedVideo(video);
                }}
              >
                Play
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-red-500 transition-colors duration-300"
                onClick={() => {
                  deleteSelectedVideo(video);
                }}
              >
                Delete
              </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Videos to Play...</p>
        )}
      </div>
    </div>
  );
};