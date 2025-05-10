import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SupabaseAuthProvider } from "@/components/auth/SupabaseAuthProvider"; // Changed import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "n8n AI Workflow Generator", // Updated title
  description: "Generate n8n workflows by describing them in plain text.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>{/* Added suppressHydrationWarning for NextAuth compatibility */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <SupabaseAuthProvider> {/* Wrapped children with SupabaseAuthProvider */}
          {children}
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
