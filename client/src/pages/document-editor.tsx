import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { SelectDocument, SelectTemplate } from "@db/schema";

export default function DocumentEditor() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("tutorial");
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);

  // Fetch document if editing
  const { data: document } = useQuery<SelectDocument>({
    queryKey: [`/api/documents/${id}`],
    enabled: !!id,
    onSuccess: (doc) => {
      setTitle(doc.title);
      setContent(doc.content);
      setCategory(doc.category);
      setSelectedTemplateId(doc.templateId || null);
    }
  });

  // Fetch templates for the selected category
  const { data: templates } = useQuery<SelectTemplate[]>({
    queryKey: [`/api/templates/${category}`],
    enabled: !id, // Only fetch templates when creating a new document
  });

  // Update content when template is selected
  useEffect(() => {
    if (templates && selectedTemplateId) {
      const template = templates.find(t => t.id === selectedTemplateId);
      if (template) {
        setContent(template.content.replace('{title}', title));
      }
    }
  }, [selectedTemplateId, title, templates]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch(id ? `/api/documents/${id}` : '/api/documents', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          content, 
          category,
          templateId: selectedTemplateId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save document');
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Document saved successfully",
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <Input 
          placeholder="Document Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tutorial">Tutorial</SelectItem>
            <SelectItem value="howto">How-to Guide</SelectItem>
            <SelectItem value="reference">Technical Reference</SelectItem>
            <SelectItem value="explanation">Explanation</SelectItem>
          </SelectContent>
        </Select>

        {!id && templates && templates.length > 0 && (
          <Select value={selectedTemplateId?.toString()} onValueChange={(value) => setSelectedTemplateId(parseInt(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map(template => (
                <SelectItem key={template.id} value={template.id.toString()}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Textarea 
          placeholder="Document content..."
          className="min-h-[400px]"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button onClick={() => mutate()}>
            {id ? 'Update' : 'Create'} Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}