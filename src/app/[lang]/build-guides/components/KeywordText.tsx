"use client";

import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Renders inline keywords with illustrative icons.
 * Currently supports the Energy keyword for EN/PT/RU.
 */
export default function KeywordText({
  text,
  lang,
}: {
  text: string;
  lang: string;
}): ReactNode {
  // Normalize locale to a base language tag
  const locale = lang.startsWith("pt")
    ? "pt"
    : lang.startsWith("ru")
    ? "ru"
    : "en";

  const cfg = (() => {
    switch (locale) {
      case "pt":
        return {
          regex: /\benergia\b/gi,
          alt: "Energia",
        };
      case "ru":
        // Match common inflections: Энергия, Энергии, Энергию, Энергией, etc.
        return {
          regex: /Энерг(ия|ии|ию|ией|ями|ями|ях|и|ю)/gi,
          alt: "Энергия",
        };
      default:
        return {
          regex: /\benergy\b/gi,
          alt: "Energy",
        };
    }
  })();

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  const input = String(text);
  let match: RegExpExecArray | null;

  while ((match = cfg.regex.exec(input)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    if (start > lastIndex) parts.push(input.slice(lastIndex, start));

    parts.push(
      <span key={`kw-${start}`} className="inline-flex items-baseline">
        <Image
          src="/images/assets/energy.png"
          alt={cfg.alt}
          width={16}
          height={16}
          className="mr-1 inline-block align-text-bottom"
        />
        <span className="font-bold">{match[0]}</span>
      </span>
    );

    lastIndex = end;
  }

  if (lastIndex < input.length) parts.push(input.slice(lastIndex));

  // Second pass: highlight the word "stash" with icon before the word
  const finalParts: ReactNode[] = [];
  for (let idx = 0; idx < parts.length; idx++) {
    const node = parts[idx] as ReactNode;
    if (typeof node === "string") {
      const s = node as string;
      const r = /\bstash\b/gi;
      let li = 0;
      let m2: RegExpExecArray | null;
      while ((m2 = r.exec(s)) !== null) {
        const start2 = m2.index;
        const end2 = start2 + m2[0].length;
        if (start2 > li) finalParts.push(s.slice(li, start2));
        finalParts.push(
          <span
            key={`stash-${idx}-${start2}`}
            className="inline-flex items-baseline"
          >
            <Image
              src="/images/assets/stash.png"
              alt="Stash"
              width={16}
              height={16}
              className="mr-1 inline-block align-text-bottom"
            />
            <span className="font-bold">Stash</span>
          </span>
        );
        li = end2;
      }
      if (li < s.length) finalParts.push(s.slice(li));
    } else {
      finalParts.push(node);
    }
  }

  return <>{finalParts}</>;
}
