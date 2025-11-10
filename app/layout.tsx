import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { AuthProvider } from "@/utils/context/AuthContext";

import { ThemeProvider } from "@/utils/context/ThemaContext"

import Pathname from "@/hooks/Pathname"

import { LoadingProvider } from "@/utils/context/LoadingContext"

import LoadingOverlayWrapper from "@/hooks/LoadingOverlayWrapper"

import { metadata, viewport } from "@/hooks/Metadata";

export { metadata, viewport };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <LoadingProvider>
              <LoadingOverlayWrapper />
              <Pathname>{children}</Pathname>
            </LoadingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
