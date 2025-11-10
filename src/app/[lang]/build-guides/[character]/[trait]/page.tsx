import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import charactersData from "@/data/characters.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BuildGuideFilter } from "../../components/BuildGuideFilter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; character: string; trait: string }>;
}): Promise<Metadata> {
  const { character, trait } = await params;
  const characterData = charactersData.find(
    (c) => c.name.toLowerCase() === character.toLowerCase()
  );

  const traitData = characterData?.heroTrait.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "-") === trait.toLowerCase()
  );

  if (!characterData || !traitData) {
    return { title: "Not Found" };
  }

  return {
    title: `${characterData.name} - ${traitData.name}`,
    description: `Build guide for ${characterData.name} - ${traitData.name}`,
  };
}

export default async function TraitPage({
  params,
}: {
  params: Promise<{ lang: Locale; character: string; trait: string }>;
}) {
  const { lang, character, trait } = await params;

  const characterData = charactersData.find(
    (c) => c.name.toLowerCase() === character.toLowerCase()
  );
  if (!characterData) notFound();

  const traitData = characterData.heroTrait.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "-") === trait.toLowerCase()
  );
  if (!traitData) notFound();

  return (
    <section className="py-6">
      <div className="mb-6">
        <Link
          href={`/${lang}/build-guides/${character}`}
          className="text-sm text-primary hover:underline"
        >
          ← Build Guides
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {traitData.name}
          <span className="ml-3 text-2xl font-semibold text-muted-foreground">
            ({traitData.alias})
          </span>
        </h1>
      </div>

      <div className="mb-8">
        <BuildGuideFilter />
      </div>

      <div className="space-y-6">
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Build Guide Content</h2>
          <p className="text-muted-foreground">
            Content for {characterData.name} - {traitData.name} will be added here.
          </p>
        </div>
      </div>
    </section>
  );
}

