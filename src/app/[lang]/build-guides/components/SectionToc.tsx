"use client";

import { useEffect, useState } from "react";

export type TocSection = { id: string; title: string };

type SectionTocProps = {
  tocTitle: string;
  sections: TocSection[];
};

export default function SectionToc({ tocTitle, sections }: SectionTocProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the first most visible section as active
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        // Trigger a bit before the section top reaches the viewport top
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
        {tocTitle}
      </h3>
      <ul className="flex flex-col gap-1">
        {sections.map((s, idx) => {
          const active = s.id === activeId;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={
                  "flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-foreground")
                }
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent<string>("accordion:open", {
                        detail: s.id,
                      })
                    );
                  }
                }}
              >
                <span className="w-5 text-right tabular-nums opacity-70">
                  {idx + 1}.
                </span>
                <span className="truncate">{s.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
