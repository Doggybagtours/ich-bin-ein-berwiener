import { Caveat, DM_Sans } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { routing } from "@/i18n/routing";
import { ogImageHeight, ogImageWidth, siteUrl } from "@/lib/site";
import { openGraphImageUrl } from "@/lib/metadata";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c8102e",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const ogImage = openGraphImageUrl(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("defaultTitle"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    applicationName: t("siteName"),
    creator: "Doggy Bag Tours",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      siteName: t("siteName"),
      type: "website",
      images: [
        {
          url: ogImage,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: t("siteName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
    verification: {
      other: {
        "msvalidate.01": "EB1861F86D8E9C92F80EC2105AD384BD",
      },
    },
    manifest: "/favicon/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/favicon/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${caveat.variable} ${dmSans.variable} flex min-h-screen flex-col bg-bg-primary text-text-primary antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <div className="flex-1">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
