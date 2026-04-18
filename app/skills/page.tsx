"use client";
import Link from "next/link";

const skillGroups = [
  {
    title: "Scientific Stack",
    skills: ["Python", "PyTorch", "NumPy", "SciPy", "Matplotlib", "Jupyter", "FastAPI"]
  },
  {
    title: "Neuromorphic & AI",
    skills: ["SNNs", "Reservoir Computing", "BCM Homeostasis", "LLMOps", "Semantic Search", "RAG"]
  },
  {
    title: "Frontend Engineering",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "D3.js"]
  },
  {
    title: "Mathematical Foundations",
    skills: ["Topological Analysis", "Information Theory", "Classical Mechanics", "Quantum Logic"]
  }
];

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen p-8 md:p-24 selection:bg-accent selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-8 mix-blend-difference">
        <div className="text-4xl font-display tracking-tighter">AMIT</div>
        <ul className="flex space-x-8 font-mono text-[10px] uppercase font-black">
          <li><Link href="/" className="border border-white px-2 hover:bg-white hover:text-black transition-all">01.RESEARCH</Link></li>
          <li><Link href="/skills" className="bg-white text-black px-2 hover:bg-accent transition-colors">02.DOMAINS</Link></li>
          <li><Link href="/projects" className="border border-white px-2 hover:bg-white hover:text-black transition-all">03.WORK</Link></li>
        </ul>
      </nav>

      <main className="max-w-7xl mx-auto pt-32">
        <div className="raw-label mb-8 inline-block">Competency Matrix: Loaded</div>
        <h1 className="text-[12vw] font-display italic mb-24 tracking-tighter leading-none">DOMAINS.</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[3px] border-white divide-y md:divide-y-0 md:divide-x-[3px] divide-white">
          {skillGroups.map((group) => (
            <div key={group.title} className="p-12 hover:bg-white hover:text-black transition-colors group">
              <h2 className="font-mono text-xs font-black uppercase tracking-[0.3em] text-accent mb-12 group-hover:text-black">{group.title}</h2>
              <div className="flex flex-wrap gap-4">
                {group.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 border-[2px] border-white font-mono text-sm font-bold group-hover:border-black">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-32 border-t-[3px] border-white pt-12 pb-24">
        <div className="font-display text-4xl italic">AMIT © 2024</div>
      </footer>
    </div>
  );
}

