import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { slidesData } from "@/data/slides";
import { ArrowRight, Clock, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const SlideCard = ({ slide, index }: { slide: any, index: number }) => (
  <Link to={`/blueprint/slide/${index + 1}`}>
    <Card className="h-full bg-gray-900/50 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 cursor-pointer group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="bg-blue-600 text-white">
            Slide {index + 1}
          </Badge>
          <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
        </div>
        <h3 className="font-bold text-white text-lg mb-3 group-hover:text-blue-300 transition-colors">
          {slide.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {slide.description}
        </p>
      </div>
    </Card>
  </Link>
);

export default function BlueprintHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 leading-tight">
                Developer's Guide to<br />Agentic Coding
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                Master the art of AI-powered software development with our comprehensive, 
                interactive guide covering everything from fundamentals to production-ready principles.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-blue-200">
                  <Clock className="w-5 h-5" />
                  <span>45 min read</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <Users className="w-5 h-5" />
                  <span>All skill levels</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <Award className="w-5 h-5" />
                  <span>Production-ready</span>
                </div>
              </div>

              <Link to="/blueprint/slide/1">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white text-lg px-8 py-3">
                  Start Learning
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Slides Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              Interactive Learning Path
            </h2>
            <p className="text-center text-blue-100 mb-12 max-w-3xl mx-auto">
              Follow our carefully crafted curriculum that takes you from understanding 
              the fundamental mindset shift to implementing production-ready AI systems.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {slidesData.map((slide, index) => (
                <SlideCard key={index} slide={slide} index={index} />
              ))}
            </div>

            {/* Learning Outcomes */}
            <div className="bg-gray-900/30 rounded-xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                What You'll Learn
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-300 mb-3">Core Concepts</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• The new mindset: You're the architect</li>
                    <li>• Context engineering fundamentals</li>
                    <li>• The iterative loop workflow</li>
                    <li>• Common pitfalls and how to avoid them</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-300 mb-3">Advanced Topics</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Architectural patterns for AI systems</li>
                    <li>• 12-Factor agent principles</li>
                    <li>• Production deployment strategies</li>
                    <li>• Best practices and golden rules</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}