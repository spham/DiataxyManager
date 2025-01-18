import { useQuery } from "@tanstack/react-query";
import { DocSearch } from "@/components/doc-search";
import { DocTree } from "@/components/doc-tree";
import { SelectDocument } from "@db/schema";

export default function Home() {
  const { data: documents } = useQuery<SelectDocument[]>({
    queryKey: ["/api/documents"],
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Documentation</h1>
        <DocSearch />
      </div>

      {documents && <DocTree documents={documents} />}
    </div>
  );
}