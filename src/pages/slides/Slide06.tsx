import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { slideSEOData } from "@/data/seoData";

const Slide06 = () => {
  const seo = slideSEOData[6];
  
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl="https://aiproof.me/slide/6"
      />
      <Header />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/slide/5">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            </Link>
            <div className="flex gap-2">
              <Badge variant="secondary">Slide 6 of 11</Badge>
              <Badge variant="outline">Best Practices</Badge>
            </div>
            <Link to="/slide/7">
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
                <span className="gradient-text">Best Practices</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Effective strategies for managing context and avoiding common pitfalls
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-4">How to manage context effectively:</h3>
              </div>

              {/* The Do's */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-6 rounded-lg bg-primary/5 border border-primary/20">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">DO be deliberate</h3>
                    <p className="text-muted-foreground">
                      Carefully select what you include in the context. Provide the full file structure and relevant library documentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-lg bg-primary/5 border border-primary/20">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">DO re-rank your documents</h3>
                    <p className="text-muted-foreground">
                      Move the most relevant information to the beginning or end of the context window to combat the "lost in the middle" problem.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-lg bg-primary/5 border border-primary/20">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">DO use small-to-large chunking</h3>
                    <p className="text-muted-foreground">
                      Retrieve small, specific chunks of information first, then expand the context as needed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-lg bg-primary/5 border border-primary/20">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">DO provide examples</h3>
                    <p className="text-muted-foreground">
                      Give the model a clear example of the desired output format. This is often more effective than describing it in words.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-lg bg-primary/5 border border-primary/20">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">DO use query transformations</h3>
                    <p className="text-muted-foreground">
                      Instead of using the user's raw query, transform it to be more effective for retrieval (e.g., HyDE, Multi-Query).
                    </p>
                  </div>
                </div>
              </div>

              {/* Context Ranking Visual */}
              <div className="bg-card/30 rounded-lg p-6 border border-border">
                <h4 className="text-lg font-semibold text-center mb-6">Optimal Context Arrangement</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span className="text-sm">Most Important Information (Beginning)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-muted rounded"></div>
                    <span className="text-sm">Supporting Context (Middle)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span className="text-sm">Critical Instructions (End)</span>
                  </div>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Pro-Tip:</h4>
                    <p className="text-muted-foreground mb-3">
                      Treat context as the primary subject of debugging. When an agent fails, inspect the <em>exact</em> context it received at that moment.
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      Was the right information missing, unclear, or buried?
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Insight */}
              <div className="bg-gradient-card border border-primary/20 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold gradient-text mb-3">
                  🎯 Context Engineering Success Formula
                </h3>
                <div className="grid gap-4 md:grid-cols-3 text-sm">
                  <div className="bg-card/50 p-4 rounded-lg">
                    <div className="font-semibold mb-2">Quality</div>
                    <div className="text-muted-foreground">Relevant, accurate information</div>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <div className="font-semibold mb-2">Structure</div>
                    <div className="text-muted-foreground">Logical, prioritized order</div>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <div className="font-semibold mb-2">Clarity</div>
                    <div className="text-muted-foreground">Clear, unambiguous instructions</div>
                  </div>
                </div>
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

export default Slide06;