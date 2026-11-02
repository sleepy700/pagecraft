"use client";

import { usePathname, useRouter } from "next/navigation";
import { languages, locales, isLocale } from "@/lib/languages";

export function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const segment = pathname.split("/")[1];
  const selected = isLocale(segment) ? segment : "en";
  return (
    <div className="border-b border-ink/10 bg-paper-deep px-5 py-2">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-3 text-xs">
        <label htmlFor="site-language" className="font-semibold">Language / भाषा</label>
        <select
          id="site-language"
          value={selected}
          onChange={(event) => router.push(`/${event.target.value}`)}
          className="min-h-10 rounded-lg border border-ink/20 bg-paper px-3 text-ink"
        >
          {locales.map((code) => <option key={code} value={code} lang={code}>{languages[code].name}</option>)}
        </select>
      </div>
    </div>
  );
}
