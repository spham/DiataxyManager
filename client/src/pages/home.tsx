import { useQuery } from "@tanstack/react-query";
import { DocSearch } from "@/components/doc-search";
import { ProgressTracker } from "@/components/progress-tracker";
import { SelectDocument } from "@db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocCard } from "@/components/doc-card";
import { DiataxisExplorer } from "@/components/diataxis-explorer";

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          Documentation
        </h1>
        <DocSearch />
      </div>

      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <DiataxisExplorer />

          <Tabs defaultValue="business" className="w-full">
            <TabsList className="w-full justify-start mb-6">
              {Object.entries(userRoles).map(([key, label]) => (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className="flex-1 py-3 text-base font-medium"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.keys(userRoles).map((role) => (
              <TabsContent key={role} value={role}>
                <Tabs defaultValue="tutorial">
                  <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground mb-6">
                    {Object.entries(categories).map(([key, label]) => (
                      <TabsTrigger 
                        key={key} 
                        value={key}
                        className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground"
                      >
                        {label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.keys(categories).map((category) => (
                    <TabsContent key={category} value={category} className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="space-y-8">
          <ProgressTracker />
        </div>
      </div>
    </div>
  );
}