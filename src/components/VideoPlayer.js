import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoJS = ({ options, onReady }) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('Player is ready');
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }

    return () => {
      const player = playerRef.current;
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options, onReady]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

const VideoPlayerPage = ({ videoSrc }) => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      { src: videoSrc, type: 'video/webm' }, // Use the passed video source
    ],
  };

  const handlePlayerReady = React.useCallback((player) => {
    playerRef.current = player;

    player.on('waiting', () => {
      videojs.log('Player is waiting');
    });
    player.on('dispose', () => {
      videojs.log('Player will dispose');
    });
  }, []); // Empty dependency array ensures this function is only created once

  return (
    <div>
      <div>My Video Player</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of the app here</div>
    </div>
  );
};

// Ensure you export the VideoPlayerPage component
export default VideoPlayerPage;
