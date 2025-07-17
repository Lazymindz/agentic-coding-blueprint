import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SlideCardProps {
  slideNumber: number;
  title: string;
  description: string;
  content: string;
  tags?: string[];
  route: string;
}

export const SlideCard = ({ slideNumber, title, description, content, tags, route }: SlideCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking the expand button
    if ((e.target as HTMLElement).closest('[data-expand-button]')) {
      return;
    }
    navigate(route);
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      className="slide-card group" 
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-mono text-sm font-semibold">
              {slideNumber.toString().padStart(2, '0')}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:gradient-text transition-all duration-300">
                {title}
              </CardTitle>
              <CardDescription className="mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              data-expand-button
              onClick={handleExpandClick}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {tags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="whitespace-pre-line">{content}</p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border/40">
            <Button 
              onClick={() => navigate(route)}
              className="w-full"
              variant="secondary"
            >
              View Full Slide
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};