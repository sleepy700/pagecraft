const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

export const SITE_URL = configured
  ? configured.replace(/\/$/, "")
  : vercelHost
    ? `https://${vercelHost}`
    : "https://pagecraft.vercel.app";
