import { Terminal, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navigationItems = [
    { name: "Home", href: "/", description: "Platform overview" },
    { name: "Blueprint", href: "/blueprint", description: "Developer's guide to agentic coding" },
    { name: "Tools", href: "/tools", description: "AI-powered development tools" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-primary">
            <Terminal className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-medium gradient-text">
              AIProof.ME
            </span>
            <span className="text-xs text-muted-foreground">
              AI Development Platform
            </span>
          </div>
        </div>

        <nav className="flex items-center space-x-1">
          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-1 mr-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* GitHub Link */}
          <Button
            variant="ghost"
            size="sm"
            className="animated-link"
            asChild
          >
            <a
              href="https://github.com/Lazymindz/agentic-coding-blueprint/blob/main/slides/slides.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
};