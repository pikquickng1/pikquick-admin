import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PikQuick Admin",
  description: "PikQuick Admin Dashboard",
};

/**
 * Force every route in this admin app to be rendered on demand rather
 * than statically prerendered at build time.
 *
 * Background: Next.js 16.1.6 (this project's pinned version) has a
 * known prerender bug — `Error [InvariantError]: Expected
 * workUnitAsyncStorage to have a store` — that intermittently fails
 * the static-generation step in `next build`. The error exists on
 * origin/main (commit 97171aa) before any phase-2 changes; it is
 * independent of any specific page.
 *
 * Since this is an authenticated admin app, every page reads cookies/
 * tokens and is per-user; there is no SEO or static-CDN benefit to
 * prerendering. Setting `dynamic = "force-dynamic"` at the root
 * segment opts all child routes out of prerender uniformly and
 * eliminates the racy workUnitAsyncStorage error.
 *
 * Remove this once Next.js ships a fix or the project upgrades past
 * 16.1.6.
 */
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${outfit.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
