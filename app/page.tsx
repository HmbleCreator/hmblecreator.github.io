import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import ParticleBackground from '@/components/ParticleBackground'

const rhythms = [
  'ask',
  'build',
  'break',
  'measure',
  'rewrite',
  'repeat',
]

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-accent selection:text-black">
      <ParticleBackground />

      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-5 py-5 md:px-10 md:py-8">
        <Link href="/" className="font-display text-2xl leading-none text-white md:text-3xl">
          AMIT
        </Link>
        <ul className="flex items-center gap-2 font-mono text-[10px] font-black uppercase md:gap-5">
          <li>
            <Link href="/" className="nav-chip bg-white text-black">
              Research
            </Link>
          </li>
          <li>
            <Link href="/skills" className="nav-chip">
              Skills
            </Link>
          </li>
          <li>
            <Link href="/projects" className="nav-chip">
              Work
            </Link>
          </li>
        </ul>
      </nav>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-28 pt-28 md:px-10 md:pb-24 md:pt-32">
        <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-5xl">
            <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase text-white/55">
              <span className="h-px w-12 bg-white/40" />
              Live notebook, imperfect systems
            </div>
            <h1 className="font-display text-6xl leading-[0.88] text-white md:text-8xl lg:text-9xl">
              Research is
              <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.88)]">
                iteration.
              </span>
            </h1>
          </div>

          <div className="max-w-xl justify-self-start lg:justify-self-end">
            <p className="text-xl font-black leading-tight text-white md:text-3xl">
              I make tools, models, simulations, and strange little experiments. Some fail fast.
              The useful ones get rebuilt until they explain something better.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <OutboundLink href="https://github.com/HmbleCreator" label="GitHub" icon="github" />
              <OutboundLink href="https://linkedin.com/in/amit-kumar-0b9a5325a" label="LinkedIn" icon="linkedin" />
              <OutboundLink href="mailto:amikumar91101@gmail.com" label="Contact" icon="mail" />
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 border-y border-white/20 py-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <p className="font-mono text-[11px] uppercase leading-relaxed text-white/52">
            Current bias: local-first AI, scientific computing, visual systems, retrieval, data
            tools, simulation, and interfaces that make uncertainty visible.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end">
            {rhythms.map((item, index) => (
              <span
                key={item}
                className="font-display text-2xl uppercase text-white/85 md:text-4xl"
                style={{ opacity: 0.95 - index * 0.08 }}
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="pointer-events-none fixed bottom-0 left-0 z-20 flex w-full items-end justify-between px-5 py-5 text-white/45 md:px-10 md:py-8">
        <div className="font-display text-xl italic md:text-2xl">AMIT 2026</div>
        <div className="hidden font-mono text-[9px] uppercase md:block">
          cursor distorts the fabric
        </div>
      </footer>
    </div>
  )
}

function OutboundLink({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: 'github' | 'linkedin' | 'mail'
}) {
  const Icon = icon === 'github' ? Github : icon === 'linkedin' ? Linkedin : Mail
  const isMail = href.startsWith('mailto:')

  return (
    <Link
      href={href}
      target={isMail ? undefined : '_blank'}
      className="group inline-flex items-center gap-2 border border-white/35 bg-black/20 px-4 py-3 font-mono text-[10px] font-black uppercase text-white backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-black"
    >
      <Icon className="h-4 w-4" />
      {label}
      {!isMail && <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </Link>
  )
}
