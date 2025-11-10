import type { Metadata } from "next";
import { t, type Locale } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: t("damageCalc.title", lang),
    description: "TorchLight Infinite - Damage Calculation",
  };
}

export default async function DamageCalculationPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return (
    <section className="py-6">
      <h1 className="text-2xl font-semibold mb-8">
        {t("damageCalc.title", lang)}
      </h1>
      {/* Content will be added here */}
    </section>
  );
}

