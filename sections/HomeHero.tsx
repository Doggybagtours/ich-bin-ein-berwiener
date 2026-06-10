"use client";

import { useEffect, useRef, useState } from "react";
import EventCountdown from "@/components/EventCountdown";
import FreeEventNotice from "@/sections/FreeEventNotice";

type Props = {
  eventTagline: string;
  subheadline: string;
  eventDetails: string;
  freeEventLabel: string;
  freeEventMessage: string;
  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
};

export default function HomeHero({
  eventTagline,
  subheadline,
  eventDetails,
  freeEventLabel,
  freeEventMessage,
  countdown,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSize, setVideoSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => {});
  }, []);

  function handleLoadedMetadata() {
    const video = videoRef.current;
    if (!video) return;

    setVideoSize({
      width: video.videoWidth,
      height: video.videoHeight,
    });
  }

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        src="/video/Hero-video.mp4"
        className="hero-video"
        width={videoSize?.width}
        height={videoSize?.height}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <section className="home-hero-content mx-auto max-w-3xl px-6 py-20 text-center sm:px-8 sm:py-24 md:py-28">
        <p className="home-hero__tagline">{eventTagline}</p>

        <h1 className="home-hero__headline">
          <span className="flyer-paw-accent" aria-hidden="true">
            ★
          </span>
          {subheadline}
        </h1>

        <p className="home-hero__details">{eventDetails}</p>

        <div className="home-hero__divider" aria-hidden="true" />

        <EventCountdown labels={countdown} />

        <FreeEventNotice label={freeEventLabel} message={freeEventMessage} />
      </section>
    </>
  );
}
