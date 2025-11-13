"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n";

export type EquipmentSlot = {
  src?: string; // optional image source
  alt?: string; // optional alt text (for accessibility)
};

function Slot({ src, alt }: EquipmentSlot): ReactNode {
  const hasImage = Boolean(src);
  return (
    <div
      className={
        hasImage
          ? "size-16 sm:size-20 rounded-md flex items-center justify-center overflow-hidden cursor-pointer"
          : "size-16 sm:size-20 rounded-md border border-muted/30 bg-muted/10 flex items-center justify-center overflow-hidden cursor-pointer"
      }
      style={
        hasImage
          ? {
              background:
                "linear-gradient(rgb(48, 48, 48) 0%, rgb(221, 110, 37) 100%)",
              padding: 4,
              borderBottom: "3px solid #f5be75",
            }
          : undefined
      }
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          width={80}
          height={80}
          className="h-full w-full object-contain"
        />
      ) : (
        <div
          className="h-7 w-7 sm:h-8 sm:w-8 rounded bg-muted/40"
          aria-hidden
        />
      )}
    </div>
  );
}

import GearItemPopover from "@/app/[lang]/build-guides/components/GearItemPopover";
import type { GearItem } from "@/app/[lang]/build-guides/components/GearItemPopover";
import chestData from "@/data/gear/legendary/chest-armor/dex/dexChestArmor.json";

export default function EquipmentGrid({ lang }: { lang: Locale }): ReactNode {
  // Left column: Helmet, Necklace, Belt, Ring, Main-Weapon
  const left: EquipmentSlot[] = [
    {}, // Helmet
    {}, // Necklace
    {}, // Belt
    {}, // Ring
    {}, // Main-Weapon
  ];

  // Right column nodes
  const chestItems = chestData as GearItem[];
  const chestItem = chestItems[0] as GearItem;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-start gap-4">
          {left.map((s, i) => (
            <Slot key={`left-${i}`} {...s} />
          ))}
        </div>
        <div className="flex flex-col items-start gap-4">
          {/* Chest Armor with popover */}
          <GearItemPopover
            lang={lang}
            imageSrc="/images/gear/legendary/chest-armor/dex/phantasm.webp"
            alt="Chest Armor"
            item={chestItem}
          />
          {/* Remaining right-side slots */}
          <Slot />
          <Slot />
          <Slot />
          <Slot />
        </div>
      </div>
    </div>
  );
}
