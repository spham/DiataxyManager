import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectDocument } from "@db/schema";

interface DocCardProps {
  document: SelectDocument;
}

export function DocCard({ document }: DocCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {document.content}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/document/${document.id}`}>
            Edit Document
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
