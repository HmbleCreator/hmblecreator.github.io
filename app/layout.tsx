import "@/styles/globals.css"
import { Space_Mono, Inter } from 'next/font/google'
import { cn } from "@/lib/utils"

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono'
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

export const metadata = {
  title: "Amit's Portfolio",
  description: "Exploring the Universe Through Physics, Mathematics & Programming",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        inter.variable,
        spaceMono.variable,
        "min-h-screen bg-black antialiased overflow-x-hidden font-sans"
      )}>
        {children}
      </body>
    </html>
  )
}



import './globals.css'