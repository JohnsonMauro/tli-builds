"use client";

import { useEffect, useState, type ReactNode } from "react";

type AccordionSectionProps = {
  id: string;
  title: string;
  index?: number;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
};

export default function AccordionSection({
  id,
  title,
  index,
  defaultOpen = false,
  className = "",
  children,
}: AccordionSectionProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const panelId = `panel-${id}`;
  const buttonId = `button-${id}`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const openIfHashMatches = () => {
      const current = window.location.hash.replace("#", "");
      if (current === id) setOpen(true);
    };

    const onHashChange = () => openIfHashMatches();
    const onAccordionOpen = (e: Event) => {
      const ce = e as CustomEvent<string>;
      if (ce.detail === id) setOpen(true);
    };

    // Initial check for deep links
    openIfHashMatches();

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("accordion:open", onAccordionOpen as EventListener);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener(
        "accordion:open",
        onAccordionOpen as EventListener
      );
    };
  }, [id]);

  return (
    <section
      id={id}
      className={`border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <div className="flex items-center gap-2">
          {typeof index === "number" ? (
            <span className="w-6 text-right tabular-nums opacity-70">
              {index}.
            </span>
          ) : null}
          <span className="text-lg font-semibold">{title}</span>
        </div>
        <svg
          className={`h-[1.69rem] w-[1.69rem] cursor-pointer transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 011.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`transition-[max-height] duration-300 ease-in-out ${
          open
            ? "overflow-visible [max-height:9999px]"
            : "overflow-hidden max-h-0"
        }`}
      >
        <div className="px-6 pb-6">{children}</div>
      </div>
    </section>
  );
}
