import { ArrowRight, ArrowLeft, Crown, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const Slide02 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container py-16">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate("/slide/1")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm text-muted-foreground">02 / 11</span>
          </div>
          <Button onClick={() => navigate("/slide/3")}>
            Next Slide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Slide Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full border border-border/40 bg-card/50 px-3 py-1 text-sm font-mono mb-6">
              <span className="text-primary">02</span>
              <span className="mx-2 text-border">•</span>
              <span className="text-muted-foreground">The New Mindset</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              You're the{" "}
              <span className="gradient-text">Architect</span>
            </h1>
            
            <div className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              <p className="mb-4">
                <strong className="text-foreground">The AI is your new co-worker. Treat it like one.</strong>
              </p>
              <p>
                It's a brilliant, fast, but junior developer. It needs your guidance and expertise.
              </p>
            </div>
          </div>

          {/* Your New Role */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8 gradient-text">Your New Role:</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="slide-card group">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Crown className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Senior Architect</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You design the system and break down complex problems into smaller, manageable tasks.
                  </p>
                </CardContent>
              </Card>

              <Card className="slide-card group">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10">
                      <Eye className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">Project Manager</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You provide the AI with the right context, resources, and instructions.
                  </p>
                </CardContent>
              </Card>

              <Card className="slide-card group">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Quality Assurance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You review the AI's work, provide feedback, and ensure the final output meets the required standards.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Message */}
          <Card className="bg-gradient-card border-accent/20">
            <CardContent className="p-8 text-center">
              <div className="text-3xl font-bold mb-4">
                <span className="gradient-text">Your most important job is to be the human-in-the-loop.</span>
              </div>
              <p className="text-lg text-muted-foreground">
                The AI provides the speed and capability, but you provide the wisdom, judgment, and strategic direction.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};