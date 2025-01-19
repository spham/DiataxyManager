import { useQuery } from "@tanstack/react-query";
import { DocSearch } from "@/components/doc-search";
import { ProgressTracker } from "@/components/progress-tracker";
import { SelectDocument } from "@db/schema";
import { DocCard } from "@/components/doc-card";
import { DiataxisExplorer } from "@/components/diataxis-explorer";
import { useState } from "react";

export default function Home() {
  const { data: documents } = useQuery<SelectDocument[]>({
    queryKey: ["/api/documents"],
  });

  const [activeRole, setActiveRole] = useState("business");
  const [activeCategory, setActiveCategory] = useState("tutorial");

  const userRoles = {
    business: "Utilisateur métier",
    developer: "Développeur",
    ops: "Ops"
  };

  const categories = {
    tutorial: "Tutoriels",
    howto: "Guides pratiques",
    reference: "Référence",
    explanation: "Concepts"
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary">
          Documentation
        </h1>
        <DocSearch />
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <DiataxisExplorer />

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* Role Tabs */}
              <div className="tabs tabs-boxed">
                {Object.entries(userRoles).map(([key, label]) => (
                  <button
                    key={key}
                    className={`tab flex-1 ${activeRole === key ? 'tab-active' : ''}`}
                    onClick={() => setActiveRole(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Category Tabs */}
              <div className="tabs tabs-lifted mt-4">
                {Object.entries(categories).map(([key, label]) => (
                  <button
                    key={key}
                    className={`tab tab-lg ${activeCategory === key ? 'tab-active' : ''}`}
                    onClick={() => setActiveCategory(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Documents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {documents
                  ?.filter(doc => 
                    doc.category === activeCategory && 
                    doc.userRole === activeRole
                  )
                  .map(doc => (
                    <DocCard key={doc.id} document={doc} />
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <ProgressTracker />
        </div>
      </div>
    </div>
  );
}