import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="site-footer mt-auto">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-10 h-1 w-12 bg-accent" aria-hidden="true" />
        <p className="mb-3 font-sans text-lg font-bold text-white sm:text-xl">
          {t("eventName")}
        </p>
        <p className="mb-8 max-w-md font-sans text-sm leading-relaxed text-white/70 sm:text-base">
          {t("tagline")}
        </p>
        <p className="site-footer__accent mb-8 font-sans text-sm font-semibold uppercase tracking-[0.16em]">
          {t("date")}
        </p>

        <nav className="mb-10 flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/about" className="site-footer__link font-sans text-sm">
            {t("about")}
          </Link>
          <Link href="/when" className="site-footer__link font-sans text-sm">
            {t("when")}
          </Link>
          <Link href="/who" className="site-footer__link font-sans text-sm">
            {t("who")}
          </Link>
          <Link href="/doggybagtours" className="site-footer__link font-sans text-sm">
            {t("doggyBagTours")}
          </Link>
          <Link href="/community" className="site-footer__link font-sans text-sm">
            {t("community")}
          </Link>
        </nav>

        <div className="site-footer__contact">
          <a
            href="mailto:contact@doggybagtours.de"
            className="site-footer__contact-btn"
          >
            Contact Us
          </a>
          <p className="site-footer__contact-text">
            Questions, ideas, award nominations or dachshund-related emergencies?
          </p>
          <a
            href="mailto:contact@doggybagtours.de"
            className="site-footer__contact-email"
          >
            contact@doggybagtours.de
          </a>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="font-sans text-sm text-white/50">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
