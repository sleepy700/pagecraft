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
