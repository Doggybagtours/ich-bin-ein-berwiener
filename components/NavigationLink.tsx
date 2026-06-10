"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Props = ComponentProps<typeof Link> & {
  onNavigate?: () => void;
};

export default function NavigationLink({
  href,
  onNavigate,
  children,
  ...rest
}: Props) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`site-nav-link font-sans text-[0.7rem] font-bold uppercase tracking-[0.16em] transition-colors sm:text-xs ${
        isActive ? "text-accent" : "text-text-primary hover:text-accent"
      }`}
      {...rest}
    >
      {children}
    </Link>
  );
}
