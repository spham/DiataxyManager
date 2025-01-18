import { useQuery } from "@tanstack/react-query";
import { DocSearch } from "@/components/doc-search";
import { ProgressTracker } from "@/components/progress-tracker";
import { SelectDocument } from "@db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocCard } from "@/components/doc-card";

export default function Home() {
  const { data: documents } = useQuery<SelectDocument[]>({
    queryKey: ["/api/documents"],
  });

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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Documentation</h1>
        <DocSearch />
      </div>

      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <Tabs defaultValue="business" className="w-full">
            <TabsList className="w-full justify-start">
              {Object.entries(userRoles).map(([key, label]) => (
                <TabsTrigger key={key} value={key} className="flex-1">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.keys(userRoles).map((role) => (
              <TabsContent key={role} value={role}>
                <Tabs defaultValue="tutorial">
                  <TabsList>
                    {Object.entries(categories).map(([key, label]) => (
                      <TabsTrigger key={key} value={key}>
                        {label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.keys(categories).map((category) => (
                    <TabsContent key={category} value={category}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {documents
                          ?.filter(doc => doc.category === category && doc.userRole === role)
                          .map(doc => (
                            <DocCard key={doc.id} document={doc} />
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <ProgressTracker />
      </div>
    </div>
  );
}