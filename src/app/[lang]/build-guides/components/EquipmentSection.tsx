"use client";

import { useState, type ReactNode } from "react";
import type { Locale } from "@/i18n";
import LevelSlider from "./LevelSlider";
import EquipmentGrid from "./EquipmentGrid";

interface EquipmentSectionProps {
  lang: Locale;
}

/**
 * Client component wrapper for Equipment section
 * Manages character level state and passes it to child components
 */
export default function EquipmentSection({
  lang,
}: EquipmentSectionProps): ReactNode {
  const [characterLevel, setCharacterLevel] = useState(1);

  return (
    <div className="space-y-8">
      {/* Level Slider */}
      <LevelSlider
        level={characterLevel}
        onLevelChange={setCharacterLevel}
        minLevel={1}
        maxLevel={100}
      />

      {/* Equipment Grid */}
      <EquipmentGrid lang={lang} />
    </div>
  );
}

