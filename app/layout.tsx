import "@/styles/globals.css"
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { cn } from "@/lib/utils"

const mono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
})

const sans = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-sans'
})

const display = Archivo_Black({
  subsets: ["latin"],
  variable: '--font-display',
  weight: ['400']
})

export const metadata = {
  title: "Amit | Cosmic Brutalism",
  description: "Exploring the Universe Through Physics, Mathematics & Programming",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(
        sans.variable,
        mono.variable,
        display.variable,
        "min-h-screen bg-[#0a0a0a] text-[#ffffff] antialiased overflow-x-hidden font-sans"
      )}>
        {children}
      </body>
    </html>
  )
}