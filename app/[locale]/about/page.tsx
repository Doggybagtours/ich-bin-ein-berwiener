import Image from "next/image";
import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import PageShell from "@/components/PageShell";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function AboutPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("AboutPage");

  return (
    <PageShell title={t("title")} background="alt">
      <div className="about-featured">
        <div className="about-featured__slot">
          <Image
            src="/images/doggy bag tours/m en m.jpg"
            alt={t("title")}
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
    </PageShell>
  );
}
