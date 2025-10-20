import React from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("dashboard.title"),
    description: "Dashboard",
  };
}

export default async function Page() {
  const t = await getTranslations();

  return <div className="">{t("dashboard.title")}</div>;
}
