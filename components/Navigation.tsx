"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import MurphyApprovedBadge from "./MurphyApprovedBadge";
import NavigationLink from "./NavigationLink";

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/when", key: "when" },
  { href: "/who", key: "who" },
  { href: "/doggybagtours", key: "doggyBagTours" },
  { href: "/community", key: "community" },
  { href: "/shop", key: "shop" },
] as const;

export default function Navigation() {
  const t = useTranslations("Navigation");
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-nav site-nav--bar">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <nav className="hidden min-w-0 flex-1 items-center gap-4 overflow-x-auto lg:flex xl:gap-6">
          {navItems.map(({ href, key }) => (
            <NavigationLink key={key} href={href}>
              {t(key)}
            </NavigationLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <MurphyApprovedBadge />
          <a
            href="https://www.instagram.com/berwienerdackelwalk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <LocaleSwitcher />

          <button
            type="button"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 text-text-primary lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-text-primary/8 bg-bg-primary px-4 py-5 lg:hidden">
          <ul className="flex flex-col gap-3">
            {navItems.map(({ href, key }) => (
              <li key={key}>
                <NavigationLink
                  href={href}
                  onNavigate={closeMenu}
                  className="block py-1 text-sm"
                >
                  {t(key)}
                </NavigationLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
