"use client";

import Image from "next/image";
import Link from "next/link";
import { t, type Locale } from "@/i18n";

interface HeroTrait {
  name: string;
  image: string;
  alias: string;
  newHeroSeason?: boolean;
}

interface Character {
  name: string;
  heroTrait: HeroTrait[];
}

interface CharacterGridProps {
  characters: Character[];
  locale: Locale;
}

export function CharacterGrid({ characters, locale }: CharacterGridProps) {
  return (
    <div className="space-y-12">
      {characters.map((character) => (
        <div key={character.name} className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            {character.name}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {character.heroTrait.map((trait) => (
              <Link
                key={trait.name}
                href={`/${locale}/build-guides/${character.name.toLowerCase()}/${trait.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group transition-transform hover:scale-105"
              >
                <div
                  className="relative aspect-square w-full bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden"
                  style={{ width: "70%", margin: "0 auto" }}
                >
                  <Image
                    src={trait.image}
                    alt={`${character.name} - ${trait.name}`}
                    fill
                    className="object-cover transition-opacity group-hover:opacity-80"
                    sizes="(max-width: 640px) 35vw, (max-width: 768px) 23vw, (max-width: 1024px) 17.5vw, 14vw"
                  />
                  {trait.newHeroSeason && (
                    <span className="absolute z-10 top-2 left-2 rounded-full bg-red-600 text-white text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wide shadow">
                      {t("badges.new", locale)}
                    </span>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-sm font-bold text-white text-center leading-tight line-clamp-2">
                      {trait.name}
                    </p>
                    <p className="text-xs font-semibold text-gray-300 text-center">
                      {trait.alias}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
