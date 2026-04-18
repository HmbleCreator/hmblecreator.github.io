import { Github, Linkedin, Mail, ArrowUpRight, Terminal } from 'lucide-react'
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden p-6 md:p-12 selection:bg-accent selection:text-black">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-12 mix-blend-difference">
        <div className="text-3xl font-display tracking-tighter">AMIT</div>
        <ul className="flex space-x-6 font-mono text-[9px] uppercase font-black">
          <li><Link href="/" className="bg-white text-black px-2 hover:bg-accent transition-colors">01.RESEARCH</Link></li>
          <li><Link href="/skills" className="border border-white px-2 hover:bg-white hover:text-black transition-all">02.DOMAINS</Link></li>
          <li><Link href="/projects" className="border border-white px-2 hover:bg-white hover:text-black transition-all">03.WORK</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="h-full flex flex-col justify-center max-w-7xl mx-auto pt-12">
        <section className="relative space-y-12">
          <div className="raw-label inline-block">System Status: Active</div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Title and Intro */}
            <div className="lg:col-span-7 space-y-8">
              <h1 className="text-[9vw] md:text-[6.5vw] leading-[0.8] font-display">
                <span className="neon-text">Exploring</span><br />
                <span>The Universe</span>
              </h1>
              <p className="text-xl md:text-3xl font-sans font-black tracking-tight leading-tight max-w-xl">
                BUILDING <span className="text-accent italic">SPiking</span> MANIFOLDS & 
                <span className="text-secondary italic">TOPOLOGICAL</span> INTERFACES.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <BrutalLink href="https://github.com/HmbleCreator" label="GITHUB" />
                <BrutalLink href="https://linkedin.com/in/amit-kumar-0b9a5325a" label="LINKEDIN" />
                <BrutalLink href="mailto:amikumar91101@gmail.com" label="CONTACT" />
              </div>
            </div>
            
            {/* Right Side: Mission Card and Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="brutal-card p-8 space-y-6 bg-accent/10">
                <div className="flex items-center space-x-3 border-b border-white pb-4">
                  <Terminal className="w-5 h-5 text-accent" />
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em]">CURRENT_MISSION</span>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-display italic leading-none">DDIN: PHONOSEMANTIC RESERVOIR</h2>
                  <p className="font-mono text-xs leading-relaxed text-white/70">
                    Solving the vector grounding problem by mapping Sanskrit articulatory physics to AdEx spiking neurons.
                  </p>
                </div>
                <Link href="/projects" className="block w-full text-center py-4 bg-white text-black font-mono font-black text-[10px] hover:bg-accent transition-colors">
                  EXECUTE_VIEW_PROJECT()
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-0 border-[2px] border-white divide-y-[2px] divide-white bg-black/50">
                <BrutalInfo num="01" title="PHYSICS" desc="Dynamics & Wavefunctions." />
                <BrutalInfo num="02" title="MATH" desc="Topology & Info Theory." />
                <BrutalInfo num="03" title="CODE" desc="Neuromorphic SNNs." />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex justify-between items-center mix-blend-difference">
        <div className="font-display text-2xl italic">AMIT&copy;2026</div>
        <div className="font-mono text-[8px] text-white/40 uppercase tracking-widest">
          High-Dimensional Explorer
        </div>
      </footer>
    </div>
  )
}

function BrutalLink({ href, label }: { href: string, label: string }) {
  return (
    <Link href={href} target="_blank" className="font-mono text-[10px] font-black px-6 py-3 border-[2px] border-white hover:bg-accent hover:text-black transition-all shadow-[4px_4px_0px_0px_white] hover:shadow-[6px_6px_0px_0px_#000]">
      {label}
    </Link>
  )
}

function BrutalInfo({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-white hover:text-black transition-colors group">
      <div className="flex items-center space-x-4">
        <span className="font-mono text-[10px] font-black opacity-40">{num}</span>
        <h3 className="text-xl font-display">{title}</h3>
      </div>
      <p className="font-mono text-[10px] opacity-60 text-right">{desc}</p>
    </div>
  )
}

