import { redirect } from "next/navigation";
import type { Locale } from "@/i18n";

export default async function CharacterRedirectPage({
  params,
}: {
  params: Promise<{ lang: Locale; character: string }>;
}) {
  const { lang } = await params;
  redirect(`/${lang}/build-guides`);
}
