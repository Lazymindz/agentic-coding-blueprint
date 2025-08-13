import { Terminal, Github, Square, Circle } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b-8 border-black bg-primary">
      <div className="container flex h-20 items-center justify-between">
        <div 
          className="flex items-center space-x-4 cursor-pointer group"
          onClick={handleLogoClick}
        >
          {/* Bauhaus geometric logo elements */}
          <div className="flex items-center relative">
            <div className="h-12 w-12 color-accent-yellow border-4 border-black rotate-12 animate-brutal-rotate"></div>
            <div className="h-12 w-12 color-accent-blue border-4 border-black -ml-6 -rotate-12"></div>
            <Square className="absolute left-6 top-3 h-6 w-6 text-black animate-brutal-rotate" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tighter text-white uppercase">
              AIPROOF.ME
            </span>
            <span className="text-sm text-white/80 font-mono uppercase tracking-wide">
              AI ERA RESOURCE HUB
            </span>
          </div>
        </div>

        <nav className="flex items-center space-x-4">
          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`brutal-button px-4 py-2 text-sm transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-accent text-accent-foreground shadow-brutal'
                    : 'bg-white text-black hover:shadow-brutal'
                }`}
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/Lazymindz/agentic-coding-blueprint/blob/main/slides/slides.md"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-button bg-black text-white p-3 hover:shadow-brutal-white"
          >
            <Github className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
};