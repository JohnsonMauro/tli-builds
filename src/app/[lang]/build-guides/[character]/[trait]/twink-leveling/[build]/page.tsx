import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { t } from "@/i18n";
import charactersData from "@/data/characters.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function slugify(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

function formatLastUpdated(input: string, locale: Locale): string {
  const parts = input.split("/");
  if (parts.length !== 3) return input;
  let d = 0, m = 0, y = 0;
  if (locale.startsWith("en" as Locale)) {
    // mm/dd/yyyy
    m = parseInt(parts[0], 10);
    d = parseInt(parts[1], 10);
    y = parseInt(parts[2], 10);
  } else {
    // dd/MM/yyyy
    d = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10);
    y = parseInt(parts[2], 10);
  }
  if (!d || !m || !y) return input;
  const date = new Date(y, m - 1, d);
  if (isNaN(date.getTime())) return input;
  const tag = locale.startsWith("en") ? "en-US" : locale.startsWith("pt") ? "pt-BR" : "ru-RU";
  const opts: Intl.DateTimeFormatOptions = locale.startsWith("en")
    ? { day: "2-digit", month: "short", year: "numeric" }
    : { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Intl.DateTimeFormat(tag, opts).format(date);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; character: string; trait: string; build: string }>;
}): Promise<Metadata> {
  const { character, trait, build } = await params;

  const characterData = charactersData.find(
    (c) => c.name.toLowerCase() === character.toLowerCase()
  );
  const traitData = characterData?.heroTrait.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "-") === trait.toLowerCase()
  );
  const buildItem = traitData?.builds?.twinkLeveling?.find(
    (b) => slugify(b.buildName) === build.toLowerCase()
  );

  if (!characterData || !traitData || !buildItem) {
    return { title: "Not Found" };
  }

  return {
    title: `${characterData.name} - ${traitData.name}: ${buildItem.buildName}`,
    description: `Build guide for ${characterData.name} - ${traitData.name} (${buildItem.buildName})`,
  };
}

export default async function TwinkLevelingBuildPage({
  params,
}: {
  params: Promise<{ lang: Locale; character: string; trait: string; build: string }>;
}) {
  const { lang, character, trait, build } = await params;

  const characterData = charactersData.find(
    (c) => c.name.toLowerCase() === character.toLowerCase()
  );
  if (!characterData) notFound();

  const traitData = characterData.heroTrait.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "-") === trait.toLowerCase()
  );
  if (!traitData) notFound();

  const buildItem = traitData.builds?.twinkLeveling?.find(
    (b) => slugify(b.buildName) === build.toLowerCase()
  );
  if (!buildItem) notFound();

  return (
    <section className="py-6">
      <div className="mb-6">
        <Link href={`/${lang}/build-guides/${character}/${trait}`} className="text-sm text-primary hover:underline">
          ← {traitData.name}
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Image
            src={traitData.image}
            alt={`${characterData.name} - ${traitData.name}`}
            width={56}
            height={56}
            className="rounded-md object-cover"
            priority
          />
          <h1 className="text-3xl font-bold">
            {traitData.name}
            <span className="ml-3 text-2xl font-semibold text-muted-foreground">({traitData.alias})</span>
          </h1>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">{buildItem.buildName}</div>
          <div className="text-sm text-muted-foreground">
            {t("builds.lastUpdated", lang)} {formatLastUpdated(buildItem.lastUpdated, lang)}
          </div>
        </div>
        <div className="text-sm text-muted-foreground italic">
          {t("builds.by", lang)} {buildItem.author}
        </div>

        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg mt-4">
          <h2 className="text-lg font-semibold mb-2">Twink Leveling</h2>
          <p className="text-muted-foreground">
            Content for this Twink Leveling build will be added here.
          </p>
        </div>
      </div>
    </section>
  );
}

