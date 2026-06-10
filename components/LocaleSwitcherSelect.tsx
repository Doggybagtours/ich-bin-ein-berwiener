"use client";

import { useParams } from "next/navigation";
import type { Locale } from "next-intl";
import { type ChangeEvent, type ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- params match the current pathname
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <label
      className={`relative inline-flex items-center gap-2 ${isPending ? "opacity-60" : ""}`}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-black">
        {label}
      </span>
      <select
        className="scrap-sticker cursor-pointer rounded-none border-2 border-black bg-red px-2 py-1 text-xs font-bold uppercase text-white outline-none"
        defaultValue={defaultValue}
        onChange={onSelectChange}
        disabled={isPending}
      >
        {children}
      </select>
    </label>
  );
}
