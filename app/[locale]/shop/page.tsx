import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import { buildPageStructuredData } from "@/lib/json-ld";
import { generateRouteMetadata } from "@/lib/route-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateRouteMetadata(locale, "shop");
}

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, meta] = await Promise.all([
    getTranslations("ShopPage"),
    getTranslations({ locale, namespace: "Metadata" }),
  ]);

  const jsonLd = buildPageStructuredData(
    {
      locale,
      name: meta("shopTitle"),
      description: meta("shopDescription"),
      pathname: "/shop",
    },
    [
      { name: meta("breadcrumbHome"), pathname: "/" },
      { name: t("title"), pathname: "/shop" },
    ],
  );

  return (
    <PageShell title={t("title")}>
      <JsonLd data={jsonLd} />
      {t("description")}
    </PageShell>
  );
}
