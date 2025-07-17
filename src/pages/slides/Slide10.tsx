import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, X, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Slide10 = () => {
  const dos = [
    "DO be the architect and the reviewer.",
    "DO start simple and only add complexity when needed.",
    "DO iterate and refine.",
    "DO obsess over context.",
    "DO own your prompts and control flow.",
    "DO build small, focused, and stateless agents."
  ];

  const donts = [
    "DON'T blindly trust the AI's output.",
    "DON'T let your context get polluted.",
    "DON'T let a framework hide the important details from you."
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/slide/9">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            </Link>
            <div className="flex gap-2">
              <Badge variant="secondary">Slide 10 of 11</Badge>
              <Badge variant="outline">Takeaways</Badge>
            </div>
            <Link to="/slide/11">
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
                <span className="gradient-text">Key Takeaways</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Essential do's and don'ts with the fundamental principle that still matters
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* The Do's and Don'ts */}
              <div className="grid gap-8 md:grid-cols-2">
                {/* The Do's */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-primary flex items-center gap-3">
                    <CheckCircle className="w-8 h-8" />
                    The Do's
                  </h3>
                  <div className="space-y-3">
                    {dos.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* The Don'ts */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-destructive flex items-center gap-3">
                    <X className="w-8 h-8" />
                    The Don'ts
                  </h3>
                  <div className="space-y-3">
                    {donts.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                        <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* The Golden Rule */}
              <div className="bg-gradient-card border border-primary/20 rounded-lg p-8">
                <div className="text-center">
                  <Award className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold gradient-text mb-4">
                    The Golden Rule
                  </h3>
                  <div className="text-xl font-semibold mb-4">
                    Fundamentals Still Matter.
                  </div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    AI is a powerful tool, but it's not a replacement for strong software engineering skills. 
                    You still need to understand the code.
                  </p>
                </div>
              </div>

              {/* Core Principles Summary */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-6 rounded-lg bg-card/50 border border-primary/20">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏗️</span>
                  </div>
                  <h4 className="font-semibold mb-2">Architecture</h4>
                  <p className="text-sm text-muted-foreground">
                    Design the system, break down problems, be the senior architect.
                  </p>
                </div>

                <div className="text-center p-6 rounded-lg bg-card/50 border border-primary/20">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h4 className="font-semibold mb-2">Iteration</h4>
                  <p className="text-sm text-muted-foreground">
                    Prompt, review, refine, repeat. Continuous improvement cycle.
                  </p>
                </div>

                <div className="text-center p-6 rounded-lg bg-card/50 border border-primary/20">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h4 className="font-semibold mb-2">Context</h4>
                  <p className="text-sm text-muted-foreground">
                    Master context engineering. Quality in, quality out.
                  </p>
                </div>
              </div>

              {/* Success Formula */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-center mb-4 gradient-text">
                  🎯 Success Formula for Agentic Coding
                </h4>
                <div className="text-center text-sm text-muted-foreground space-y-2">
                  <p><strong>Human Expertise</strong> + <strong>AI Capability</strong> + <strong>Proper Context</strong> = <strong>Exceptional Results</strong></p>
                  <p className="italic">Remember: You're the conductor, AI is your orchestra.</p>
                </div>
              </div>

              {/* What's Next */}
              <div className="text-center p-6 bg-muted/20 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Ready to start your agentic coding journey?</h4>
                <p className="text-muted-foreground">
                  The next slide contains resources and references to dive deeper into the concepts covered in this presentation.
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

export default Slide10;