import { useState } from "react";
import { ChevronRight, ChevronDown, Square, Circle, Triangle } from "lucide-react";
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

  // Cycle through geometric shapes and colors for each slide
  const getGeometricElement = (num: number) => {
    const shapes = [Square, Circle, Triangle];
    const colors = ['color-accent-red', 'color-accent-blue', 'color-accent-yellow'];
    const ShapeIcon = shapes[num % shapes.length];
    const colorClass = colors[num % colors.length];
    
    return <div className={`p-2 ${colorClass} border-4 border-black`}><ShapeIcon className="h-4 w-4 text-black" /></div>;
  };

  return (
    <Card 
      className="slide-card group" 
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {getGeometricElement(slideNumber - 1)}
            <div className="flex-1">
              <CardTitle className="text-lg brutal-text">
                {slideNumber.toString().padStart(2, '0')}. {title}
              </CardTitle>
              <CardDescription className="mt-1 font-mono uppercase text-xs">
                {description}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              data-expand-button
              onClick={handleExpandClick}
              className="brutal-button bg-accent text-accent-foreground p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-black text-white border-2 border-black font-mono uppercase"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="border-t-4 border-black pt-4">
            <p className="font-mono text-sm leading-relaxed whitespace-pre-line">{content}</p>
          </div>
          
          <div className="mt-6">
            <button 
              onClick={() => navigate(route)}
              className="brutal-button bg-secondary text-secondary-foreground w-full"
            >
              VIEW FULL SLIDE
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};