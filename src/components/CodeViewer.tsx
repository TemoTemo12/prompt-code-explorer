import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CodeFile {
  name: string;
  type: 'html' | 'css' | 'js';
  content: string;
  size: string;
}

interface CodeViewerProps {
  files: CodeFile[];
}

const SyntaxHighlighter = ({ code, language }: { code: string; language: string }) => {
  const highlightSyntax = (text: string, lang: string) => {
    if (lang === 'html') {
      return text
        .replace(/(&lt;\/?\w+[^&gt;]*&gt;)/g, '<span class="text-syntax-keyword">$1</span>')
        .replace(/(class|id|src|href)=/g, '<span class="text-syntax-function">$1</span>=')
        .replace(/="([^"]*)"/g, '="<span class="text-syntax-string">$1</span>"');
    }
    if (lang === 'css') {
      return text
        .replace(/([.#][\w-]+)/g, '<span class="text-syntax-keyword">$1</span>')
        .replace(/([\w-]+)(\s*:)/g, '<span class="text-syntax-function">$1</span>$2')
        .replace(/:\s*([^;]+)/g, ': <span class="text-syntax-string">$1</span>');
    }
    if (lang === 'js') {
      return text
        .replace(/\b(function|const|let|var|return|if|else|for|while)\b/g, '<span class="text-syntax-keyword">$1</span>')
        .replace(/"([^"]*)"/g, '"<span class="text-syntax-string">$1</span>"')
        .replace(/\b(\d+)\b/g, '<span class="text-syntax-number">$1</span>')
        .replace(/\/\/(.*)$/gm, '<span class="text-syntax-comment">//$1</span>');
    }
    return text;
  };

  return (
    <pre className="text-sm font-mono leading-relaxed">
      <code 
        dangerouslySetInnerHTML={{ 
          __html: highlightSyntax(code.replace(/</g, '&lt;').replace(/>/g, '&gt;'), language) 
        }} 
      />
    </pre>
  );
};

export const CodeViewer = ({ files }: CodeViewerProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'html': return '🌐';
      case 'css': return '🎨';
      case 'js': return '⚡';
      default: return '📄';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'html': return 'bg-syntax-keyword';
      case 'css': return 'bg-syntax-function';
      case 'js': return 'bg-syntax-string';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Extracted Code</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {files.length} files
          </Badge>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search files and content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={filteredFiles[0]?.name} className="h-[calc(100vh-200px)]">
          <div className="px-6 border-b border-border">
            <ScrollArea className="w-full">
              <TabsList className="inline-flex h-auto p-0 bg-transparent gap-1">
                {filteredFiles.map((file) => (
                  <TabsTrigger
                    key={file.name}
                    value={file.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-t-lg data-[state=active]:bg-code-bg data-[state=active]:border-t-2 data-[state=active]:border-primary"
                  >
                    <span className="text-base">{getFileIcon(file.type)}</span>
                    <span className="font-medium">{file.name}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getTypeBadgeColor(file.type)} text-white border-0`}
                    >
                      {file.type.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{file.size}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
          </div>
          
          {filteredFiles.map((file) => (
            <TabsContent key={file.name} value={file.name} className="h-full m-0">
              <ScrollArea className="h-full">
                <div className="bg-code-bg border border-code-border rounded-lg m-4 p-4">
                  <SyntaxHighlighter code={file.content} language={file.type} />
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};