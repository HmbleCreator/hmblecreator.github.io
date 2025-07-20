"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillGroups = [
  {
    title: "Languages & Frameworks",
    skills: [
      "Python", "JavaScript", "TypeScript", "React", "Next.js", "FastAPI", "LangChain", "HTML", "CSS", "CustomTkinter"
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Docker", "Kubernetes", "Git", "GitHub", "Linux", "VS Code", "Jupyter", "Zindi", "Kaggle", "Vercel", "Hugging Face"
    ]
  },
  {
    title: "Expertise",
    skills: [
      "MLOps & LLMOps", "RAG Systems", "Semantic Search", "Prompt Engineering", "Sybil Detection", "Credit Scoring Models",
      "Feature Engineering", "Frontend Development", "Quantum Simulations", "Open Source Strategy",
      "Mathematics", "Physics", "Philosophical Reasoning"
    ]
  },
  {
    title: "Soft Skills",
    skills: [
      "Problem Solving", "Resilience", "Iterative Debugging", "Collaboration", "Strategic Thinking", "Technical Writing", "Mentoring"
    ]
  }
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-mono font-bold mb-12 text-center">
          <span className="text-mint-green">Skills</span> & Expertise
        </h1>
        <Card className="p-8 bg-black/40 backdrop-blur-lg border-mint-green/20 shadow-lg">
          <div className="space-y-8">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-2xl font-mono font-bold mb-4 text-mint-green">{group.title}</h2>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="py-2 px-4 text-sm border-mint-green/20 hover:border-mint-green/40 transition-colors bg-black/60 text-mint-green font-mono"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

