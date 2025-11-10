export type Locale = "en" | "pt" | "ru";

import en from "./en/common.json";
import pt from "./pt/common.json";
import ru from "./ru/common.json";

export interface I18nDict {
  [key: string]: string | I18nDict;
}

const DICTS: Record<Locale, I18nDict> = {
  en: en as I18nDict,
  pt: pt as I18nDict,
  ru: ru as I18nDict,
};

function getDict(locale: Locale): I18nDict {
  return DICTS[locale] ?? DICTS.en;
}

export function t(key: string, locale: Locale = "en"): string {
  const dict = getDict(locale);
  const parts = key.split(".");
  let cur: string | I18nDict | undefined = dict;
  for (const p of parts) {
    if (typeof cur === "string" || cur == null) return key;
    cur = cur[p];
  }
  return typeof cur === "string" ? cur : key;
}
