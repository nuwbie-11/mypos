"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const languages = [
  { code: "en", name: "English" },
  { code: "id", name: "Indonesia" },
];

// Helper function to get cookie value
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export function LanguageSwitcher() {
  const t = useTranslations("lang");
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLang, setSelectedLang] = useState("id");

  // Initialize the selected language on component mount
  useEffect(() => {
    // First, check for locale in pathname
    const pathSegments = pathname.split("/");
    const localeInPath = pathSegments[1];
    if (localeInPath && languages.some((lang) => lang.code === localeInPath)) {
      setSelectedLang(localeInPath);
      return;
    }

    // Then, check for locale preference in cookie
    if (typeof window !== "undefined") {
      const cookieLocale = getCookie("NEXT_LOCALE");
      if (
        cookieLocale &&
        languages.some((lang) => lang.code === cookieLocale)
      ) {
        setSelectedLang(cookieLocale);
      }
    }
  }, [pathname]);

  const changeLanguage = (langCode: string) => {
    // Extract the current locale from pathname and replace it
    const pathSegments = pathname.split("/");
    if (
      pathSegments[1] &&
      languages.some((lang) => lang.code === pathSegments[1])
    ) {
      // Replace the locale in the pathname
      pathSegments[1] = langCode;
      // Set the locale preference in a cookie
      document.cookie = `NEXT_LOCALE=${langCode}; path=/; max-age=31536000; SameSite=Lax`;
      router.push(pathSegments.join("/"));
    } else {
      // If no locale in path, add it
      // Set the locale preference in a cookie
      document.cookie = `NEXT_LOCALE=${langCode}; path=/; max-age=31536000; SameSite=Lax`;
      router.push(`/${langCode}${pathname === "/" ? "" : pathname}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-sm">
          <span className="capitalize">{t(`${selectedLang}`)}</span>
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => changeLanguage(lang.code)}
            className="capitalize"
          >
            <div className="flex items-center justify-between w-full">
              <span>{lang.name}</span>
              {selectedLang === lang.code && (
                <CheckIcon className="h-4 w-4 ml-2" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
