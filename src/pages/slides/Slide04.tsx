import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Brain, Database, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Slide04 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/slide/3">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            </Link>
            <div className="flex gap-2">
              <Badge variant="secondary">Slide 4 of 11</Badge>
              <Badge variant="outline">Context</Badge>
            </div>
            <Link to="/slide/5">
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
                <span className="gradient-text">The Most Critical Concept</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Understanding context as the LLM's short-term memory and quality determinant
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center mb-8">
                <p className="text-lg mb-4">
                  Context is the LLM's <span className="font-semibold text-primary">"short-term memory."</span>
                </p>
                <p className="text-xl font-semibold gradient-text">
                  The quality of your context determines the quality of the output.
                </p>
              </div>

              {/* Context Components */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-center mb-6">What is Context?</h3>
                
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center p-6 rounded-lg bg-card/50 border border-primary/20">
                    <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-lg mb-3">System Prompt</h4>
                    <p className="text-muted-foreground text-sm">
                      The initial instructions, role, and tool definitions.
                    </p>
                  </div>

                  <div className="text-center p-6 rounded-lg bg-card/50 border border-primary/20">
                    <Database className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-lg mb-3">Retrieved Information (RAG)</h4>
                    <p className="text-muted-foreground text-sm">
                      Documents, code snippets, or other data you provide.
                    </p>
                  </div>

                  <div className="text-center p-6 rounded-lg bg-card/50 border border-primary/20">
                    <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-lg mb-3">Conversation History</h4>
                    <p className="text-muted-foreground text-sm">
                      The ongoing dialogue between you and the agent.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Insight */}
              <div className="bg-gradient-card border border-primary/20 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  Everything is Context Engineering.
                </h3>
                <p className="text-lg text-muted-foreground">
                  Mastering it is the key to success.
                </p>
              </div>

              {/* Context Flow Diagram */}
              <div className="bg-card/30 rounded-lg p-6 border border-border">
                <h4 className="text-lg font-semibold text-center mb-6">Context Flow</h4>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-center">System<br />Prompt</span>
                  </div>
                  <div className="text-muted-foreground">+</div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Database className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-center">Retrieved<br />Data</span>
                  </div>
                  <div className="text-muted-foreground">+</div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-center">Chat<br />History</span>
                  </div>
                  <div className="text-muted-foreground">=</div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">📋</span>
                    </div>
                    <span className="text-center font-semibold">Context<br />Window</span>
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

export default Slide04;