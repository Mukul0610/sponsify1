import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Sponsify - The Future of Promotion",
  description: "Sponsify is revolutionizing the promotion industry with a platform that effortlessly verifies Instagram pages, checks influencer reels, and provides detailed campaign insights. Join our pre-launch phase and experience seamless and impactful promotional strategies.",
  keywords: ["Sponsify", "promotion", "Instagram verification", "influencer marketing", "campaign insights", "social media marketing", "reel verification", "promotional strategies", "authentic campaigns", "marketing automation"],
  authors: [{ name: "Sponsify Team", url: "https://sponsify1.vercel.app/" }], // Specify the author of the content
  publisher: "Sponsify Inc.",
  openGraph: {
    title: "Sponsify - The Future of Promotion",
    description: "Sponsify is revolutionizing the promotion industry with a platform that effortlessly verifies Instagram pages, checks influencer reels, and provides detailed campaign insights. Join our pre-launch phase and experience seamless and impactful promotional strategies.",
    type: "website",
    url: "https://sponsify1.vercel.app/"},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorWarning: '#1a1a1a' } }}>
      <html lang="en">

        <body className={inter.className}>
          <main className="max-w-10xl mx-auto">

            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}