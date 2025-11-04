import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Sidebar from "@/components/sidebar";

export default async function NotFound({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NotFound" });

  return (
    <Sidebar>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">
              {t("title")}
            </h2>
            <p className="max-w-md text-base text-muted-foreground">
              {t("description")}
            </p>
          </div>
          <div className="pt-4">
            <Link href={`/${locale}/dashboard`} passHref>
              <Button variant="default">{t("backHome")}</Button>
            </Link>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}