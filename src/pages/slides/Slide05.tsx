import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, AlertTriangle, X } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { slideSEOData } from "@/data/seoData";

const Slide05 = () => {
  const seo = slideSEOData[5];
  
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl="https://aiproof.me/slide/5"
      />
      
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/slide/4">
              <button className="brutal-button-compact bg-secondary text-secondary-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                PREVIOUS
              </button>
            </Link>
            <div className="flex gap-2">
              <div className="px-3 py-1 font-black uppercase text-xs border-4 border-black bg-accent text-accent-foreground">Slide 5 of 11</div>
              <div className="px-3 py-1 font-black uppercase text-xs border-4 border-black bg-secondary text-secondary-foreground">Pitfalls</div>
            </div>
            <Link to="/slide/6">
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
                <span className="text-destructive">The #1 Pitfall</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Common context failures and the treacherous nature of large context windows
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center mb-8 p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <p className="text-lg">
                  Large context windows are <span className="font-semibold">powerful</span>, but they can be <span className="font-semibold text-destructive">treacherous</span>.
                </p>
                <p className="text-muted-foreground mt-2">Here's how they fail:</p>
              </div>

              {/* The Don'ts */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-6 rounded-lg bg-destructive/5 border border-destructive/20">
                  <X className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-destructive">DON'T let the context get poisoned</h3>
                    <p className="text-muted-foreground">
                      An early error or hallucination can be referenced repeatedly, leading the agent down a rabbit hole.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-lg bg-destructive/5 border border-destructive/20">
                  <X className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-destructive">DON'T let the context cause distraction</h3>
                    <p className="text-muted-foreground">
                      Too much information can cause the agent to over-focus on the history and ignore its core instructions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-lg bg-destructive/5 border border-destructive/20">
                  <X className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-destructive">DON'T let the context cause confusion</h3>
                    <p className="text-muted-foreground">
                      Irrelevant information can lead to low-quality or incorrect responses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-lg bg-destructive/5 border border-destructive/20">
                  <X className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-destructive">DON'T let the context clash</h3>
                    <p className="text-muted-foreground">
                      Conflicting information can cause the agent to make incorrect assumptions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lost in the Middle Problem */}
              <div className="bg-gradient-card border border-primary/20 rounded-lg p-8">
                <h3 className="text-xl font-semibold gradient-text mb-4 text-center">
                  ⚠️ "Lost in the Middle" Problem
                </h3>
                <p className="text-center text-muted-foreground">
                  A common symptom of these failures is the "lost in the middle" problem, where the LLM ignores information in the middle of a long context.
                </p>
                
                {/* Visual representation */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="w-16 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">
                    Start
                  </div>
                  <div className="w-32 h-8 bg-destructive/20 rounded flex items-center justify-center text-xs">
                    Lost Information
                  </div>
                  <div className="w-16 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">
                    End
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs text-muted-foreground">Context Window</span>
                </div>
              </div>

              {/* Warning Banner */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <AlertTriangle className="w-8 h-8 text-amber-500" />
                  <h4 className="text-xl font-semibold text-amber-600 dark:text-amber-400">
                    Context Management is Critical
                  </h4>
                </div>
                <p className="text-muted-foreground">
                  Poor context management is the #1 reason why AI agents fail in production.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Footer */}
          <div className="flex justify-center mt-8">
            <Link to="/blueprint">
              <button className="brutal-button-compact bg-secondary text-secondary-foreground">BACK TO OVERVIEW</button>
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Slide05;