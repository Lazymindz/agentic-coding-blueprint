import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookOpen, Github, ExternalLink, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Slide11 = () => {
  const resources = [
    {
      title: "Essential Reading for Agentic Engineers",
      description: "Comprehensive reading list for developers entering the agentic coding space",
      url: "https://steipete.me/posts/2025/essential-reading",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "12-Factor-Agents GitHub",
      description: "Official repository with code examples and detailed explanations",
      url: "https://github.com/humanlayer/12-factor-agents",
      icon: <Github className="w-5 h-5" />
    },
    {
      title: "Anthropic's Claude Code Best Practices",
      description: "Official best practices for coding with Claude and other LLMs",
      url: "https://www.anthropic.com/engineering/claude-code-best-practices",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "Building Effective AI Agents",
      description: "Anthropic's engineering guide to building production-ready agents",
      url: "https://www.anthropic.com/engineering/building-effective-agents",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "How Long Contexts Fail and How to Fix Them",
      description: "Understanding context window limitations and mitigation strategies",
      url: "https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "Context Engineering: What it is, and techniques to consider",
      description: "Deep dive into context engineering strategies and best practices",
      url: "https://www.llamaindex.ai/blog/context-engineering-what-it-is-and-techniques-to-consider",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "Context Engineering for Agents",
      description: "LangChain's perspective on context management for AI agents",
      url: "https://blog.langchain.com/context-engineering-for-agents/",
      icon: <BookOpen className="w-5 h-5" />
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/slide/10">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            </Link>
            <div className="flex gap-2">
              <Badge variant="secondary">Slide 11 of 11</Badge>
              <Badge variant="outline">Resources</Badge>
            </div>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>

          {/* Slide Content */}
          <Card className="border-primary/20">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Your Journey Starts Here</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Resources and next steps to dive deeper into agentic development
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center mb-8 p-6 bg-card/50 border border-primary/20 rounded-lg">
                <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-lg mb-2">
                  This presentation is just the beginning.
                </p>
                <p className="text-muted-foreground">
                  To dive deeper, explore the source materials below:
                </p>
              </div>

              {/* Resources List */}
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="flex items-start gap-4 p-6 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/40 transition-all duration-200 hover:shadow-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {resource.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {resource.description}
                            </p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Learning Path */}
              <div className="bg-gradient-card border border-primary/20 rounded-lg p-8">
                <h3 className="text-xl font-semibold gradient-text mb-6 text-center">
                  🎯 Recommended Learning Path
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 bg-card/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                      1
                    </div>
                    <h4 className="font-semibold mb-2">Start Reading</h4>
                    <p className="text-sm text-muted-foreground">
                      Begin with "Essential Reading" and "Context Engineering" articles
                    </p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                      2
                    </div>
                    <h4 className="font-semibold mb-2">Experiment</h4>
                    <p className="text-sm text-muted-foreground">
                      Try the 12-Factor principles in a small project
                    </p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                      3
                    </div>
                    <h4 className="font-semibold mb-2">Build</h4>
                    <p className="text-sm text-muted-foreground">
                      Apply learnings to production systems
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-4 gradient-text">
                  Ready to Begin?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Start experimenting, keep learning, and remember: the best way to understand agentic coding is to practice it. 
                  Your journey into the future of software development begins now.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button asChild className="gap-2">
                    <a href="https://steipete.me/posts/2025/essential-reading" target="_blank" rel="noopener noreferrer">
                      <BookOpen className="w-4 h-4" />
                      Start Reading
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="gap-2">
                    <a href="https://github.com/humanlayer/12-factor-agents" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      View Code Examples
                    </a>
                  </Button>
                </div>
              </div>

              {/* Thank you message */}
              <div className="text-center p-6 bg-muted/20 rounded-lg border border-border">
                <h4 className="text-lg font-semibold mb-2">Thank You! 🙏</h4>
                <p className="text-muted-foreground">
                  Thank you for exploring this guide to agentic coding. May your AI partnerships be productive and your code be elegant.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Footer */}
          <div className="flex justify-center mt-8">
            <Link to="/">
              <Button variant="outline">Back to Overview</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Slide11;