"use client";

import { useEffect, useState } from "react";
import { eventStartDate } from "@/lib/site";

const EVENT_TIME = new Date(eventStartDate).getTime();

type Labels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, EVENT_TIME - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

type Props = {
  labels: Labels;
};

export default function EventCountdown({ labels }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div
        className="mx-auto mb-14 grid max-w-xl grid-cols-4 gap-4 sm:mb-16 sm:gap-6"
        aria-hidden="true"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-20 rounded-sm bg-black/5 sm:h-24" />
        ))}
      </div>
    );
  }

  const units = [
    { value: pad(timeLeft.days), label: labels.days },
    { value: pad(timeLeft.hours), label: labels.hours },
    { value: pad(timeLeft.minutes), label: labels.minutes },
    { value: pad(timeLeft.seconds), label: labels.seconds },
  ];

  return (
    <div
      className="mx-auto mb-14 grid max-w-xl grid-cols-4 gap-4 sm:mb-16 sm:gap-6"
      role="timer"
      aria-live="polite"
    >
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="font-sans text-3xl font-bold tabular-nums text-accent sm:text-4xl md:text-5xl">
            {unit.value}
          </div>
          <div className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-text-primary sm:text-sm">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
