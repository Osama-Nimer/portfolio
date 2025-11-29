import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { QueryProvider } from "@/src/providers/query-provider"
import { ToastContainer } from "@/src/components/shared/toast-container"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Portfolio | Professional Developer",
  description:
    "Professional portfolio showcasing projects, skills, and services. Building digital experiences with passion and precision.",
  keywords: ["portfolio", "developer", "web development", "projects", "skills"],
  authors: [{ name: "Portfolio Owner" }],
  openGraph: {
    title: "Portfolio | Professional Developer",
    description: "Professional portfolio showcasing projects, skills, and services.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <QueryProvider>
          {children}
          <ToastContainer />
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
