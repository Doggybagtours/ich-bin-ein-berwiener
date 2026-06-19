import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/JsonLd";
import PageCrossLinks from "@/components/PageCrossLinks";
import PageShell from "@/components/PageShell";
import { buildPageStructuredData } from "@/lib/json-ld";
import { generateRouteMetadata } from "@/lib/route-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateRouteMetadata(locale, "about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, meta] = await Promise.all([
    getTranslations("AboutPage"),
    getTranslations({ locale, namespace: "Metadata" }),
  ]);

  const jsonLd = buildPageStructuredData(
    {
      locale,
      name: meta("aboutTitle"),
      description: meta("aboutDescription"),
      pathname: "/about",
    },
    [
      { name: meta("breadcrumbHome"), pathname: "/" },
      { name: t("title"), pathname: "/about" },
    ],
  );

  return (
    <PageShell title={t("title")} background="alt">
      <JsonLd data={jsonLd} />
      <div className="about-featured">
        <div className="about-featured__slot">
          <Image
            src="/images/doggy bag tours/m en m.jpg"
            alt={t("featuredImageAlt")}
            width={320}
            height={240}
            className="about-featured__image"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>
      </div>

      <p>{t("paragraph1")}</p>
      <p>{t("paragraph2")}</p>
      <p>{t("paragraph3")}</p>
      <p>{t("paragraph4")}</p>

      <PageCrossLinks
        ariaLabel={t("crossLinksAriaLabel")}
        links={[
          { href: "/when", label: t("crossLinkWhen") },
          { href: "/who", label: t("crossLinkWho") },
        ]}
      />
    </PageShell>
  );
}
