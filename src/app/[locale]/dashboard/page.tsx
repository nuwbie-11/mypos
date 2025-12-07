import PageContainer from "@/components/page-container";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("dashboard");

  return (
    <PageContainer>
      <div className="h-dvh">{t("test")}</div>
    </PageContainer>
  );
}
