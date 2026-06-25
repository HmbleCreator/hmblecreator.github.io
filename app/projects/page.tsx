'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, FolderGit2, Github } from 'lucide-react'
import Link from 'next/link'
import { SiteNav } from '@/components/SiteNav'

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

export default function ProjectsPage() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)

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
      <SiteNav active="projects" />

      <main className="mx-auto max-w-7xl pt-32">
        <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase text-white/50">
          <span className="h-px w-12 bg-white/35" />
          Built experiments
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-6xl leading-[0.9] text-white md:text-8xl">Projects.</h1>
          <p className="max-w-xl font-mono text-[11px] uppercase leading-relaxed text-white/48">
            Software, prototypes, local-first tools, data apps, and experiments that made it past the notebook.
          </p>
        </div>

        <section className="mt-14">
          <div className="flex items-center gap-3">
            <FolderGit2 className="h-5 w-5 text-accent" />
            <h2 className="font-mono text-xs font-black uppercase text-accent">Project index</h2>
          </div>

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
      </main>

      <footer className="mx-auto mt-20 max-w-7xl border-t border-white/20 py-10">
        <div className="font-display text-3xl italic text-white">AMIT 2026</div>
      </footer>
    </div>
  )
}
