"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
      observer.unobserve(videoEl);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      src="/intro-video.mp4"
      controls
      autoPlay
      muted // Required by browsers to allow autoplay
      loop
      playsInline
    />
  );
}
