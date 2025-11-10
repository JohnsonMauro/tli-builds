import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { t, type Locale } from "@/i18n";

const SUPPORTED: readonly Locale[] = ["en", "pt", "ru"] as const;

function ensureLocale(lang: string): lang is Locale {
  return (SUPPORTED as readonly string[]).includes(lang);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = ensureLocale(langParam) ? langParam : "en";
  return {
    title: t("home.welcome", lang),
    description: "TorchLight Infinite Frontend",
    alternates: {
      languages: { en: "/en", pt: "/pt", ru: "/ru" },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!ensureLocale(lang)) {
    // Redirect to 404 apology page
    notFound();
  }
  return <>{children}</>;
}
