import { Link } from "wouter";
import { 
  BookOpen, FileText, Lightbulb, Book, 
  Users, Code, Settings, ChevronRight, ChevronDown 
} from "lucide-react";
import { useState } from "react";
import { SelectDocument } from "@db/schema";

interface TreeNode {
  id?: number;
  title: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  path?: string;
}

const roleIcons = {
  business: <Users className="h-4 w-4" />,
  developer: <Code className="h-4 w-4" />,
  ops: <Settings className="h-4 w-4" />
};

const categoryIcons = {
  tutorial: <BookOpen className="h-4 w-4" />,
  howto: <FileText className="h-4 w-4" />,
  explanation: <Lightbulb className="h-4 w-4" />,
  reference: <Book className="h-4 w-4" />
};

interface TreeNodeProps {
  node: TreeNode;
  level?: number;
}

function TreeNodeComponent({ node, level = 0 }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const paddingLeft = `${level * 1.5}rem`;

  return (
    <div>
      <div 
        className={`
          flex items-center gap-2 p-2 hover:bg-accent rounded-lg cursor-pointer
          ${node.path ? 'hover:underline text-primary' : 'font-semibold'}
        `}
        style={{ paddingLeft }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren && (
          <button className="p-1 hover:bg-accent rounded-full">
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}
        {node.icon}
        {node.path ? (
          <Link href={node.path}>{node.title}</Link>
        ) : (
          <span>{node.title}</span>
        )}
      </div>
      
      {isExpanded && node.children && (
        <div className="border-l ml-4">
          {node.children.map((child, index) => (
            <TreeNodeComponent key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

interface DocTreeProps {
  documents: SelectDocument[];
}

export function DocTree({ documents }: DocTreeProps) {
  // Organiser les documents en arborescence
  const buildTree = () => {
    const tree: TreeNode[] = [
      {
        title: "Documentation structurée",
        icon: <Book className="h-4 w-4" />,
        children: [
          {
            title: "Utilisateur métier",
            icon: roleIcons.business,
            children: buildRoleSection(documents.filter(d => d.userRole === 'business'))
          },
          {
            title: "Développeur",
            icon: roleIcons.developer,
            children: buildRoleSection(documents.filter(d => d.userRole === 'developer'))
          },
          {
            title: "Ops",
            icon: roleIcons.ops,
            children: buildRoleSection(documents.filter(d => d.userRole === 'ops'))
          }
        ]
      }
    ];
    return tree;
  };

  const buildRoleSection = (docs: SelectDocument[]) => {
    const categories = ['tutorial', 'howto', 'explanation', 'reference'];
    return categories.map(cat => ({
      title: getCategoryTitle(cat),
      icon: categoryIcons[cat as keyof typeof categoryIcons],
      children: docs
        .filter(d => d.category === cat)
        .map(d => ({
          id: d.id,
          title: d.title,
          icon: categoryIcons[d.category as keyof typeof categoryIcons],
          path: `/document/${d.id}`
        }))
    }));
  };

  const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
      tutorial: 'Tutoriels',
      howto: 'Guides pratiques',
      explanation: 'Concepts',
      reference: 'Référence'
    };
    return titles[category] || category;
  };

  return (
    <div className="p-4 rounded-lg border bg-card">
      {buildTree().map((node, index) => (
        <TreeNodeComponent key={index} node={node} />
      ))}
    </div>
  );
}
