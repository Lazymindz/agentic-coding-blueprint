import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Settings, Code, Database, Wrench, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { slideSEOData } from "@/data/seoData";

const Slide08 = () => {
  const seo = slideSEOData[8];
  
  const principles = [
    {
      number: 1,
      title: "Natural Language to Tool Calls",
      description: "Translate requests into structured JSON your application can execute.",
      icon: <Code className="w-6 h-6" />
    },
    {
      number: 2,
      title: "Own Your Prompts",
      description: "Treat prompts as first-class code. Version and test them.",
      icon: <Settings className="w-6 h-6" />
    },
    {
      number: 3,
      title: "Own Your Context Window",
      description: "You are the context engineer. Control what goes in and out.",
      icon: <Database className="w-6 h-6" />
    },
    {
      number: 4,
      title: "Tools Are Just Structured Outputs",
      description: "Think of tools as a way for the LLM to give you structured JSON.",
      icon: <Wrench className="w-6 h-6" />
    },
    {
      number: 5,
      title: "Own Your Control Flow",
      description: "Implement your own loops, error handling, and state management.",
      icon: <Settings className="w-6 h-6" />
    },
    {
      number: 6,
      title: "Small, Focused Agents",
      description: "Decompose complex tasks into smaller, single-purpose agents.",
      icon: <Target className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl="https://aiproof.me/slide/8"
      />
      <Header />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/slide/7">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            </Link>
            <div className="flex gap-2">
              <Badge variant="secondary">Slide 8 of 11</Badge>
              <Badge variant="outline">12-Factor (Part 1)</Badge>
            </div>
            <Link to="/slide/9">
              <Button variant="outline" size="sm" className="gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Slide Content */}
          <Card className="border-primary/20">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">The 12-Factor-Agents</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                First six principles for building robust, production-ready AI agents
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center mb-8 p-6 bg-card/50 border border-primary/20 rounded-lg">
                <p className="text-lg">
                  These principles apply within the patterns above to create robust agents.
                </p>
              </div>

              {/* Principles 1-6 */}
              <div className="space-y-6">
                {principles.map((principle) => (
                  <div key={principle.number} className="flex items-start gap-4 p-6 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                        {principle.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-primary">
                          {principle.icon}
                        </div>
                        <h3 className="font-semibold text-lg">{principle.title}</h3>
                      </div>
                      <p className="text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

  
              {/* Key Insights */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-primary">🏗️ Foundation First</h4>
                  <p className="text-sm text-muted-foreground">
                    These first 6 principles establish the fundamental architecture and control mechanisms for reliable agents.
                  </p>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-primary">🔧 Developer Control</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain control over prompts, context, and execution flow rather than relying on black-box frameworks.
                  </p>
                </div>
              </div>

              {/* Continuation hint */}
              <div className="text-center p-6 bg-muted/20 rounded-lg border border-border">
                <p className="text-muted-foreground">
                  Continue to the next slide for principles 7-12 covering state management, error handling, and deployment.
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

export default Slide08;