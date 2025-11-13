"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BuildGuideFilter, type BuildFilterState } from "./BuildGuideFilter";
import { useI18nClient } from "@/i18n/client";

export type BuildItem = {
  author: string;
  lastUpdated: string; // e.g. "11/10/2025"
  buildName: string;
};

export type TraitBuilds = {
  leveling?: BuildItem[];
  twinkLeveling?: BuildItem[];
  endGame?: BuildItem[];
};

interface BuildsListProps {
  builds: TraitBuilds;
}

export function BuildsList({ builds }: BuildsListProps) {
  const [filters, setFilters] = useState<BuildFilterState>({
    leveling: false,
    twinkLeveling: false,
    endGame: false,
  });
  const { t, locale } = useI18nClient();
  const pathname = usePathname();

  function parseDateByLocale(input: string, loc: string): Date | null {
    // Expecting dd/MM/yyyy for pt, ru; mm/dd/yyyy for en
    const parts = input.split("/");
    if (parts.length !== 3) return null;
    let d = 0,
      m = 0,
      y = 0;
    if (loc.startsWith("en")) {
      // mm/dd/yyyy
      m = parseInt(parts[0], 10);
      d = parseInt(parts[1], 10);
      y = parseInt(parts[2], 10);
    } else {
      // dd/MM/yyyy
      d = parseInt(parts[0], 10);
      m = parseInt(parts[1], 10);
      y = parseInt(parts[2], 10);
    }
    if (!d || !m || !y) return null;
    const date = new Date(y, m - 1, d);
    return isNaN(date.getTime()) ? null : date;
  }

  function formatLastUpdated(input: string, loc: string): string {
    const date = parseDateByLocale(input, loc);
    if (!date) return input;
    const tag = loc.startsWith("en")
      ? "en-US"
      : loc.startsWith("pt")
      ? "pt-BR"
      : "ru-RU";
    const opts: Intl.DateTimeFormatOptions = loc.startsWith("en")
      ? { day: "2-digit", month: "short", year: "numeric" }
      : { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat(tag, opts).format(date);
  }

  const activeKeys = useMemo(() => {
    const keys = Object.entries(filters)
      .filter(([, v]) => v)
      .map(([k]) => k as keyof BuildFilterState);
    return keys;
  }, [filters]);

  const showAll = activeKeys.length === 0;

  const sections: Array<{
    key: keyof TraitBuilds;
    title: string;
    items: BuildItem[] | undefined;
  }> = [
    { key: "leveling", title: "Leveling", items: builds.leveling },
    {
      key: "twinkLeveling",
      title: "Twink Leveling",
      items: builds.twinkLeveling,
    },
    { key: "endGame", title: "EndGame", items: builds.endGame },
  ];

  return (
    <div className="space-y-6">
      <BuildGuideFilter value={filters} onChange={setFilters} />

      <div className="space-y-8">
        {sections.map(({ key, title, items }) => {
          const shouldShow = showAll || filters[key as keyof BuildFilterState];
          if (!shouldShow || !items || items.length === 0) return null;

          return (
            <section key={String(key)} className="space-y-3">
              <h3 className="text-lg font-semibold">{title}</h3>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {items.map((b, idx) => (
                  <li
                    key={`${b.buildName}-${idx}`}
                    className="relative p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >
                    {key === "twinkLeveling" && (
                      <Link
                        href={`${pathname}/twink-leveling`}
                        className="absolute inset-0 z-[1]"
                        aria-label={b.buildName}
                      />
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold truncate text-[1.35rem]">
                        {b.buildName}
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground ml-4 whitespace-nowrap">
                        {t("builds.lastUpdated")}{" "}
                        {formatLastUpdated(b.lastUpdated, locale)}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground italic">
                      {t("builds.by")} {b.author}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {sections.every((s) => !s.items || s.items.length === 0) && (
          <p className="text-sm text-muted-foreground">{t("builds.none")}</p>
        )}
      </div>
    </div>
  );
}
