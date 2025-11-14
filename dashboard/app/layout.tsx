// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css"; // Global styles for Tailwind

// Metadata for SEO (Server-side)
export const metadata: Metadata = {
  title: "StoryBit Streaming Dashboard",
  description: "A simplified streaming service clone built with Next.js 14.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Tailwind class 'bg-gray-900' sets a dark background. 
        'text-white' sets the default text color, fitting a streaming service theme. 
      */}
      <body className="bg-gray-900 text-white min-h-screen">
        {/* The 'children' prop will render the content of app/page.tsx or other pages */}
        {children}
      </body>
    </html>
  );
}