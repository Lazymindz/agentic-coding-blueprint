import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Wrench, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950">
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Platform Sections */}
        <section id="platform-sections" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Your Complete AI Development Platform
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                From learning the fundamentals to building production-ready systems, 
                we provide everything you need for AI-powered development.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Blueprint Section */}
              <Card className="bg-gray-900/50 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Blueprint</CardTitle>
                  <CardDescription className="text-blue-100">
                    Master the fundamentals of agentic coding with our comprehensive guide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">
                    11 interactive slides covering everything from the new mindset to production principles. 
                    Learn context engineering, architectural patterns, and the 12-factor agent methodology.
                  </p>
                  <Link to="/blueprint">
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                      Start Learning <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Tools Section */}
              <Card className="bg-gray-900/50 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Tools</CardTitle>
                  <CardDescription className="text-purple-100">
                    Production-ready AI tools for your daily development workflow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">
                    Text humanizer, code reviewer, documentation generator, and more. 
                    Each tool built with BAML for reliability and type safety.
                  </p>
                  <Link to="/tools">
                    <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white">
                      Explore Tools <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* API Section */}
              <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-400/40 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">API Access</CardTitle>
                  <CardDescription className="text-green-100">
                    Integrate our AI capabilities into your own applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">
                    RESTful API with full documentation. Built on Hono and BAML 
                    for maximum performance and reliability.
                  </p>
                  <Link to="/api-test">
                    <Button className="w-full bg-green-600 hover:bg-green-500 text-white">
                      Test API <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Development Workflow?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are already using AI to write better code, 
                faster than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/blueprint">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white">
                    Start Learning
                  </Button>
                </Link>
                <Link to="/tools">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                    Try Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}