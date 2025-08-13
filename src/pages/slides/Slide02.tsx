import { ArrowRight, ArrowLeft, Crown, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { slideSEOData } from "@/data/seoData";

export const Slide02 = () => {
  const seo = slideSEOData[2];
  
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl="https://aiproof.me/slide/2"
      />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/slide/1">
              <button className="brutal-button-compact bg-secondary text-secondary-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                PREVIOUS
              </button>
            </Link>
            <div className="flex gap-2">
              <div className="px-3 py-1 font-black uppercase text-xs border-4 border-black bg-accent text-accent-foreground">SLIDE 2 OF 11</div>
              <div className="px-3 py-1 font-black uppercase text-xs border-4 border-black bg-secondary text-secondary-foreground">MINDSET</div>
            </div>
            <Link to="/slide/3">
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
                <span className="gradient-text">You're the Architect</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                The AI is your new co-worker. Treat it like one.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center mb-8">
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  <strong className="text-foreground">The AI is your new co-worker. Treat it like one.</strong>
                  It's a brilliant, fast, but junior developer. It needs your guidance and expertise.
                </p>
              </div>

              {/* Your New Role */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-center mb-8 gradient-text">Your New Role:</h2>
                
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Crown className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">Senior Architect</h3>
                      <p className="text-muted-foreground">
                        You design the system and break down complex problems into smaller, manageable tasks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Eye className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">Project Manager</h3>
                      <p className="text-muted-foreground">
                        You provide the AI with the right context, resources, and instructions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">Quality Assurance</h3>
                      <p className="text-muted-foreground">
                        You review the AI's work, provide feedback, and ensure the final output meets the required standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Message */}
              <div className="bg-gradient-card border-accent/20 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-4">
                    <span className="gradient-text">Your most important job is to be the human-in-the-loop.</span>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    The AI provides the speed and capability, but you provide the wisdom, judgment, and strategic direction.
                  </p>
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