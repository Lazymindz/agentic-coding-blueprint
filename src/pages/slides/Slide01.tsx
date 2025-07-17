import { ArrowRight, ArrowLeft, Code, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const Slide01 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container py-16">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="animated-link">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Button>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm text-muted-foreground">01 / 11</span>
          </div>
          <Button onClick={() => navigate("/slide/2")}>
            Next Slide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Slide Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full border border-border/40 bg-card/50 px-3 py-1 text-sm font-mono mb-6">
              <span className="text-primary">01</span>
              <span className="mx-2 text-border">•</span>
              <span className="text-muted-foreground">Introduction</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Welcome to the Future of{" "}
              <span className="gradient-text">Software</span>
            </h1>
            
            <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              <p className="mb-4">
                <strong className="text-foreground">What is Agentic Coding?</strong>
              </p>
              <p>
                It's a new paradigm where developers collaborate with AI agents to build software. 
                Think of it as moving from a solo activity to a partnership.
              </p>
            </div>
          </div>

          {/* Key Points */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card className="slide-card">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">From Code Completion to Collaboration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Agents aren't just for finishing lines; they can write code, fix bugs, and build entire features.
                </p>
              </CardContent>
            </Card>

            <Card className="slide-card">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Focus on the "What," Not the "How"</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your job is to define the goal; the AI handles the implementation details.
                </p>
              </CardContent>
            </Card>

            <Card className="slide-card">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">The Next Evolution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This is as significant as the shift from assembly to high-level languages. Welcome to <strong className="text-primary">Software 3.0</strong>.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quote/Highlight */}
          <Card className="bg-gradient-card border-primary/20 mb-8">
            <CardContent className="p-8 text-center">
              <blockquote className="text-xl font-medium text-foreground mb-4">
                "Agentic coding is not about replacing developers—it's about <span className="gradient-text">amplifying their capabilities</span>."
              </blockquote>
              <cite className="text-muted-foreground">— The Future of Software Development</cite>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};