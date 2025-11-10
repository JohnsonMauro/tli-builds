"use client";

import { useEffect, useMemo, useState } from "react";
import { t as tCore } from "./index";
export type { Locale } from "./index";

import type { Locale as L } from "./index";

let currentLocale: L = "en";

function initLocaleFromDom(): void {
  if (typeof document === "undefined") return;
  const lang = (document.documentElement.lang || "en").toLowerCase();
  if (lang.startsWith("pt")) currentLocale = "pt" as L;
  else if (lang.startsWith("ru")) currentLocale = "ru" as L;
  else currentLocale = "en" as L;
}

export function getLocale(): L {
  if (typeof document !== "undefined" && document.documentElement.lang) {
    initLocaleFromDom();
  }
  return currentLocale;
}

export function setLocale(locale: L): void {
  currentLocale = locale;
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("i18n:locale"));
  }
}

export function useI18nClient() {
  const [locale, setLoc] = useState<L>(() => getLocale());

  useEffect(() => {
    initLocaleFromDom();
    setLoc(getLocale());

    const handler = () => setLoc(getLocale());
    if (typeof window !== "undefined") {
      window.addEventListener("i18n:locale", handler);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("i18n:locale", handler);
      }
    };
  }, []);

  const t = useMemo(() => (key: string) => tCore(key, locale), [locale]);
  return { locale, t } as const;
}

