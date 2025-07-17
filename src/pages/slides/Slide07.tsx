import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, GitBranch, Workflow, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Slide07 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/slide/6">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            </Link>
            <div className="flex gap-2">
              <Badge variant="secondary">Slide 7 of 11</Badge>
              <Badge variant="outline">Architecture</Badge>
            </div>
            <Link to="/slide/8">
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
                <span className="gradient-text">Architectural Patterns</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Choosing between workflows and agents for predictable vs unpredictable tasks
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center mb-8 p-6 bg-card/50 border border-primary/20 rounded-lg">
                <p className="text-lg mb-2">
                  Now that you understand context, let's look at how to structure AI systems.
                </p>
                <p className="font-semibold gradient-text">
                  Favor simple, composable patterns over complex, monolithic agents.
                </p>
              </div>

              {/* Workflows vs Agents */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-center">Workflows vs. Agents</h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Workflow className="w-8 h-8 text-primary" />
                        <CardTitle className="text-xl">Workflows</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="font-semibold text-primary mb-2">Use for predictable tasks</p>
                          <p className="text-sm text-muted-foreground">
                            Orchestrate LLMs and tools with predefined code.
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ✅ Reliable, deterministic<br />
                          ✅ Easy to debug<br />
                          ✅ Performance optimized<br />
                          ❌ Less flexible
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <GitBranch className="w-8 h-8 text-primary" />
                        <CardTitle className="text-xl">Agents</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="font-semibold text-primary mb-2">Use for unpredictable tasks</p>
                          <p className="text-sm text-muted-foreground">
                            Let the LLM dynamically decide the steps and tools.
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ✅ Highly flexible<br />
                          ✅ Adaptive reasoning<br />
                          ❌ Harder to debug<br />
                          ❌ Less predictable
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Common Workflow Patterns */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-center">Common Workflow Patterns</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-6 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Prompt Chaining</h4>
                      <p className="text-muted-foreground">
                        Decompose a task into a sequence of steps. Each step feeds into the next.
                      </p>
                      <div className="mt-3 text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                        Input → Step 1 → Step 2 → Step 3 → Output
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Routing</h4>
                      <p className="text-muted-foreground">
                        Classify an input and direct it to a specialized tool or prompt.
                      </p>
                      <div className="mt-3 text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                        Input → Classifier → Route A | Route B | Route C
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Orchestrator-Workers</h4>
                      <p className="text-muted-foreground">
                        A central "orchestrator" LLM delegates tasks to specialized "worker" LLMs.
                      </p>
                      <div className="mt-3 text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                        Orchestrator → Worker 1 (Code) + Worker 2 (Docs) + Worker 3 (Tests)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transition to Production */}
              <div className="bg-gradient-card border border-primary/20 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold gradient-text mb-4">
                  Building for Production
                </h3>
                <p className="text-muted-foreground">
                  With these high-level patterns in mind, let's look at the specific principles for building production-ready agents.
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

export default Slide07;