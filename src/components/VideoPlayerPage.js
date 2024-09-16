import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { useLocation } from 'react-router-dom';

const VideoPlayerPage = () => {
  const { state } = useLocation();
  const video = state?.video;
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Assuming your backend serves videos at `/api/videos/:id`
    if (video?.id) {
      setVideoUrl(`http://localhost:8000/api/videos/${video.id}`);
    }
  }, [video]);

  return (
    <div>
      <h1>Video Player</h1>
      {videoUrl ? <VideoPlayer videoUrl={videoUrl} /> : <p>Loading video...</p>}
    </div>
  );
};

export default VideoPlayerPage;
