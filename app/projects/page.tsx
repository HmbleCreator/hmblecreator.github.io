import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: "Quantum Wave Function Simulator",
    description: "Interactive visualization of quantum mechanical systems, demonstrating wave function collapse and quantum entanglement using WebGL and Three.js.",
    tags: ["WebGL", "Three.js", "TypeScript", "Physics"],
    links: {
      github: "#",
      live: "#"
    }
  },
  {
    title: "Particle Physics Analysis Tool",
    description: "Real-time particle collision simulation and analysis platform inspired by CERN's Large Hadron Collider data visualization techniques.",
    tags: ["Python", "TensorFlow", "Data Visualization"],
    links: {
      github: "#",
      live: "#"
    }
  },
  {
    title: "Mathematical Universe Explorer",
    description: "3D visualization of complex mathematical concepts and physical phenomena, featuring interactive demonstrations of theoretical physics principles.",
    tags: ["React Three Fiber", "Mathematics", "WebGL"],
    links: {
      github: "#",
      live: "#"
    }
  },
  {
    title: "Quantum Computing Simulator",
    description: "Educational platform for quantum computing concepts, featuring visual representations of quantum gates and circuits.",
    tags: ["Quantum Computing", "TypeScript", "React"],
    links: {
      github: "#",
      live: "#"
    }
  }
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-mono font-bold mb-16 text-center">
          Featured <span className="text-mint-green">Projects</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="p-6 bg-black/40 backdrop-blur-lg border-mint-green/20 hover:border-mint-green/40 transition-all duration-300"
            >
              <h3 className="text-xl font-mono font-bold mb-4">{project.title}</h3>
              <p className="text-gray-400 mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-mint-green/10 text-mint-green"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href={project.links.github}>
                    <Github className="h-4 w-4" />
                    Code
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href={project.links.live}>
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

