"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { t, type Locale } from "@/i18n";

const SUPPORTED: readonly Locale[] = ["en", "pt", "ru"] as const;

function parseLocaleFromPath(pathname: string): {
  locale: Locale;
  rest: string;
} {
  const parts = pathname.split("/").filter(Boolean);
  const first = (parts[0] as string | undefined) ?? "";
  const isSupported = (SUPPORTED as readonly string[]).includes(first);
  const locale = (isSupported ? first : "en") as Locale;
  const rest = isSupported ? "/" + parts.slice(1).join("/") : pathname;
  return { locale, rest: rest === "" ? "/" : rest };
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, rest } = parseLocaleFromPath(pathname);

  const goToLocale = (next: Locale) => {
    const nextPath = `/${next}${rest === "/" ? "" : rest}`;
    router.push(nextPath);
  };

  return (
    <header className="border-b border-black/10 dark:border-white/10 bg-background/50 backdrop-blur">
      <nav className="container mx-auto px-4 py-4 flex items-center gap-6">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium hover:underline"
        >
          {t("header.home", locale)}
        </Link>
        <Link
          href={`/${locale}/build-guides`}
          className="text-sm font-medium hover:underline"
        >
          {t("header.buildGuides", locale)}
        </Link>
        <Link
          href={`/${locale}/damage-calculation`}
          className="text-sm font-medium hover:underline"
        >
          {t("header.damageCalculation", locale)}
        </Link>
        <div className="ml-auto">
          <label className="sr-only" htmlFor="lang-select">
            Language
          </label>
          <select
            id="lang-select"
            className="text-sm border rounded px-2 py-1 bg-background"
            value={locale}
            onChange={(e) => goToLocale(e.target.value as Locale)}
          >
            <option value="en">EN</option>
            <option value="pt">PT</option>
            <option value="ru">RU</option>
          </select>
        </div>
      </nav>
    </header>
  );
}
