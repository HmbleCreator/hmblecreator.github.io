import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Atom, Brain, Code, Database } from 'lucide-react'

const skills = {
  "Physics & Mathematics": {
    icon: Atom,
    skills: [
      "Quantum Mechanics",
      "Statistical Physics",
      "Mathematical Modeling",
      "Differential Equations",
      "Linear Algebra",
      "Numerical Methods"
    ]
  },
  "Programming": {
    icon: Code,
    skills: [
      "TypeScript",
      "Python",
      "React",
      "Next.js",
      "Node.js",
      "WebGL"
    ]
  },
  "Machine Learning": {
    icon: Brain,
    skills: [
      "Deep Learning",
      "Neural Networks",
      "TensorFlow",
      "PyTorch",
      "Computer Vision",
      "Natural Language Processing"
    ]
  },
  "Data Science": {
    icon: Database,
    skills: [
      "Data Analysis",
      "Scientific Computing",
      "Data Visualization",
      "SQL",
      "Pandas",
      "NumPy"
    ]
  }
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-mono font-bold mb-16 text-center">
          <span className="text-mint-green">Skills</span> & Expertise
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, { icon: Icon, skills }], index) => (
            <Card key={category} className="p-6 bg-black/40 backdrop-blur-lg border-mint-green/20">
              <div className="flex items-center gap-4 mb-6">
                <Icon className="h-8 w-8 text-mint-green" />
                <h2 className="text-2xl font-mono font-bold">{category}</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="justify-center py-2 text-sm border-mint-green/20 hover:border-mint-green/40 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

