import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LST Staking | @samdevrel",
  description: "Liquid staking tokens with real-time APR, DeFi integration, and portfolio tracking.",
  keywords: ["lst", "liquid-staking", "reth", "steth", "wsteth", "defi", "yield"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
