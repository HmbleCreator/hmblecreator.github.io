import { ArrowUpRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { SiteNav } from '@/components/SiteNav'
import { researchPapers } from '@/lib/research-papers'

export default function PapersPage() {
  return (
    <div className="relative min-h-screen bg-[#070707] px-5 py-6 selection:bg-accent selection:text-black md:px-10 md:py-8">
      <SiteNav active="papers" />

      <main className="mx-auto max-w-7xl pt-32">
        <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase text-white/50">
          <span className="h-px w-12 bg-white/35" />
          Research archive
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-6xl leading-[0.9] text-white md:text-8xl">Papers.</h1>
          <p className="max-w-xl font-mono text-[11px] uppercase leading-relaxed text-white/48">
            Notes, experiments, and formal writeups from the research side of the portfolio.
          </p>
        </div>

        <section className="mt-14">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-accent" />
            <h2 className="font-mono text-xs font-black uppercase text-accent">Research papers</h2>
          </div>
          <div className="mt-8 border-t border-white/20">
            {researchPapers.map((paper) => (
              <article key={paper.title} className="grid gap-5 border-b border-white/20 py-7 md:grid-cols-[0.18fr_1fr_0.22fr] md:items-center">
                <div className="font-mono text-[10px] uppercase text-accent">
                  {paper.category}
                </div>
                <div>
                  <h2 className="text-2xl font-black leading-tight text-white md:text-3xl">
                    {paper.title}
                  </h2>
                  <p className="mt-3 max-w-3xl font-mono text-[11px] leading-relaxed text-white/58">
                    {paper.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 md:justify-end">
                  <span className="font-mono text-[10px] uppercase text-white/38">{paper.metric}</span>
                  <Link href={paper.link} target="_blank" className="icon-link" aria-label={`Open ${paper.title}`}>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-20 max-w-7xl border-t border-white/20 py-10">
        <div className="font-display text-3xl italic text-white">AMIT 2026</div>
      </footer>
    </div>
  )
}
