import { Link } from "wouter";
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
  tutorial: "bg-info/10 text-info",
  howto: "bg-success/10 text-success",
  reference: "bg-secondary/10 text-secondary",
  explanation: "bg-warning/10 text-warning"
};

export function DocCard({ document }: DocCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="card bg-base-100 shadow hover:shadow-lg transition-all">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <div className={`badge ${categoryColors[document.category]} gap-1 font-medium`}>
              {categoryIcons[document.category]}
              <span className="capitalize">{document.category}</span>
            </div>
          </div>

          <h2 className="card-title text-xl text-primary">{document.title}</h2>

          <p className="text-sm text-base-content/70 line-clamp-3">
            {document.content}
          </p>

          <div className="card-actions justify-end mt-4">
            <Link href={`/document/${document.id}`}>
              <button className="btn btn-primary btn-sm w-full">
                Lire la documentation
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}