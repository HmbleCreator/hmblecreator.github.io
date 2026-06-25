import Link from 'next/link'

const skills = [
  {
    title: 'Scientific programming',
    items: ['Python', 'Jupyter', 'NumPy', 'Pandas', 'Matplotlib', 'simulation notebooks'],
  },
  {
    title: 'AI systems',
    items: ['RAG pipelines', 'semantic search', 'local LLM tooling', 'document intelligence', 'model evaluation'],
  },
  {
    title: 'Product engineering',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'deployment workflows'],
  },
  {
    title: 'Data and automation',
    items: ['data cleaning', 'risk scoring', 'classification', 'workflow tools', 'GitHub automation'],
  },
]

const interests = [
  'tools that make messy knowledge searchable',
  'interfaces for scientific and mathematical exploration',
  'local-first AI assistants and document systems',
  'data products with clear feedback loops',
  'visual experiments that turn abstract systems into something inspectable',
  'open-source projects that are useful before they are polished',
]

export default function SkillsPage() {
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
            <Link href="/skills" className="nav-chip bg-white text-black">
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

      <main className="mx-auto max-w-7xl pt-32">
        <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase text-white/50">
          <span className="h-px w-12 bg-white/35" />
          Working vocabulary
        </div>
        <h1 className="max-w-5xl font-display text-6xl leading-[0.9] text-white md:text-8xl">
          Skills and interests.
        </h1>

        <section className="mt-16 border-t border-white/20">
          {skills.map((group, index) => (
            <div
              key={group.title}
              className="grid gap-5 border-b border-white/20 py-8 md:grid-cols-[0.42fr_1fr] md:items-start"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-white/35">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="font-display text-2xl text-white md:text-4xl">{group.title}</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="border border-white/25 px-3 py-2 font-mono text-[11px] uppercase text-white/72 transition-colors hover:border-accent hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-8 py-16 md:grid-cols-[0.42fr_1fr]">
          <h2 className="font-mono text-xs font-black uppercase text-accent">Interests</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {interests.map((interest) => (
              <p key={interest} className="border-l border-white/25 pl-5 text-lg font-black leading-tight text-white/86 md:text-2xl">
                {interest}
              </p>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-12 max-w-7xl border-t border-white/20 py-10">
        <div className="font-display text-3xl italic text-white">AMIT 2026</div>
      </footer>
    </div>
  )
}
