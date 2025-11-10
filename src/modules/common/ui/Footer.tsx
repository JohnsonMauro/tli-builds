"use client";

import { usePathname } from "next/navigation";
import { t, type Locale } from "@/i18n";

const SUPPORTED: readonly Locale[] = ["en", "pt", "ru"] as const;

function getLocale(pathname: string): Locale {
  const parts = pathname.split("/").filter(Boolean);
  const first = (parts[0] as string | undefined) ?? "";
  return (SUPPORTED as readonly string[]).includes(first)
    ? (first as Locale)
    : "en";
}

export function Footer() {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/10">
      <div className="container mx-auto px-4 py-4 text-sm text-center">
        {t("footer.madeWithLove", locale)}
      </div>
    </footer>
  );
}
