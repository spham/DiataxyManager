import { useQuery } from "@tanstack/react-query";
import { DocCard } from "@/components/doc-card";
import { DocSearch } from "@/components/doc-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiataxisExplorer } from "@/components/diataxis-explorer";
import { SelectDocument } from "@db/schema";

export default function Home() {
  const { data: documents } = useQuery<SelectDocument[]>({
    queryKey: ["/api/documents"],
  });

  const categories = {
    tutorial: "Tutorials",
    howto: "How-to Guides",
    reference: "Technical Reference",
    explanation: "Explanation"
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Documentation</h1>
        <DocSearch />
      </div>

      {/* Add the Diataxis Explorer */}
      <DiataxisExplorer />

      <Tabs defaultValue="tutorial">
        <TabsList>
          {Object.entries(categories).map(([key, label]) => (
            <TabsTrigger key={key} value={key}>{label}</TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(categories).map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents
                ?.filter(doc => doc.category === category)
                .map(doc => (
                  <DocCard key={doc.id} document={doc} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}