import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // Import default video.js styles
import 'videojs-contrib-ads'; // Import video.js ads plugin
import 'videojs-ima'; // Import video.js IMA plugin
import 'videojs-ima/dist/videojs.ima.css'; // Import video.js IMA default styles
import './Player.css'

const VideoPlayer = ({ videoUrl }) => {
  const videoNode = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    if (videoNode.current) {
      // Initialize video.js player
      player.current = videojs(videoNode.current, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        sources: [{
          src: videoUrl,
          type: 'video/mp4',
        }],
      });

      // Setup IMA ad integration
      // player.current.ima({
      //   id: videoNode.current.id,
      //   adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
      // });

      // Cleanup the player on component unmount
      return () => {
        if (player.current) {
          player.current.dispose();
        }
      };
    }
  }, [videoUrl]);


  return (

    <div className="flex ">
      <video
          ref={videoNode}
          id="video-player"
          className="video-js"
        />
    </div>
  );
};

export default VideoPlayer;
