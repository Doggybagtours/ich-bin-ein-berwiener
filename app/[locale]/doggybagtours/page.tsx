import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AnniversaryBadge from "@/components/AnniversaryBadge";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import { buildPageStructuredData } from "@/lib/json-ld";
import { generateRouteMetadata } from "@/lib/route-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateRouteMetadata(locale, "doggyBagTours");
}

export default async function DoggyBagToursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, meta] = await Promise.all([
    getTranslations("WalkPage"),
    getTranslations({ locale, namespace: "Metadata" }),
  ]);

  const jsonLd = buildPageStructuredData(
    {
      locale,
      name: meta("doggyBagToursTitle"),
      description: meta("doggyBagToursDescription"),
      pathname: "/doggybagtours",
    },
    [
      { name: meta("breadcrumbHome"), pathname: "/" },
      { name: t("title"), pathname: "/doggybagtours" },
    ],
  );

  return (
    <PageShell title={t("title")}>
      <JsonLd data={jsonLd} />
      <div className="walk-page-header">
        <div className="walk-page-header__item">
          <AnniversaryBadge label={t("anniversaryLabel")} sublabel={t("anniversarySublabel")} />
        </div>
        <div className="walk-page-header__item walk-page-header__item--logo">
          <Image
            src="/images/doggy bag tours/logo.png"
            alt={t("logoAlt")}
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
                alt={t("tourImageAlt")}
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
