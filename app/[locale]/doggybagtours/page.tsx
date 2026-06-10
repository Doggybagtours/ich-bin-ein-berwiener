import Image from "next/image";
import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import AnniversaryBadge from "@/components/AnniversaryBadge";
import PageShell from "@/components/PageShell";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function DoggyBagToursPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("WalkPage");

  return (
    <PageShell title={t("title")}>
      <div className="walk-page-header">
        <div className="walk-page-header__item">
          <AnniversaryBadge label={t("anniversaryLabel")} sublabel={t("anniversarySublabel")} />
        </div>
        <div className="walk-page-header__item walk-page-header__item--logo">
          <Image
            src="/images/doggy bag tours/logo.png"
            alt={t("title")}
            width={1776}
            height={1800}
            className="walk-page-header__logo"
            sizes="(max-width: 767px) 90px, 120px"
          />
        </div>
      </div>

      <section className="doggybagtours-intro" aria-label={t("title")}>
        <div className="doggybagtours-intro__grid">
          <div className="doggybagtours-intro__content">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
            <p>{t("paragraph3")}</p>
          </div>

          <div className="doggybagtours-intro__image-wrap">
            <div className="doggybagtours-intro__image-card">
              <Image
                src="/images/M en M on tour.jpg"
                alt={t("title")}
                width={252}
                height={336}
                className="doggybagtours-intro__image"
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <p>
        <a
          href="https://doggybagtours.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent underline underline-offset-4 transition-colors hover:text-text-primary"
        >
          {t("websiteLink")}
        </a>
      </p>
    </PageShell>
  );
}
