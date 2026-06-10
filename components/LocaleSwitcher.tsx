"use client";

import { useParams } from "next/navigation";
import type { Locale } from "next-intl";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- params match the current pathname
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <div
      className={`flex shrink-0 items-center gap-2 font-sans text-[0.7rem] font-bold uppercase tracking-[0.14em] sm:text-xs ${isPending ? "opacity-60" : ""}`}
      aria-label="Language"
    >
      <button
        type="button"
        data-active={locale === "de"}
        onClick={() => switchLocale("de")}
        className="text-text-primary/45 transition-colors hover:text-text-primary data-[active=true]:text-text-primary"
        disabled={isPending}
      >
        DE
      </button>
      <span className="text-text-primary/25" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        data-active={locale === "en"}
        onClick={() => switchLocale("en")}
        className="text-text-primary/45 transition-colors hover:text-text-primary data-[active=true]:text-text-primary"
        disabled={isPending}
      >
        EN
      </button>
    </div>
  );
}
