"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Try autoplaying on mount (video is muted in JSX to guarantee success)
    videoEl.play().catch((err) => {
      console.log("Autoplay check:", err);
    });

    // Unmute as soon as the user interacts with the page
    const unmuteVideo = () => {
      if (videoEl) {
        videoEl.muted = false;
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("mousemove", unmuteVideo);
      window.removeEventListener("click", unmuteVideo);
      window.removeEventListener("touchstart", unmuteVideo);
      window.removeEventListener("scroll", unmuteVideo);
    };

    window.addEventListener("mousemove", unmuteVideo, { once: true });
    window.addEventListener("click", unmuteVideo, { once: true });
    window.addEventListener("touchstart", unmuteVideo, { once: true });
    window.addEventListener("scroll", unmuteVideo, { once: true });

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
      removeListeners();
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
