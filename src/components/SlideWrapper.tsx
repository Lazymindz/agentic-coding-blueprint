import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Slide01 } from "@/pages/slides/Slide01";
import { Slide02 } from "@/pages/slides/Slide02";
import Slide03 from "@/pages/slides/Slide03";
import Slide04 from "@/pages/slides/Slide04";
import Slide05 from "@/pages/slides/Slide05";
import Slide06 from "@/pages/slides/Slide06";
import Slide07 from "@/pages/slides/Slide07";
import Slide08 from "@/pages/slides/Slide08";
import Slide09 from "@/pages/slides/Slide09";
import Slide10 from "@/pages/slides/Slide10";
import Slide11 from "@/pages/slides/Slide11";

const slideComponents = {
  '1': Slide01,
  '2': Slide02,
  '3': Slide03,
  '4': Slide04,
  '5': Slide05,
  '6': Slide06,
  '7': Slide07,
  '8': Slide08,
  '9': Slide09,
  '10': Slide10,
  '11': Slide11,
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
      <SlideComponent />
      <Footer />
    </div>
  );
}