"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SUPPORTED = ["en", "pt", "ru"] as const;

type Supported = (typeof SUPPORTED)[number];

export function LangSetter() {
  const pathname = usePathname();
  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean);
    const first = (parts[0] as string | undefined) ?? "";
    const lang: Supported = (SUPPORTED as readonly string[]).includes(first)
      ? (first as Supported)
      : "en";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [pathname]);
  return null;
}

