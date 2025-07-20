"use client";

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, ExternalLink } from 'lucide-react'
import { useEffect, useState, useRef } from "react";

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

export default function ProjectsPage() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contributionsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetch("/github-data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch GitHub data");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error.message}</div>;
  if (!data) return null;

  const { pinnedRepos, otherRepos, contributions } = data;

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      {/* Transparent Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-mint-green/20 flex items-center justify-between px-8 py-4 transition-all">
        <div className="font-mono text-lg font-bold tracking-widest text-mint-green">Projects</div>
        <nav className="flex gap-6">
          <button
            className="text-white hover:text-mint-green transition-colors font-mono text-base"
            onClick={() => scrollToSection(projectsRef)}
          >
            Featured Projects
          </button>
          <button
            className="text-white hover:text-mint-green transition-colors font-mono text-base"
            onClick={() => scrollToSection(contributionsRef)}
          >
            My Contributions
          </button>
        </nav>
      </header>
      {/* Spacer for header */}
      <div className="h-20" />
      <div className="container mx-auto max-w-6xl">
        <h1 ref={projectsRef} className="text-4xl md:text-5xl font-mono font-bold mb-16 text-center">
          Featured <span className="text-mint-green">Projects</span>
        </h1>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[...pinnedRepos, ...otherRepos].map((project: Repo) => (
            <Card
              key={project.id}
              className="p-6 bg-black/40 backdrop-blur-lg border-mint-green/20 hover:border-mint-green/40 transition-all duration-300"
            >
              <h3 className="text-xl font-mono font-bold mb-4">{project.name}</h3>
              <p className="text-gray-400 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.languages.map((lang: string) => (
                  <span key={lang} className="px-3 py-1 rounded-full text-xs bg-mint-green/10 text-mint-green">{lang}</span>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href={project.url}>
                    <Github className="h-4 w-4" />
                    Code
                  </Link>
                </Button>
                {project.homepageUrl && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <Link href={project.homepageUrl}>
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </Link>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
        <h2 ref={contributionsRef} className="text-3xl font-mono font-bold mb-8 text-center">My Contributions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {contributions.map((contrib: Contribution) => (
            <Card key={contrib.repo.id} className="p-6 bg-black/40 backdrop-blur-lg border-mint-green/20">
              <h3 className="text-xl font-mono font-bold mb-2">{contrib.repo.nameWithOwner}</h3>
              <p className="text-gray-400 mb-4">{contrib.repo.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {contrib.repo.languages.map((lang: string) => (
                  <span key={lang} className="px-3 py-1 rounded-full text-xs bg-mint-green/10 text-mint-green">{lang}</span>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href={contrib.repo.url}>
                    <Github className="h-4 w-4" />
                    Repo
                  </Link>
                </Button>
              </div>
              <div className="mt-4 text-xs text-gray-500">Contributions: {contrib.count}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

