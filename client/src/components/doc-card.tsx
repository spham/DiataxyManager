import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SelectDocument } from "@db/schema";
import { BookOpen, FileText, Brain, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface DocCardProps {
  document: SelectDocument;
}

const categoryIcons: Record<string, JSX.Element> = {
  tutorial: <BookOpen className="h-4 w-4" />,
  howto: <FileText className="h-4 w-4" />,
  reference: <Brain className="h-4 w-4" />,
  explanation: <Lightbulb className="h-4 w-4" />
};

const categoryColors: Record<string, string> = {
  tutorial: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  howto: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  reference: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  explanation: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
};

export function DocCard({ document }: DocCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge 
              variant="secondary" 
              className={`${categoryColors[document.category]} flex items-center gap-1`}
            >
              {categoryIcons[document.category]}
              <span className="capitalize">{document.category}</span>
            </Badge>
          </div>
          <CardTitle className="text-xl">{document.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {document.content}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full" variant="secondary">
            <Link href={`/document/${document.id}`}>
              Lire la documentation
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}