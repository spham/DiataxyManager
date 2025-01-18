import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Navigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer">
            Diataxis Docs
          </h1>
        </Link>

        <Button asChild>
          <Link href="/document/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Document
          </Link>
        </Button>
      </div>
    </header>
  );
}
