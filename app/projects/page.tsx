'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, BookOpen, FolderGit2, Github } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Repo {
  id: string
  name: string
  description: string | null
  url: string
  homepageUrl?: string | null
  languages: string[]
}

interface GitHubData {
  pinnedRepos: Repo[]
  otherRepos: Repo[]
}

const researchPapers = [
  {
    title: 'Semantic Pressure and Zero-Shot Generalization: Scaling the DDIN Receiver Model to a 2000-Root Linguistic Manifold',
    category: 'Paper 04',
    desc: 'A reservoir-scale experiment measuring how phonosemantic signal behaves under larger root sets and stronger semantic pressure.',
    metric: 'large-scale clustering',
    link: 'https://doi.org/10.5281/zenodo.SINGULARITY',
  },
  {
    title: 'Phonosemantic Grounding: Sanskrit as a Formalized Case of Motivated Sign Structure for Interpretable AI',
    category: 'Paper 01',
    desc: 'A formal grounding experiment connecting articulatory structure, linguistic roots, and interpretable representational spaces.',
    metric: 'grounding study',
    link: 'https://doi.org/10.5281/zenodo.19564026',
  },
  {
    title: 'Sequential Phonosemantic Encoding in ODE Reservoirs: Breaking Static Baselines and Measuring Capacity Ceilings',
    category: 'Paper 02',
    desc: 'A sequence-modeling study around reservoir capacity, stability, and the limits of static phonosemantic baselines.',
    metric: 'capacity analysis',
    link: 'https://doi.org/10.5281/zenodo.19570075',
  },
  {
    title: 'The Epileptiform Synchrony Limit: E/I Equilibrium as a Physical Prerequisite for Intelligence in Spiking Neural Networks',
    category: 'Paper 03',
    desc: 'A theory note on instability, collapse, and equilibrium constraints in spiking systems.',
    metric: 'theory note',
    link: 'https://doi.org/10.5281/zenodo.19602055',
  },
]

export default function ProjectsPage() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<'papers' | 'projects'>('papers')

  useEffect(() => {
    fetch('/github-data.json')
      .then((res) => (res.ok ? res.json() : null))
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  const projects = useMemo(() => {
    if (!data) return []
    const seen = new Set<string>()
    return [...data.pinnedRepos, ...data.otherRepos].filter((repo) => {
      if (seen.has(repo.id)) return false
      seen.add(repo.id)
      return true
    })
  }, [data])

  return (
    <div className="relative min-h-screen bg-[#070707] px-5 py-6 selection:bg-accent selection:text-black md:px-10 md:py-8">
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-5 py-5 md:px-10 md:py-8">
        <Link href="/" className="font-display text-2xl leading-none text-white md:text-3xl">
          AMIT
        </Link>
        <ul className="flex items-center gap-2 font-mono text-[10px] font-black uppercase md:gap-5">
          <li>
            <Link href="/" className="nav-chip">
              Research
            </Link>
          </li>
          <li>
            <Link href="/skills" className="nav-chip">
              Skills
            </Link>
          </li>
          <li>
            <Link href="/projects" className="nav-chip bg-white text-black">
              Work
            </Link>
          </li>
        </ul>
      </nav>

      <main className="mx-auto max-w-7xl pt-32">
        <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase text-white/50">
          <span className="h-px w-12 bg-white/35" />
          Papers and projects
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-6xl leading-[0.9] text-white md:text-8xl">Work.</h1>
          <div className="inline-flex w-fit border border-white/30 p-1">
            <SectionButton active={activeSection === 'papers'} onClick={() => setActiveSection('papers')}>
              Papers
            </SectionButton>
            <SectionButton active={activeSection === 'projects'} onClick={() => setActiveSection('projects')}>
              Projects
            </SectionButton>
          </div>
        </div>

        {activeSection === 'papers' ? (
          <section className="mt-14">
            <SectionHeading icon="papers" label="Research papers" />
            <div className="mt-8 border-t border-white/20">
              {researchPapers.map((paper, index) => (
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
        ) : (
          <section className="mt-14">
            <SectionHeading icon="projects" label="Projects" />
            {loading ? (
              <div className="mt-10 font-mono text-xs uppercase text-white/40">Loading projects...</div>
            ) : (
              <div className="mt-8 border-t border-white/20">
                {projects.map((repo, index) => (
                  <article key={repo.id} className="grid gap-5 border-b border-white/20 py-7 md:grid-cols-[0.12fr_1fr_0.26fr] md:items-center">
                    <div className="font-mono text-[10px] text-white/35">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black leading-tight text-white md:text-3xl">
                        {repo.name}
                      </h2>
                      <p className="mt-3 max-w-3xl font-mono text-[11px] leading-relaxed text-white/58">
                        {repo.description || 'Experiment in progress.'}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {repo.languages.slice(0, 5).map((language) => (
                          <span key={language} className="border border-white/20 px-2 py-1 font-mono text-[9px] uppercase text-white/45">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 md:justify-end">
                      {repo.homepageUrl && (
                        <Link href={repo.homepageUrl} target="_blank" className="icon-link" aria-label={`Open live site for ${repo.name}`}>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      )}
                      <Link href={repo.url} target="_blank" className="icon-link" aria-label={`Open GitHub repo for ${repo.name}`}>
                        <Github className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="mx-auto mt-20 max-w-7xl border-t border-white/20 py-10">
        <div className="font-display text-3xl italic text-white">AMIT 2026</div>
      </footer>
    </div>
  )
}

function SectionButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-5 py-3 font-mono text-[10px] font-black uppercase transition-colors',
        active ? 'bg-white text-black' : 'text-white/62 hover:bg-white/10 hover:text-white',
      )}
    >
      {children}
    </button>
  )
}

function SectionHeading({ icon, label }: { icon: 'papers' | 'projects'; label: string }) {
  const Icon = icon === 'papers' ? BookOpen : FolderGit2
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-accent" />
      <h2 className="font-mono text-xs font-black uppercase text-accent">{label}</h2>
    </div>
  )
}
