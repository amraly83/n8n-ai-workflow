import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Assuming these fonts are still desired
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({ // Assuming these fonts are still desired
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({ // Assuming these fonts are still desired
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "n8n AI Workflow Generator", // Kept original title
  description: "Generate n8n workflows by describing them in plain text.", // Kept original description
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning> {/* Added suppressHydrationWarning from previous state */}
        <body 
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}  // Kept font variables and antialiased
          suppressHydrationWarning={true} /* Added suppressHydrationWarning from previous state */
        >
          {/* Header with auth controls is now handled by StickyHeader component */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
