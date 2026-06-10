import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import PageShell from "@/components/PageShell";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function ShopPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("ShopPage");

  return <PageShell title={t("title")}>{t("description")}</PageShell>;
}
