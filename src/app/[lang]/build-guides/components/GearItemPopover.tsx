"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { t, type Locale } from "@/i18n";

export type GearItem = {
  season: string;
  name: string;
  requireLevel: number;
  implicit?: string;
  mods?: string[];
  label?: string;
};

export default function GearItemPopover({
  lang,
  imageSrc,
  alt,
  item,
}: {
  lang: Locale;
  imageSrc: string;
  alt: string;
  item: GearItem;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [side, setSide] = useState<"left" | "right">("right");
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        (ref.current && ref.current.contains(target)) ||
        (panelRef.current && panelRef.current.contains(target))
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const recomputePosition = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const viewportW = window.innerWidth || document.documentElement.clientWidth;
    const spaceRight = viewportW - rect.right;
    const spaceLeft = rect.left;
    const estimatedWidth = 280; // ~min-w-64
    const nextSide =
      spaceRight >= estimatedWidth || spaceRight >= spaceLeft
        ? "right"
        : "left";
    setSide(nextSide);
    const gap = 12;
    const left = nextSide === "right" ? rect.right + gap : rect.left - gap;
    const top = rect.top; // align with top of slot
    setCoords({ top, left });
  };

  const handleToggle = () => {
    if (!ref.current) {
      setOpen((v) => !v);
      return;
    }
    recomputePosition();
    setOpen((v) => !v);
  };

  // Recompute on resize/scroll while open
  useEffect(() => {
    if (!open) return;
    const onResize = () => recomputePosition();
    const onScroll = () => recomputePosition();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative inline-block w-16 sm:w-20 shrink-0"
      onClick={handleToggle}
    >
      {/* Visual slot container with gradient and border-bottom accent */}
      <div
        className="size-16 sm:size-20 rounded-md flex items-center justify-center overflow-hidden cursor-pointer"
        style={{
          background:
            "linear-gradient(rgb(48, 48, 48) 0%, rgb(221, 110, 37) 100%)",
          padding: 4,
          borderBottom: "3px solid #f5be75",
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        role="button"
        tabIndex={0}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={80}
          height={80}
          className="h-full w-full object-contain"
          priority
        />
      </div>

      {/* Popover panel in a portal to avoid layout clipping */}
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={panelRef}
            role="dialog"
            aria-label={item.name}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform: side === "left" ? "translateX(-100%)" : "none",
              zIndex: 9999,
            }}
            className="min-w-64 rounded-md border border-muted/30 bg-background text-foreground shadow-lg p-2 text-center relative"
          >
            <span className="absolute right-2 top-2 text-[10px] rounded-full bg-muted/30 px-2 py-0.5 uppercase tracking-wide">
              {item.season}
            </span>

            <div className="flex flex-col items-center gap-1">
              <h4 className="font-semibold">{item.name}</h4>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">
                  {t("gear.popover.reqLv", lang)}:
                </span>{" "}
                {item.requireLevel}
              </div>
              {item.implicit && <div className="mt-1">{item.implicit}</div>}
              {item.mods && item.mods.length > 0 && (
                <div className="mt-2 text-left">
                  <ul className="mt-1 list-disc pl-4 space-y-1">
                    {item.mods.map((m, idx) => (
                      <li key={`mod-${idx}`}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.label && <div className="mt-2 italic">{item.label}</div>}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
