import type { Metadata } from "next";
import type { ReactNode } from "react";

// This is a public deployment guide, not an authenticated administration panel.
export const metadata: Metadata = {
  title: "Deployment guide",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
