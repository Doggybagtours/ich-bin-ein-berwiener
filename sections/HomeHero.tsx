"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import EventCountdown from "@/components/EventCountdown";
import FirstEditionTicker from "@/components/FirstEditionTicker";
import FreeEventNotice from "@/sections/FreeEventNotice";

type CrossLink = {
  href: "/" | "/about" | "/when" | "/who";
  label: string;
};

type Props = {
  firstEditionTicker: string;
  eventTagline: string;
  subheadline: string;
  intro: string;
  eventDetails: string;
  freeEventLabel: string;
  freeEventMessage: string;
  videoAriaLabel: string;
  crossLinks: CrossLink[];
  crossLinksAriaLabel: string;
  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
};

export default function HomeHero({
  firstEditionTicker,
  eventTagline,
  subheadline,
  intro,
  eventDetails,
  freeEventLabel,
  freeEventMessage,
  videoAriaLabel,
  crossLinks,
  crossLinksAriaLabel,
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
        preload="metadata"
        poster="/images/flyers/murphy-sunglasses-brandenburg-gate.png"
        src="/video/Hero-video.mp4"
        className="hero-video"
        width={videoSize?.width}
        height={videoSize?.height}
        aria-label={videoAriaLabel}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <section className="home-hero-content mx-auto max-w-3xl px-6 py-20 text-center sm:px-8 sm:py-24 md:py-28">
        <p className="home-hero__tagline">{eventTagline}</p>

        <h1 className="home-hero__headline">{subheadline}</h1>

        <p className="home-hero__details">{eventDetails}</p>

        <p className="home-hero__intro">{intro}</p>

        <nav className="page-cross-links page-cross-links--center" aria-label={crossLinksAriaLabel}>
          <ul className="page-cross-links__list">
            {crossLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="page-cross-links__link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="home-hero__divider" aria-hidden="true" />

        <FirstEditionTicker label={firstEditionTicker} />

        <EventCountdown labels={countdown} />

        <FreeEventNotice label={freeEventLabel} message={freeEventMessage} />
      </section>
    </>
  );
}
