import React from 'react';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css'; // Import the default styles

const VideoPlayer = ({ videoUrl }) => {
  // Plyr expects a `source` object which contains the video file URL and type.
  const videoSource = {
    type: 'video',
    sources: [
      {
        src: videoUrl, // Video URL from the backend
        type: 'video/mp4', // Adjust this based on the type of your video (e.g., webm, mp4, etc.)
      },
    ],
  };

  return (
    <div>
      <Plyr source={videoSource} 
      options={{
        controls: [
          'play', 'progress', 'current-time', 'mute', 'volume', 'speed', 'fullscreen'
        ],
        settings: ['speed'],
        speed: { 
          selected: 1,
          options: [0.5, 1, 1.5, 2],
        },
        preload: "metadata",
       }} />
    </div>
  );
};

export default VideoPlayer;
