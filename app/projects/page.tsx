"use client";

import Link from "next/link"
import { Github, ArrowUpRight, BookOpen, GitBranch } from 'lucide-react'
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"

interface Repo {
  id: string;
  name: string;
  description: string;
  url: string;
  homepageUrl?: string;
  languages: string[];
}

interface Contribution {
  repo: {
    id: string;
    nameWithOwner: string;
    description: string;
    url: string;
    languages: string[];
  };
  count: number;
}

interface GitHubData {
  pinnedRepos: Repo[];
  otherRepos: Repo[];
  contributions: Contribution[];
}

const researchPapers = [
  {
    title: "Semantic Pressure and Zero-Shot Generalization: Scaling the DDIN Receiver Model to a 2000-Root Linguistic Manifold",
    category: "Paper 4",
    desc: "Demonstrating 11x amplification of phonosemantic signal in zero-weight AdEx reservoirs. Achieved ARI=0.9555 at language scale (N=2000).",
    metric: "ARI 0.9993 (Best)",
    link: "https://doi.org/10.5281/zenodo.SINGULARITY"
  },
  {
    title: "Phonosemantic Grounding: Sanskrit as a Formalized Case of Motivated Sign Structure for Interpretable AI",
    category: "Paper 1",
    desc: "Empirical validation of Pāṇinian articulatory loci as the basis for semantic vector space grounding across Sanskrit corpora.",
    metric: "Locus-ARI 0.086",
    link: "https://doi.org/10.5281/zenodo.19564026"
  },
  {
    title: "Sequential Phonosemantic Encoding in ODE Reservoirs: Breaking Static Baselines and Measuring Capacity Ceilings",
    category: "Paper 2",
    desc: "Identifying the causal link between reservoir criticality (r=-0.53) and the emergence of stable semantic attractor basins.",
    metric: "r = -0.53",
    link: "https://doi.org/10.5281/zenodo.19570075"
  },
  {
    title: "The Epileptiform Synchrony Limit: E/I Equilibrium as a Physical Prerequisite for Intelligence in Spiking Neural Networks",
    category: "Paper 3",
    desc: "Defining the E/I equilibrium as a physical prerequisite for scaling contextual memory and avoiding network collapse.",
    metric: "ESL Theory",
    link: "https://doi.org/10.5281/zenodo.19602055"
  }
];

