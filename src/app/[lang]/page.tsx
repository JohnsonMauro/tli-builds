import type { Metadata } from "next";
import { t, type Locale } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: t("home.welcome", lang),
    description: "TorchLight Infinite - Home",
  };
}

export default async function LangHomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return (
    <section className="py-6">
      <h1 className="text-2xl font-semibold">{t("home.welcome", lang)}</h1>
    </section>
  );
}
