import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
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
    title: "Tutorials",
    description: "Learning-oriented guides that help beginners learn by doing",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-blue-100 dark:bg-blue-950",
    hoverColor: "hover:bg-blue-200 dark:hover:bg-blue-900",
    category: "tutorial"
  },
  {
    title: "How-to Guides",
    description: "Problem-oriented guides that show how to solve specific problems",
    icon: <FileText className="h-6 w-6" />,
    color: "bg-green-100 dark:bg-green-950",
    hoverColor: "hover:bg-green-200 dark:hover:bg-green-900",
    category: "howto"
  },
  {
    title: "Reference",
    description: "Information-oriented technical descriptions of the product",
    icon: <Brain className="h-6 w-6" />,
    color: "bg-purple-100 dark:bg-purple-950",
    hoverColor: "hover:bg-purple-200 dark:hover:bg-purple-900",
    category: "reference"
  },
  {
    title: "Explanation",
    description: "Understanding-oriented discussions that explain concepts",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "bg-amber-100 dark:bg-amber-950",
    hoverColor: "hover:bg-amber-200 dark:hover:bg-amber-900",
    category: "explanation"
  }
];

export function DiataxisExplorer() {
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <div className="grid grid-cols-2 gap-4 p-4 rounded-lg border bg-card">
        <h2 className="col-span-2 text-2xl font-bold mb-2">
          Documentation Explorer
        </h2>
        
        {quadrants.map((quadrant) => (
          <motion.div
            key={quadrant.title}
            className={`
              p-6 rounded-lg cursor-pointer transition-colors
              ${quadrant.color} ${quadrant.hoverColor}
              ${activeQuadrant && activeQuadrant !== quadrant.category ? 'opacity-50' : 'opacity-100'}
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
                  <p className="text-sm text-muted-foreground">
                    {quadrant.description}
                  </p>
                  <Link href={`/document/new?category=${quadrant.category}`}>
                    <Badge variant="secondary" className="mt-2">
                      Create {quadrant.title}
                    </Badge>
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
    </TooltipProvider>
  );
}
