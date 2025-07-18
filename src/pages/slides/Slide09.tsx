import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Database, RefreshCw, AlertCircle, Users, Play, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { slideSEOData } from "@/data/seoData";

const Slide09 = () => {
  const seo = slideSEOData[9];
  
  const principles = [
    {
      number: 7,
      title: "Unify Execution State and Business State",
      description: "Use a single, append-only log of events for the agent's state.",
      icon: <Database className="w-6 h-6" />
    },
    {
      number: 8,
      title: "Make Your Agent a Stateless Reducer",
      description: "Think of your agent as a function: (state, event) -> new_state.",
      icon: <RefreshCw className="w-6 h-6" />
    },
    {
      number: 9,
      title: "Compact Errors into Context Window",
      description: "Add errors to the context and let the LLM try to self-heal.",
      icon: <AlertCircle className="w-6 h-6" />
    },
    {
      number: 10,
      title: "Contact Humans with Tool Calls",
      description: "Use a dedicated tool to request human input.",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: 11,
      title: "Launch/Pause/Resume with Simple APIs",
      description: "Design simple APIs to control the agent's lifecycle.",
      icon: <Play className="w-6 h-6" />
    },
    {
      number: 12,
      title: "Trigger from Anywhere",
      description: "Decouple your agents from the UI so they can be triggered from anywhere.",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl="https://aiproof.me/slide/9"
      />
      <Header />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/slide/8">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            </Link>
            <div className="flex gap-2">
              <Badge variant="secondary">Slide 9 of 11</Badge>
              <Badge variant="outline">12-Factor-Agents (Part 2)</Badge>
            </div>
            <Link to="/slide/10">
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
                <span className="gradient-text">The 12-Factor Agent</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Final six principles covering state management, error handling, and deployment
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Principles 7-12 */}
              <div className="space-y-6">
                {principles.map((principle) => (
                  <div key={principle.number} className="flex items-start gap-4 p-6 rounded-lg bg-card/50 border border-primary/20">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                        {principle.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-primary">
                          {principle.icon}
                        </div>
                        <h3 className="font-semibold text-lg">{principle.title}</h3>
                      </div>
                      <p className="text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>


              {/* Key Categories */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-card/50 border border-primary/20 rounded-lg p-6">
                  <Database className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">State Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Principles 7-8 focus on managing agent state as immutable event logs and stateless reducers.
                  </p>
                </div>

                <div className="bg-card/50 border border-primary/20 rounded-lg p-6">
                  <AlertCircle className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">Error Handling</h4>
                  <p className="text-sm text-muted-foreground">
                    Principles 9-10 cover error recovery and human-in-the-loop patterns for robust operation.
                  </p>
                </div>

                <div className="bg-card/50 border border-primary/20 rounded-lg p-6">
                  <Zap className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">Deployment</h4>
                  <p className="text-sm text-muted-foreground">
                    Principles 11-12 ensure agents can be controlled and triggered from any environment.
                  </p>
                </div>
              </div>

              {/* Production readiness callout */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                <h4 className="text-lg font-semibold gradient-text mb-3">
                  🚀 Production-Ready Agents
                </h4>
                <p className="text-muted-foreground">
                  Following these 12 principles ensures your agents are reliable, maintainable, and scalable in production environments.
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

export default Slide09;