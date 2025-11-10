import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-16 text-center space-y-4">
      <h1 className="text-3xl font-bold">404 — Page not found</h1>
      <p className="text-base text-gray-600 dark:text-gray-300">
        Sorry, this language is not supported yet. We apologize for the inconvenience.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/en" className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black">
          Go to English Home
        </Link>
        <Link href="/" className="px-4 py-2 rounded border border-black/20 dark:border-white/20">
          Back to Root
        </Link>
      </div>
    </section>
  );
}

