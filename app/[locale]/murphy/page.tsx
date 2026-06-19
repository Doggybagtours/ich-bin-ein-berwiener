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
  return generateRouteMetadata(locale, "murphy");
}

export default async function MurphyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, meta] = await Promise.all([
    getTranslations("MurphyPage"),
    getTranslations({ locale, namespace: "Metadata" }),
  ]);

  const jsonLd = buildPageStructuredData(
    {
      locale,
      name: meta("murphyTitle"),
      description: meta("murphyDescription"),
      pathname: "/murphy",
    },
    [
      { name: meta("breadcrumbHome"), pathname: "/" },
      { name: t("title"), pathname: "/murphy" },
    ],
  );

  return (
    <PageShell title={t("title")}>
      <JsonLd data={jsonLd} />
      <p>{t("description")}</p>
      <PageCrossLinks
        ariaLabel={t("crossLinksAriaLabel")}
        links={[
          { href: "/who", label: t("crossLinkWho") },
          { href: "/when", label: t("crossLinkWhen") },
        ]}
      />
    </PageShell>
  );
}
