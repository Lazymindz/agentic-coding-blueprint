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
  <Card className="slide-card h-full">
    <CardHeader>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 border-8 border-black ${status === 'available' ? 'color-accent-blue' : 'color-accent-yellow'}`}>
          <Icon className="w-8 h-8 text-black" />
        </div>
        <span 
          className={`px-3 py-1 font-black uppercase text-xs border-4 border-black ${
            status === 'available' 
              ? 'bg-accent text-accent-foreground' 
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {status === 'available' ? 'AVAILABLE' : 'COMING SOON'}
        </span>
      </div>
      <CardTitle className="font-black uppercase tracking-tighter text-xl">{title}</CardTitle>
      <CardDescription className="font-mono uppercase text-xs mt-2">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="font-mono text-sm space-y-1 mb-6 list-none">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="color-accent-red w-2 h-2 border-2 border-black mr-3 flex-shrink-0"></span>
            {feature}
          </li>
        ))}
      </ul>
      {status === 'available' && href ? (
        <Link to={href}>
          <button className="brutal-button bg-secondary text-secondary-foreground w-full">
            TRY NOW
          </button>
        </Link>
      ) : (
        <button className="brutal-button bg-muted text-muted-foreground w-full" disabled>
          COMING SOON
        </button>
      )}
    </CardContent>
  </Card>
);

export default function ToolsHome() {
  const tools = [
    {
      title: "Text Humanizer",
      description: "Transform stiff, robotic text into natural, engaging professional communication",
      icon: Type,
      status: 'available' as const,
      href: "/tools/text-humanizer",
      features: [
        "Perfect for emails and reports",
        "Professional tone adjustment", 
        "Maintains your key message",
        "Multiple communication styles",
        "Instant improvements"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          {/* Bauhaus geometric elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-16 h-16 color-accent-red border-4 border-black rotate-45" />
            <div className="absolute bottom-20 left-10 w-20 h-20 color-accent-blue border-4 border-black -rotate-12" />
            <div className="absolute top-1/3 left-1/4 w-12 h-12 color-accent-yellow border-4 border-black" />
          </div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 uppercase">
                DAILY AI<br />ASSISTANTS
              </h1>
              <p className="text-xl md:text-2xl font-mono mb-8 max-w-4xl mx-auto leading-relaxed uppercase">
                PRACTICAL AI TOOLS TO BOOST YOUR DAILY PRODUCTIVITY AND WORKFLOW. 
                SEAMLESSLY ENHANCE YOUR PROFESSIONAL TASKS WITH INTELLIGENT ASSISTANCE.
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="color-accent-red border-4 border-black p-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-black uppercase text-sm">INSTANT RESULTS</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="color-accent-blue border-4 border-black p-3">
                    <Shield className="w-6 h-6 text-black" />
                  </div>
                  <span className="font-black uppercase text-sm">USER FRIENDLY</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="color-accent-yellow border-4 border-black p-3">
                    <Clock className="w-6 h-6 text-black" />
                  </div>
                  <span className="font-black uppercase text-sm">TIME SAVING</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
                YOUR PRODUCTIVITY TOOLKIT
              </h2>
              <p className="font-mono uppercase max-w-3xl mx-auto">
                SMART AI ASSISTANTS DESIGNED TO ENHANCE YOUR DAILY WORK. 
                BOOST EFFICIENCY AND SAVE TIME ON ROUTINE TASKS. MORE TOOLS COMING SOON.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {tools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}