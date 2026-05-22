import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legal Work Platform",
  description: "A single platform to manage every part of your legal work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col overflow-x-hidden" style={{ fontFamily: '"Inter", sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
