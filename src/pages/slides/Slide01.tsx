import { ArrowRight, ArrowLeft, Code, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { slideSEOData } from "@/data/seoData";

export const Slide01 = () => {
  const seo = slideSEOData[1];
  
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl="https://aiproof.me/slide/1"
      />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/blueprint">
              <button className="brutal-button-compact bg-secondary text-secondary-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO OVERVIEW
              </button>
            </Link>
            <div className="flex gap-2">
              <div className="px-3 py-1 font-black uppercase text-xs border-4 border-black bg-accent text-accent-foreground">SLIDE 1 OF 11</div>
              <div className="px-3 py-1 font-black uppercase text-xs border-4 border-black bg-secondary text-secondary-foreground">INTRODUCTION</div>
            </div>
            <Link to="/slide/2">
              <button className="brutal-button-compact bg-accent text-accent-foreground">
                NEXT
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
          </div>

          {/* Slide Content */}
          <Card className="slide-card border-8 border-black bg-background shadow-brutal">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Welcome to the Future of Software</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Understanding agentic coding as the evolution to Software 3.0
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center mb-8">
                <p className="text-lg text-muted-foreground mb-4">
                  <strong className="text-foreground">What is Agentic Coding?</strong>
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  It's a new paradigm where developers collaborate with AI agents to build software. 
                  Think of it as moving from a solo activity to a partnership.
                </p>
              </div>
            
              {/* Key Points */}
              <div className="grid gap-6 md:grid-cols-3 mb-8">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">From Code Completion to Collaboration</h3>
                    <p className="text-muted-foreground">
                      Agents aren't just for finishing lines; they can write code, fix bugs, and build entire features.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Focus on the "What," Not the "How"</h3>
                    <p className="text-muted-foreground">
                      Your job is to define the goal; the AI handles the implementation details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">The Next Evolution</h3>
                    <p className="text-muted-foreground">
                      This is as significant as the shift from assembly to high-level languages. Welcome to <strong className="text-primary">Software 3.0</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote/Highlight */}
              <div className="bg-gradient-card border-primary/20 rounded-lg p-6">
                <div className="text-center">
                  <blockquote className="text-xl font-medium text-foreground mb-4">
                    "Agentic coding is not about replacing developers—it's about <span className="gradient-text">amplifying their capabilities</span>."
                  </blockquote>
                  <cite className="text-muted-foreground">— The Future of Software Development</cite>
                </div>
              </div>
            
            </CardContent>
          </Card>

          {/* Navigation Footer */}
          <div className="flex justify-center mt-8">
            <Link to="/blueprint">
              <Button variant="outline">Back to Overview</Button>
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
};