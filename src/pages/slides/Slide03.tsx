import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

const Slide03 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/slide/2">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            </Link>
            <div className="flex gap-2">
              <Badge variant="secondary">Slide 3 of 11</Badge>
              <Badge variant="outline">Workflow</Badge>
            </div>
            <Link to="/slide/4">
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
                <span className="gradient-text">The Core Workflow</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Master the continuous cycle of prompt, review, refine, and repeat
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center mb-8">
                <p className="text-lg text-muted-foreground mb-6">
                  Agentic coding is a continuous cycle of collaboration.
                </p>
              </div>

              {/* Workflow Steps */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Prompt</h3>
                      <p className="text-muted-foreground">
                        Give the AI a clear, specific, and context-rich task.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Review</h3>
                      <p className="text-muted-foreground">
                        Carefully examine the AI's output. Does it meet the requirements? Is it correct? Is it well-written?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Refine</h3>
                      <p className="text-muted-foreground">
                        Provide clear, concise feedback. Ask for changes, corrections, or improvements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Repeat</h3>
                      <p className="text-muted-foreground">
                        Continue this loop until you achieve the desired outcome.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cycle Visualization */}
              <div className="flex justify-center my-8">
                <div className="flex items-center gap-4 p-6 rounded-lg bg-gradient-card border border-primary/20">
                  <RefreshCcw className="w-8 h-8 text-primary animate-spin" style={{animationDuration: '3s'}} />
                  <span className="text-lg font-semibold gradient-text">The Iterative Loop</span>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    💡
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Pro-Tip:</h4>
                    <p className="text-muted-foreground">
                      Encourage the model to "think step by step" before writing code. This forces it to break down the problem and show its work, making it easier to debug its reasoning.
                    </p>
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

export default Slide03;