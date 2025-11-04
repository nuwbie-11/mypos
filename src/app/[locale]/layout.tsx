import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import Sidebar from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;

  console.log("====================================");
  console.log("locale", locale);
  console.log("====================================");

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`../../messages/id.json`)).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Sidebar>{children}</Sidebar>
    </NextIntlClientProvider>
  );
}
