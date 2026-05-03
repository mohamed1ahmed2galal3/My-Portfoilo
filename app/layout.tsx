import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed Ahmed Galal — Frontend Developer",
  description: "Frontend Developer specializing in React and Next.js, experienced in building scalable web applications.",
  openGraph: {
    title: "Mohamed Ahmed Galal — Frontend Developer",
    description: "Frontend Developer specializing in React and Next.js",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
