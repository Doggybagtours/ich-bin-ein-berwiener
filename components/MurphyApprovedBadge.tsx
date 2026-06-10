"use client";

import { useTranslations } from "next-intl";

export default function MurphyApprovedBadge() {
  const t = useTranslations("Navigation");

  return (
    <span
      className="murphy-badge murphy-badge--nav hidden md:inline-flex"
      title={t("murphyApproved")}
    >
      <span className="murphy-badge__star" aria-hidden="true">
        ★
      </span>
      {t("murphyApproved")}
    </span>
  );
}
