"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
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
import { chestArmor, boots } from "@/data/gear";

export default function EquipmentGrid({ lang }: { lang: Locale }): ReactNode {
  // Left column: Helmet, Necklace, Belt, Ring, Main-Weapon
  const left: EquipmentSlot[] = [
    {}, // Helmet
    {}, // Necklace
    {}, // Belt
    {}, // Ring
    {}, // Main-Weapon
  ];

  // Chest armor data - combining dex and special categories, sorted alphabetically
  const chestItems = [...chestArmor.dex, ...chestArmor.special].sort((a, b) =>
    a.name.localeCompare(b.name)
  ) as GearItem[];

  // State to track selected chest armor
  const [selectedChestIndex, setSelectedChestIndex] = useState(0);
  const chestItem = chestItems[selectedChestIndex] as GearItem;

  // Boots data - combining int and other categories, sorted alphabetically
  const bootsItems = [...boots.int].sort((a, b) =>
    a.name.localeCompare(b.name)
  ) as GearItem[];

  // State to track selected boots
  const [selectedBootsIndex, setSelectedBootsIndex] = useState(0);
  const bootsItem = bootsItems[selectedBootsIndex] as GearItem;

  // Right column: Chest Armor, Gloves, Boots, Ring, Shield/One-Hand-Weapon
  // Build the right column with special handling for items with data
  const right = [
    {
      type: "gear-item",
      component: (
        <GearItemPopover
          key="chest-armor"
          lang={lang}
          imageSrc={
            chestItem.image?.replace("public/", "/") ||
            "/images/gear/legendary/chest-armor/dex/phantasm.webp"
          }
          alt="Chest Armor"
          item={chestItem}
        />
      ),
      options: (
        <ul className="list-none pl-0 space-y-2">
          {chestItems.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm">
              {item.image && (
                <Image
                  src={item.image.replace("public/", "/")}
                  alt={item.name}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              )}
              <span
                className="font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => setSelectedChestIndex(idx)}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      type: "slot",
      component: <Slot key="gloves" />,
      options: null, // Placeholder for future gloves options
    },
    {
      type: "gear-item",
      component: (
        <GearItemPopover
          key="boots"
          lang={lang}
          imageSrc={
            bootsItem.image?.replace("public/", "/") ||
            "/images/gear/legendary/boots/int/grace.webp"
          }
          alt="Boots"
          item={bootsItem}
        />
      ),
      options: (
        <ul className="list-none pl-0 space-y-2">
          {bootsItems.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm">
              {item.image && (
                <Image
                  src={item.image.replace("public/", "/")}
                  alt={item.name}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              )}
              <span
                className="font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => setSelectedBootsIndex(idx)}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      type: "slot",
      component: <Slot key="ring" />,
      options: null, // Placeholder for future ring options
    },
    {
      type: "slot",
      component: <Slot key="shield-or-weapon" />,
      options: null, // Placeholder for future shield/weapon options
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center justify-center gap-8">
        {/* Left column: equipment slots with options on the left */}
        <div className="flex items-start gap-4">
          {/* Left options placeholder - will be added later */}
          <div className="w-48" />

          {/* Left equipment slots */}
          <div className="flex flex-col items-start gap-4">
            {left.map((s, i) => (
              <Slot key={`left-${i}`} {...s} />
            ))}
          </div>
        </div>

        {/* Right column: Chest Armor, Gloves, Boots, Ring, Shield/One-Hand-Weapon with options on the right */}
        <div className="flex items-start gap-4">
          {/* Right equipment slots */}
          <div className="flex flex-col items-start gap-4">
            {right.map((item) => item.component)}
          </div>

          {/* Right options for right column */}
          <div className="flex flex-col gap-4 w-48">
            {right.map((item, i) => (
              <div key={i} className="h-16 sm:h-20 flex items-center">
                {item.options}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
