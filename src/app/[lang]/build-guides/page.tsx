import type { Metadata } from "next";
import { t, type Locale } from "@/i18n";
import charactersData from "@/data/characters.json";
import { CharacterGrid } from "./components/CharacterGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: t("buildGuides.title", lang),
    description: "TorchLight Infinite - Build Guides",
  };
}

export default async function BuildGuidesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return (
    <section className="py-6">
      <h1 className="text-2xl font-semibold mb-8">
        {t("buildGuides.title", lang)}
      </h1>
      <CharacterGrid characters={charactersData} locale={lang} />
    </section>
  );
}
