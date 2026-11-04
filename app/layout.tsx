import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { QueryProvider } from "@/src/providers/query-provider"
import { ToastContainer } from "@/src/components/shared/toast-container"
import { KeepAlive } from "@/src/components/shared/keep-alive"
import { THEME_SCRIPT } from "@/src/hooks/use-theme"
import "./globals.css"

// Inter carries all UI text; JetBrains Mono is for code, tags, dates and meta.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "Osama Nimer | Full-Stack Developer",
    template: "%s | Osama Nimer",
  },
  description:
    "Portfolio of Osama Nimer, a full-stack developer building fast, reliable web products with React, Next.js, Node.js and TypeScript.",
  keywords: ["portfolio", "developer", "full-stack", "web development", "projects", "skills"],
  authors: [{ name: "Osama Nimer" }],
  openGraph: {
    title: "Osama Nimer | Full-Stack Developer",
    description: "Projects, skills and services from full-stack developer Osama Nimer.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#010203" },
    { media: "(prefers-color-scheme: light)", color: "#F5F6F9" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        {/* Picks light or dark before the first paint, so nobody sees a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen font-sans antialiased`}>
        <QueryProvider>
          {children}
          <ToastContainer />
          <KeepAlive />
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
