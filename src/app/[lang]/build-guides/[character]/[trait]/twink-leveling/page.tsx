import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { t } from "@/i18n";
import charactersData from "@/data/characters.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import SectionToc from "@/app/[lang]/build-guides/components/SectionToc";
import AccordionSection from "@/app/[lang]/build-guides/components/AccordionSection";
import KeywordText from "@/app/[lang]/build-guides/components/KeywordText";
import EquipmentGrid from "@/app/[lang]/build-guides/components/EquipmentGrid";
import type { ReactNode } from "react";

function parseDateByLocale(input: string, loc: string): Date | null {
  const parts = input.split("/");
  if (parts.length !== 3) return null;
  let d = 0,
    m = 0,
    y = 0;
  if (loc.startsWith("en")) {
    m = parseInt(parts[0], 10);
    d = parseInt(parts[1], 10);
    y = parseInt(parts[2], 10);
  } else {
    d = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10);
    y = parseInt(parts[2], 10);
  }
  const date = new Date(y, m - 1, d);
  return isNaN(date.getTime()) ? null : date;
}
function formatLastUpdated(input: string, loc: string): string {
  const date = parseDateByLocale(input, loc);
  if (!date) return input;
  const tag = loc.startsWith("en")
    ? "en-US"
    : loc.startsWith("pt")
    ? "pt-BR"
    : "ru-RU";
  const opts: Intl.DateTimeFormatOptions = loc.startsWith("en")
    ? { day: "2-digit", month: "short", year: "numeric" }
    : { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Intl.DateTimeFormat(tag, opts).format(date);
}

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
  const buildItem = traitData?.builds?.twinkLeveling?.[0];
  if (!characterData || !traitData || !buildItem) {
    return { title: "Not Found" };
  }
  return {
    title: `${characterData.name} - ${traitData.name}: ${buildItem.buildName}`,
    description: `Build guide for ${characterData.name} - ${traitData.name} (${buildItem.buildName})`,
  };
}

export default async function TwinkLevelingPage({
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
  const buildItem = traitData.builds?.twinkLeveling?.[0];
  if (!buildItem) notFound();

  return (
    <section className="py-6">
      <div className="mb-6">
        <Link
          href={`/${lang}/build-guides/${character}/${trait}`}
          className="text-sm text-primary hover:underline"
        >
          ← {traitData.name}
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-start gap-3">
          <Image
            src={traitData.image}
            alt={`${characterData.name} - ${traitData.name}`}
            width={56}
            height={56}
            className="rounded-md object-cover"
            priority
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold">
              {traitData.name}
              <span className="ml-3 text-2xl font-semibold text-muted-foreground">
                ({traitData.alias})
              </span>
            </h1>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
              <span className="text-xl font-bold truncate">
                {buildItem.buildName}
              </span>
              <span className="text-sm text-muted-foreground italic whitespace-nowrap">
                {t("builds.by", lang)} {buildItem.author}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                {t("builds.lastUpdated", lang)}{" "}
                {formatLastUpdated(buildItem.lastUpdated, lang)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <aside className="md:sticky md:top-4 h-fit">
          <SectionToc
            tocTitle={t("builds.toc.title", lang)}
            sections={[
              {
                id: "introduction",
                title: t("builds.sections.introduction", lang),
              },
              { id: "mule", title: t("builds.sections.mule", lang) },

              { id: "equipment", title: t("builds.sections.equipment", lang) },
              { id: "skill-tree", title: t("builds.sections.skillTree", lang) },
            ]}
          />
        </aside>

        <div className="space-y-4">
          <AccordionSection
            id="introduction"
            title={t("builds.sections.introduction", lang)}
            index={1}
            defaultOpen
          >
            {t("builds.loremLong", lang)
              .split("\n\n")
              .map((p, i) => (
                <p key={`intro-${i}`} className="text-muted-foreground mb-2">
                  {p}
                </p>
              ))}
          </AccordionSection>
          <AccordionSection
            id="mule"
            title={t("builds.sections.mule", lang)}
            index={2}
          >
            {(() => {
              const paragraphs = t("builds.mule.content", lang).split("\n\n");
              const nodes: ReactNode[] = [];
              let listItems: ReactNode[] | null = null;
              let currentSection: number | null = null;

              for (let i = 0; i < paragraphs.length; i++) {
                const p = paragraphs[i];
                const stepMatch = /^\s*(\d+)\.\s/.exec(p);
                const stepTitle = !!stepMatch;

                if (
                  (currentSection === 2 || currentSection === 3) &&
                  /:\s*$/.test(p.trim())
                ) {
                  if (listItems && listItems.length) {
                    nodes.push(
                      <ul
                        key={`list-${i}`}
                        className="list-disc pl-5 my-3 space-y-2"
                      >
                        {listItems}
                      </ul>
                    );
                  }
                  listItems = [];
                  nodes.push(
                    <p key={`mule-${i}`} className="text-muted-foreground mb-2">
                      <KeywordText text={p} lang={lang} />
                    </p>
                  );
                  continue;
                }

                if (stepTitle) {
                  if (listItems && listItems.length) {
                    nodes.push(
                      <ul
                        key={`list-${i}`}
                        className="list-disc pl-5 my-3 space-y-2"
                      >
                        {listItems}
                      </ul>
                    );
                  }
                  listItems = null;
                  nodes.push(
                    <p
                      key={`mule-${i}`}
                      className="text-foreground font-semibold mt-6 mb-2 text-[1.35rem]"
                    >
                      <KeywordText text={p} lang={lang} />
                    </p>
                  );
                  if (stepMatch) currentSection = Number(stepMatch[1]);
                  continue;
                }

                if (listItems) {
                  // If we're in section 3 and this is the final paragraph,
                  // render it as a normal paragraph (not a bullet conclusion).
                  if (currentSection === 3 && i === paragraphs.length - 1) {
                    nodes.push(
                      <ul
                        key={`list-${i}`}
                        className="list-disc pl-5 my-3 space-y-2"
                      >
                        {listItems}
                      </ul>
                    );
                    listItems = null;
                    nodes.push(
                      <p
                        key={`mule-${i}`}
                        className="text-muted-foreground mb-2"
                      >
                        <KeywordText text={p} lang={lang} />
                      </p>
                    );
                    continue;
                  }
                  listItems.push(
                    <li key={`bullet-${i}`} className="text-muted-foreground">
                      <KeywordText text={p} lang={lang} />
                    </li>
                  );
                  continue;
                }

                nodes.push(
                  <p key={`mule-${i}`} className="text-muted-foreground mb-2">
                    <KeywordText text={p} lang={lang} />
                  </p>
                );
              }

              if (listItems && listItems.length) {
                nodes.push(
                  <ul
                    key={`list-end`}
                    className="list-disc pl-5 my-3 space-y-2"
                  >
                    {listItems}
                  </ul>
                );
              }

              return nodes;
            })()}
          </AccordionSection>
          <AccordionSection
            id="equipment"
            title={t("builds.sections.equipment", lang)}
            index={3}
          >
            <EquipmentGrid lang={lang} />
          </AccordionSection>
          <AccordionSection
            id="skill-tree"
            title={t("builds.sections.skillTree", lang)}
            index={4}
          >
            {t("builds.loremLong", lang)
              .split("\n\n")
              .map((p, i) => (
                <p key={`skills-${i}`} className="text-muted-foreground mb-2">
                  {p}
                </p>
              ))}
          </AccordionSection>
        </div>
      </div>
    </section>
  );
}
