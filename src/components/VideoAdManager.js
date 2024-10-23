import React, { useEffect, useRef } from 'react';

const VideoAdManager = ({ player }) => {
  const adDisplayContainerRef = useRef(null);
  const adsLoaderRef = useRef(null);
  const adsManagerRef = useRef(null);
  const videoElementRef = useRef(null);

  useEffect(() => {
    const initializeAds = () => {
      adDisplayContainerRef.current = new window.google.ima.AdDisplayContainer(
        document.getElementById('adContainer'), 
        videoElementRef.current
      );

      adsLoaderRef.current = new window.google.ima.AdsLoader(adDisplayContainerRef.current);

      adsLoaderRef.current.addEventListener(
        window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        onAdsManagerLoaded,
        false
      );

      adsLoaderRef.current.addEventListener(
        window.google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError,
        false
      );

      const adsRequest = new window.google.ima.AdsRequest();
      adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=';
      
      adsRequest.linearAdSlotWidth = player.current.offsetWidth;
      adsRequest.linearAdSlotHeight = player.current.offsetHeight;
      adsRequest.nonLinearAdSlotWidth = player.current.offsetWidth;
      adsRequest.nonLinearAdSlotHeight = player.current.offsetHeight;

      adsLoaderRef.current.requestAds(adsRequest);
    };

    const onAdsManagerLoaded = (adsManagerLoadedEvent) => {
      adsManagerRef.current = adsManagerLoadedEvent.getAdsManager(videoElementRef.current);

      adsManagerRef.current.addEventListener(
        window.google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError
      );

      adsManagerRef.current.addEventListener(
        window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
        () => player.current.pause()
      );

      adsManagerRef.current.addEventListener(
        window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
        () => player.current.play()
      );

      adsManagerRef.current.init(
        player.current.offsetWidth,
        player.current.offsetHeight,
        window.google.ima.ViewMode.NORMAL
      );

      adsManagerRef.current.start();
    };

    const onAdError = (adErrorEvent) => {
      console.error("Ad error:", adErrorEvent.getError());
      if (adsManagerRef.current) {
        adsManagerRef.current.destroy();
      }
    };

    player.current.addEventListener('play', () => {
      adDisplayContainerRef.current.initialize();
    });

    initializeAds();
  }, [player]);

  return <div id="adContainer" style={{ width: '100%', height: '100%' }}></div>;
};

export default VideoAdManager;
