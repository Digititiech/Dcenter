"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Force default unmuted state
    videoEl.muted = false;

    // Try playing immediately
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log("Initial unmuted autoplay blocked by browser policy. Registering interaction listeners.", err);
        
        // Listen to first mouse move, touch, scroll, or click to start unmuted playback
        const startVideo = () => {
          videoEl.muted = false;
          videoEl.play()
            .then(() => removeListeners())
            .catch((e) => console.log("Failed to start unmuted on interaction", e));
        };

        const removeListeners = () => {
          window.removeEventListener("mousemove", startVideo);
          window.removeEventListener("click", startVideo);
          window.removeEventListener("touchstart", startVideo);
          window.removeEventListener("scroll", startVideo);
        };

        window.addEventListener("mousemove", startVideo, { once: true });
        window.addEventListener("click", startVideo, { once: true });
        window.addEventListener("touchstart", startVideo, { once: true });
        window.addEventListener("scroll", startVideo, { once: true });
      });
    }

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
      loop
      playsInline
    />
  );
}
