import React, { Suspense, lazy } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Lazy load slide components
const slideComponents = {
  '1': lazy(() => import("@/pages/slides/Slide01").then(m => ({ default: m.Slide01 }))),
  '2': lazy(() => import("@/pages/slides/Slide02").then(m => ({ default: m.Slide02 }))),
  '3': lazy(() => import("@/pages/slides/Slide03")),
  '4': lazy(() => import("@/pages/slides/Slide04")),
  '5': lazy(() => import("@/pages/slides/Slide05")),
  '6': lazy(() => import("@/pages/slides/Slide06")),
  '7': lazy(() => import("@/pages/slides/Slide07")),
  '8': lazy(() => import("@/pages/slides/Slide08")),
  '9': lazy(() => import("@/pages/slides/Slide09")),
  '10': lazy(() => import("@/pages/slides/Slide10")),
  '11': lazy(() => import("@/pages/slides/Slide11")),
};

export default function SlideWrapper() {
  const { slideNumber } = useParams<{ slideNumber: string }>();
  
  if (!slideNumber || !slideComponents[slideNumber as keyof typeof slideComponents]) {
    return <Navigate to="/blueprint" replace />;
  }
  
  const SlideComponent = slideComponents[slideNumber as keyof typeof slideComponents];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={
        <div className="container mx-auto px-6 py-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading slide...</p>
          </div>
        </div>
      }>
        <SlideComponent />
      </Suspense>
      <Footer />
    </div>
  );
}