"use client";

import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("dashboard");
  return <div className="">{t("test")}</div>;
}
