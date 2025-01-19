import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PlusCircle, Info } from "lucide-react";

export default function Navigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <h1 className="text-xl font-bold cursor-pointer">
              Diataxis Docs
            </h1>
          </Link>
          <Link href="/about">
            <Button variant="ghost" size="sm">
              <Info className="h-4 w-4 mr-2" />
              À propos
            </Button>
          </Link>
        </div>

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