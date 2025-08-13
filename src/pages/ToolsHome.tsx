import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, Clock, Type, Code2, FileText, TestTube, GitCommit } from "lucide-react";
import { Link } from "react-router-dom";

const ToolCard = ({ 
  title, 
  description, 
  icon: Icon, 
  status, 
  href, 
  features 
}: {
  title: string;
  description: string;
  icon: any;
  status: 'available' | 'coming-soon';
  href?: string;
  features: string[];
}) => (
  <Card className="h-full bg-gray-900/50 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
    <CardHeader>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition-colors">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <Badge 
          variant={status === 'available' ? 'default' : 'secondary'}
          className={status === 'available' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}
        >
          {status === 'available' ? 'Available' : 'Coming Soon'}
        </Badge>
      </div>
      <CardTitle className="text-xl text-white">{title}</CardTitle>
      <CardDescription className="text-purple-100">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="text-gray-300 text-sm space-y-1 mb-6">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
      {status === 'available' && href ? (
        <Link to={href}>
          <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white">
            Try Now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      ) : (
        <Button className="w-full" disabled>
          Coming Soon
        </Button>
      )}
    </CardContent>
  </Card>
);

export default function ToolsHome() {
  const tools = [
    {
      title: "Text Humanizer",
      description: "Transform AI-generated or robotic text into natural, human-like content",
      icon: Type,
      status: 'coming-soon' as const,
      href: "/tools/text-humanizer",
      features: [
        "Multiple style options (casual, professional, academic)",
        "Length control (preserve, expand, condense)", 
        "Technical term preservation",
        "Audience targeting",
        "Real-time processing"
      ]
    },
    {
      title: "Code Reviewer",
      description: "Intelligent code review with security, performance, and best practice analysis",
      icon: Code2,
      status: 'coming-soon' as const,
      features: [
        "Security vulnerability detection",
        "Performance optimization suggestions",
        "Code style and best practices",
        "Documentation improvement tips",
        "Multi-language support"
      ]
    },
    {
      title: "Documentation Generator",
      description: "Generate comprehensive documentation from your codebase automatically",
      icon: FileText,
      status: 'coming-soon' as const,
      features: [
        "README generation",
        "API documentation",
        "JSDoc comments",
        "Markdown formatting",
        "Multiple export formats"
      ]
    },
    {
      title: "Test Generator",
      description: "Create comprehensive test suites for your APIs and functions",
      icon: TestTube,
      status: 'coming-soon' as const,
      features: [
        "Unit test generation",
        "Integration test creation",
        "Test case discovery",
        "Multiple testing frameworks",
        "Coverage optimization"
      ]
    },
    {
      title: "Commit Message Writer",
      description: "Generate conventional commit messages from your code changes",
      icon: GitCommit,
      status: 'coming-soon' as const,
      features: [
        "Conventional commit format",
        "Diff analysis",
        "Semantic versioning integration",
        "Team consistency",
        "Git hook integration"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 leading-tight">
                AI-Powered<br />Developer Tools
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                Production-ready AI tools built with BAML for reliability, type safety, and performance. 
                Integrate seamlessly into your development workflow.
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-purple-200">
                  <Zap className="w-5 h-5" />
                  <span>Lightning Fast</span>
                </div>
                <div className="flex items-center gap-2 text-purple-200">
                  <Shield className="w-5 h-5" />
                  <span>Type Safe</span>
                </div>
                <div className="flex items-center gap-2 text-purple-200">
                  <Clock className="w-5 h-5" />
                  <span>Real-time</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Your Complete Toolkit
              </h2>
              <p className="text-purple-100 max-w-3xl mx-auto">
                Each tool is carefully crafted with production-ready principles, 
                comprehensive error handling, and seamless API integration.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {tools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>

            {/* API Access */}
            <div className="bg-gray-900/30 rounded-xl p-8 border border-purple-500/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  API Access Available
                </h3>
                <p className="text-purple-100 max-w-2xl mx-auto">
                  All tools are accessible via our REST API. Perfect for integrating 
                  into your existing development pipeline or building custom applications.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/api-test">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white">
                    Test API
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white">
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}