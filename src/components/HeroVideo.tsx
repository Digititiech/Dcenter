"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer loading the video until after the page mounts
    // and browser is idle (using a 1-second timeout)
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 1000);

    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Use Intersection Observer to detect when video scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Mute the video if it is scrolled out of view
          videoEl.muted = true;
        }
      },
      { threshold: 0.1 } // Trigger when less than 10% is visible
    );

    observer.observe(videoEl);

    return () => {
      clearTimeout(timer);
      observer.unobserve(videoEl);
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-surface-container-high flex items-center justify-center">
      {/* Pulse placeholder while video is deferred/loading */}
      {!shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-container-high animate-pulse">
          <span className="material-symbols-outlined text-secondary/35 text-5xl">
            play_circle
          </span>
        </div>
      )}
      
      {shouldLoad && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-opacity duration-1000 opacity-0"
          src="/intro-video.mp4"
          controls
          autoPlay
          muted // Required by browsers to allow autoplay
          loop
          playsInline
          onCanPlayThrough={(e) => {
            // Smoothly fade-in the video once it has loaded enough to play
            (e.target as HTMLVideoElement).classList.remove("opacity-0");
            (e.target as HTMLVideoElement).classList.add("opacity-100");
          }}
        />
      )}
    </div>
  );
}
