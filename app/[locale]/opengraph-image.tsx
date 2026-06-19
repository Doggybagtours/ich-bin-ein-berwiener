import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const alt = "Ich bin ein Berwiener";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const subtitle =
    locale === "de" ? "Dackel-Spaziergang Berlin" : "Dachshund Walk Berlin";
  const dateLine =
    locale === "de"
      ? "Sonntag, 21. Juni 2026 · Pariser Platz"
      : "Sunday, 21 June 2026 · Pariser Platz";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111111",
          color: "#ffffff",
          padding: "64px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          {t("siteName")}
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#c8102e",
            marginBottom: 24,
          }}
        >
          {subtitle}
        </div>
        <div style={{ fontSize: 28, opacity: 0.92 }}>{dateLine}</div>
      </div>
    ),
    { ...size },
  );
}
