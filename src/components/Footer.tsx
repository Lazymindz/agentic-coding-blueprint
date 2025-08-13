import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const references = [
    {
      title: "Essential Reading for Agentic Engineers",
      description: "Comprehensive reading list for developers entering the agentic coding space",
      url: "https://steipete.me/posts/2025/essential-reading",
    },
    {
      title: "12-Factor-Agents GitHub",
      description: "Official repository with code examples and detailed explanations",
      url: "https://github.com/humanlayer/12-factor-agents",
    },
    {
      title: "Anthropic's Claude Code Best Practices",
      description: "Official best practices for coding with Claude and other LLMs",
      url: "https://www.anthropic.com/engineering/claude-code-best-practices",
    },
    {
      title: "Building Effective AI Agents",
      description: "Anthropic's engineering guide to building production-ready agents",
      url: "https://www.anthropic.com/engineering/building-effective-agents",
    },
    {
      title: "How Long Contexts Fail and How to Fix Them",
      description: "Understanding context window limitations and mitigation strategies",
      url: "https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html",
    },
    {
      title: "Context Engineering: What it is, and techniques to consider",
      description: "Deep dive into context engineering strategies and best practices",
      url: "https://www.llamaindex.ai/blog/context-engineering-what-it-is-and-techniques-to-consider",
    },
    {
      title: "Context Engineering for Agents",
      description: "LangChain's perspective on context management for AI agents",
      url: "https://blog.langchain.com/context-engineering-for-agents/",
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Platform Overview */}
          <div>
            <h3 className="font-semibold text-lg mb-4 gradient-text">
              AI Development Platform
            </h3>
            <p className="text-muted-foreground mb-4">
              Your complete platform for mastering AI-powered development. From learning fundamentals to using production-ready tools.
            </p>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Platform Home
              </Link>
              <Link to="/blueprint" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Learning Blueprint
              </Link>
              <Link to="/tools" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                AI Tools
              </Link>
            </div>
          </div>

          {/* Blueprint Resources */}
          <div>
            <h4 className="font-semibold mb-4">Blueprint Resources</h4>
            <div className="space-y-3">
              {references.slice(0, 4).map((ref, index) => (
                <a
                  key={index}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start space-x-2 text-sm"
                >
                  <ExternalLink className="h-3 w-3 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  <div className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                    {ref.title}
                  </div>
                </a>
              ))}
              <Link to="/blueprint" className="text-sm text-primary hover:underline">
                View all resources →
              </Link>
            </div>
          </div>

          {/* Tools & Community */}
          <div>
            <h4 className="font-semibold mb-4">Tools & Community</h4>
            <div className="space-y-2">
              <Link to="/tools" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                AI-Powered Tools
              </Link>
              <Link to="/api-test" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                API Testing
              </Link>
              <a 
                href="https://github.com/Lazymindz/agentic-coding-blueprint" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub Repository
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Built with ❤️ for the developer community
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Agentic Coding Guide. Open source and community driven.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary animated-link">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary animated-link">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary animated-link">
                License
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};