export default function ProjectsPage() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainTab, setMainTab] = useState<'papers' | 'opensource'>('papers');
  const [activeTab, setActiveTab] = useState<'repos' | 'contributions'>('repos');

  useEffect(() => {
    fetch("/github-data.json")
      .then((res) => res.ok ? res.json() : null)
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen p-8 md:p-12 selection:bg-accent selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-8 mix-blend-difference">
        <div className="text-4xl font-display tracking-tighter text-white">AMIT</div>
        <ul className="flex space-x-8 font-mono text-[10px] uppercase font-black">
          <li><Link href="/" className="border border-white px-2 text-white hover:bg-white hover:text-black transition-all">01.RESEARCH</Link></li>
          <li><Link href="/skills" className="border border-white px-2 text-white hover:bg-white hover:text-black transition-all">02.DOMAINS</Link></li>
          <li><Link href="/projects" className="bg-white text-black px-2 hover:bg-accent transition-colors">03.WORK</Link></li>
        </ul>
      </nav>

      <main className="max-w-7xl mx-auto pt-16">
        <div className="raw-label mb-6 inline-block">Archive Status: Online</div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <h1 className="text-[8vw] md:text-[6vw] font-display italic tracking-tighter leading-none text-white">WORK.</h1>
          
          <div className="flex space-x-4 mb-2">
            <button 
              onClick={() => setMainTab('papers')}
              className={cn(
                "font-mono text-xs font-black px-6 py-3 border-[3px] transition-all shadow-[4px_4px_0px_0px_white]",
                mainTab === 'papers' ? "bg-white text-black border-white" : "text-white border-white hover:bg-white/10"
              )}
            >
              RESEARCH_PAPERS
            </button>
            <button 
              onClick={() => setMainTab('opensource')}
              className={cn(
                "font-mono text-xs font-black px-6 py-3 border-[3px] transition-all shadow-[4px_4px_0px_0px_white]",
                mainTab === 'opensource' ? "bg-white text-black border-white" : "text-white border-white hover:bg-white/10"
              )}
            >
              OPEN_SOURCE
            </button>
          </div>
        </div>

        {mainTab === 'papers' ? (
          /* Research Section */
          <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-4">
              <BookOpen className="w-5 h-5 text-accent" />
              <div className="font-mono text-xs font-black uppercase tracking-[0.3em] text-accent">PRIMARY_RESEARCH_PAPERS</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[3px] border-white divide-y md:divide-y-0 md:divide-x-[3px] divide-white">
              {researchPapers.map((paper) => (
                <div key={paper.title} className="p-8 hover:bg-white hover:text-black transition-colors group flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="font-mono text-[10px] text-accent group-hover:text-black">{paper.category}</div>
                    <h3 className="text-2xl font-display leading-tight line-clamp-2 h-14">{paper.title}</h3>
                    <p className="font-mono text-[10px] leading-tight opacity-60 group-hover:opacity-100 line-clamp-2 h-8">{paper.desc}</p>
                  </div>
                  <div className="flex justify-between items-center pt-6 mt-6 border-t border-white/20 group-hover:border-black/20">
                    <span className="font-mono text-[9px] font-black opacity-40">{paper.metric}</span>
                    <Link href={paper.link} target="_blank" className="p-2 border-[2px] border-white group-hover:border-black transition-colors">
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Open Source Section */
          <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-[3px] border-white pb-8 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <GitBranch className="w-5 h-5 text-secondary" />
                  <div className="font-mono text-xs font-black uppercase tracking-[0.3em] text-secondary">OPEN_SOURCE_ECOSYSTEM</div>
                </div>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setActiveTab('repos')}
                    className={cn(
                      "font-mono text-[10px] font-black px-4 py-2 border-[2px] transition-all",
                      activeTab === 'repos' ? "bg-white text-black border-white" : "text-white border-white/20 hover:border-white"
                    )}
                  >
                    01. REPOSITORIES
                  </button>
                  <button 
                    onClick={() => setActiveTab('contributions')}
                    className={cn(
                      "font-mono text-[10px] font-black px-4 py-2 border-[2px] transition-all",
                      activeTab === 'contributions' ? "bg-white text-black border-white" : "text-white border-white/20 hover:border-white"
                    )}
                  >
                    02. CONTRIBUTIONS
                  </button>
                </div>
              </div>
              <div className="font-mono text-[10px] opacity-20 uppercase tracking-[0.5em]">Updated via GitHub Actions</div>
            </div>

            {loading ? (
              <div className="font-mono text-xs opacity-20">ACCESSING_GITHUB_API...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {activeTab === 'repos' ? (
                  data?.pinnedRepos.concat(data.otherRepos).map((repo) => (
                    <div key={repo.id} className="brutal-card p-10 group flex flex-col justify-between min-h-[350px]">
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <h4 className="text-2xl md:text-3xl font-display italic leading-none break-all pr-8">{repo.name}</h4>
                          <Link href={repo.url} target="_blank">
                            <Github className="w-6 h-6 opacity-40 hover:opacity-100 transition-opacity" />
                          </Link>
                        </div>
                        <p className="font-mono text-xs opacity-60 leading-relaxed overflow-hidden line-clamp-4">
                          {repo.description || "No description provided."}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-8">
                        {repo.languages.map(lang => (
                          <span key={lang} className="raw-label text-[8px]">{lang}</span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  data?.contributions.map((contrib) => (
                    <div key={contrib.repo.id} className="brutal-card p-10 group flex flex-col justify-between min-h-[350px]">
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <h4 className="text-2xl md:text-3xl font-display italic leading-none break-all pr-8">
                            {contrib.repo.nameWithOwner}
                          </h4>
                          <Link href={contrib.repo.url} target="_blank">
                            <Github className="w-6 h-6 opacity-40 hover:opacity-100 transition-opacity" />
                          </Link>
                        </div>
                        <p className="font-mono text-xs opacity-60 leading-relaxed overflow-hidden line-clamp-4">
                          {contrib.repo.description || "No description provided."}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-8">
                        <div className="flex flex-wrap gap-2">
                          {contrib.repo.languages.slice(0, 3).map(lang => (
                            <span key={lang} className="raw-label text-[8px]">{lang}</span>
                          ))}
                        </div>
                        <div className="font-mono text-[10px] font-black text-secondary">
                          {contrib.count} COMMITS
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="mt-48 border-t-[3px] border-white pt-12 pb-24">
        <div className="font-display text-4xl italic text-white">AMIT © 2024</div>
      </footer>
    </div>
  );
}

