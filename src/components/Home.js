import React, { useState, useEffect } from "react";
import axios from 'axios'

function Home() {
  const [videos,setVideos] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch the list of videos from the backend API
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/videos'); // Adjust the URL as needed
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch videos');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home">
      <h1>Welcome to the Video Hosting Service</h1>
      <p>Explore and share videos securely and easily.</p>
      <div className="videos-page">
        {!!videos.response ? (
          <div>{videos.response}</div>
        ) : (
          <p>No videos available yet. Be the first to upload!</p>
        )}
      </div>
    </div>
  );
}

export default Home;
