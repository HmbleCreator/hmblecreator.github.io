import { Github, Linkedin, Mail } from 'lucide-react'
import Link from "next/link"
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Spaceship } from "@/components/Spaceship"

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { ssr: false })

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 right-0 z-50 p-8">
        <ul className="flex space-x-8 font-mono text-lg">
          <li><Link href="/" className="text-white hover:text-mint-green transition-colors">Home</Link></li>
          <li><Link href="/skills" className="text-white hover:text-mint-green transition-colors">Skills</Link></li>
          <li><Link href="/projects" className="text-white hover:text-mint-green transition-colors">Projects</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 min-h-screen flex flex-col justify-center relative z-10 pt-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Spaceship Animation */}
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-48">
            <Spaceship />
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <h2 className="text-2xl text-white font-mono">
              Hi, I'm <span className="text-mint-green">Amit</span>
            </h2>
            
            <h1 className="text-6xl md:text-7xl font-mono font-bold tracking-tight">
              <span className="text-white">Exploring the</span>
              <br />
              <span className="text-mint-green">Universe</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
              Through Physics, Mathematics & Programming
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 pt-8">
            <Button variant="outline" size="icon" className="border-mint-green/20 bg-black/50 hover:bg-black/80 hover:border-mint-green/40" asChild>
              <Link href="https://github.com/HmbleCreator">
                <Github className="h-5 w-5 text-white" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" className="border-mint-green/20 bg-black/50 hover:bg-black/80 hover:border-mint-green/40" asChild>
              <Link href="https://linkedin.com/in/amit-kumar-0b9a5325a">
                <Linkedin className="h-5 w-5 text-white" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" className="border-mint-green/20 bg-black/50 hover:bg-black/80 hover:border-mint-green/40" asChild>
              <Link href="mailto:amikumar91101@gmail.com">
                <Mail className="h-5 w-5 text-white" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

