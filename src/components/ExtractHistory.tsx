import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Clock, FileText, Trash2, ExternalLink } from "lucide-react";
import { ExtractHistoryItem } from "@/hooks/useExtractHistory";
import { formatDistanceToNow } from "date-fns";

interface ExtractHistoryProps {
  history: ExtractHistoryItem[];
  onSelectHistoryItem: (item: ExtractHistoryItem) => void;
  onRemoveItem: (id: string) => void;
  onClearHistory: () => void;
}

export const ExtractHistory = ({ 
  history, 
  onSelectHistoryItem, 
  onRemoveItem, 
  onClearHistory 
}: ExtractHistoryProps) => {
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <History className="h-4 w-4" />
            Extract History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No extractions yet. Start by entering a URL above!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <History className="h-4 w-4" />
            Extract History
            <Badge variant="secondary" className="text-xs">
              {history.length}
            </Badge>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-xs text-muted-foreground hover:text-destructive"
          >
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-64">
          <div className="space-y-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between p-2 rounded-md border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <p className="text-xs font-medium truncate" title={item.url}>
                      {item.url.replace(/^https?:\/\//, '')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatDistanceToNow(item.timestamp, { addSuffix: true })}</span>
                    <FileText className="h-3 w-3 ml-1" />
                    <span>{item.fileCount} files</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSelectHistoryItem(item)}
                    className="h-6 w-6 p-0"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};