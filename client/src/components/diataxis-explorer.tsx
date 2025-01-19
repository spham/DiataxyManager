import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpen, Brain, FileText, Lightbulb } from "lucide-react";

interface QuadrantInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  category: string;
}

const quadrants: QuadrantInfo[] = [
  {
    title: "Tutoriels",
    description: "Guides d'apprentissage pour aider les débutants à apprendre par la pratique",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-info/10",
    hoverColor: "hover:bg-info/20",
    category: "tutorial"
  },
  {
    title: "Guides pratiques",
    description: "Guides orientés problèmes qui montrent comment résoudre des problèmes spécifiques",
    icon: <FileText className="h-6 w-6" />,
    color: "bg-success/10",
    hoverColor: "hover:bg-success/20",
    category: "howto"
  },
  {
    title: "Référence",
    description: "Descriptions techniques orientées information du produit",
    icon: <Brain className="h-6 w-6" />,
    color: "bg-secondary/10",
    hoverColor: "hover:bg-secondary/20",
    category: "reference"
  },
  {
    title: "Concepts",
    description: "Discussions orientées compréhension qui expliquent les concepts",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "bg-warning/10",
    hoverColor: "hover:bg-warning/20",
    category: "explanation"
  }
];

export function DiataxisExplorer() {
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4 text-primary">
            Documentation Explorer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quadrants.map((quadrant) => (
              <motion.div
                key={quadrant.title}
                className={`
                  p-6 rounded-lg cursor-pointer transition-colors
                  ${quadrant.color} ${quadrant.hoverColor}
                  ${activeQuadrant && activeQuadrant !== quadrant.category ? 'opacity-70' : 'opacity-100'}
                `}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveQuadrant(quadrant.category)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {quadrant.icon}
                        <h3 className="text-lg font-semibold">{quadrant.title}</h3>
                      </div>
                      <p className="text-sm text-base-content/70">
                        {quadrant.description}
                      </p>
                      <Link href={`/document/new?category=${quadrant.category}`}>
                        <button className="btn btn-sm btn-outline mt-2">
                          Créer {quadrant.title}
                        </button>
                      </Link>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{quadrant.description}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}