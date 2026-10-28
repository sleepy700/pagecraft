# PageCraft — Independent Bookstore

Multi-genre book storefront (kids' books, AI guides, psychology, wellness, fiction, biography).
All purchases complete safely on Amazon via smart country-aware links (`/go`).

Built with Next.js 16 + Tailwind CSS. **No database or environment variables needed.**

---

## ✅ DEPLOY CHECKLIST (important!)

When uploading to GitHub, the repository **top level must look exactly like this**:

```
package.json      ← must be here, NOT inside another folder
next.config.ts
tsconfig.json
src/
  app/
public/
  images/
```

❌ Wrong: `pagecraft/package.json` (extra folder)
✅ Right: `package.json` directly visible

### Deploy on Vercel
1. vercel.com → Continue with GitHub
2. Import this repo
3. Do not change any settings → press **Deploy**

Done. Your site goes live worldwide at `your-repo.vercel.app`.

## Local development and checks

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev -- --hostname 0.0.0.0
npm run lint
npm run typecheck
npm run build
npm start -- --hostname 0.0.0.0
```

Application routes live in `src/app`, shared components in `src/components`,
and the static book catalog in `src/lib/catalog.ts`. Images are served from
`public/images`. Fonts are bundled via Fontsource, so builds do not require
access to Google Fonts. `/api/health` provides a JSON health check.

The optional PostgreSQL helpers in `src/db` are not used by the storefront.
`DATABASE_URL` is required only when using those database helpers. The optional
Drizzle development tooling currently has four moderate npm audit findings in
its legacy esbuild dependency chain; the production dependency audit is clean.
