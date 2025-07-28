import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Search, Globe, Code, Loader2 } from "lucide-react";

interface URLInputProps {
  onExtract: (url: string) => void;
  isLoading: boolean;
}

export const URLInput = ({ onExtract, isLoading }: URLInputProps) => {
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      onExtract(formattedUrl);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
    }
  };

  const sampleSites = [
    { name: "GitHub", url: "github.com", type: "Repository" },
    { name: "Tailwind CSS", url: "tailwindcss.com", type: "Framework" },
    { name: "React", url: "react.dev", type: "Library" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          Code Hunter
          <Badge variant="secondary" className="text-xs bg-accent text-accent-foreground">
            Beta
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Extract and analyze source code from any website with AI assistance
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Enter website URL (e.g., example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading || !url.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {isLoading ? 'Extracting...' : 'Extract'}
          </Button>
        </form>

        <div>
          <p className="text-sm font-medium mb-2">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {sampleSites.map((site) => (
              <Button
                key={site.url}
                variant="outline"
                size="sm"
                onClick={() => setUrl(site.url)}
                disabled={isLoading}
                className="text-xs"
              >
                {site.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {site.type}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 border border-border rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">What you'll get:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Complete HTML structure and content</li>
            <li>• All CSS stylesheets (inline & external)</li>
            <li>• JavaScript files and logic</li>
            <li>• AI-powered code explanation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};