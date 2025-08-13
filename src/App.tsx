import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ApiTest from "./pages/ApiTest";
import { Slide01 } from "./pages/slides/Slide01";
import { Slide02 } from "./pages/slides/Slide02";
import Slide03 from "./pages/slides/Slide03";
import Slide04 from "./pages/slides/Slide04";
import Slide05 from "./pages/slides/Slide05";
import Slide06 from "./pages/slides/Slide06";
import Slide07 from "./pages/slides/Slide07";
import Slide08 from "./pages/slides/Slide08";
import Slide09 from "./pages/slides/Slide09";
import Slide10 from "./pages/slides/Slide10";
import Slide11 from "./pages/slides/Slide11";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/api-test" element={<ApiTest />} />
          <Route path="/slide/1" element={<Slide01 />} />
          <Route path="/slide/2" element={<Slide02 />} />
          <Route path="/slide/3" element={<Slide03 />} />
          <Route path="/slide/4" element={<Slide04 />} />
          <Route path="/slide/5" element={<Slide05 />} />
          <Route path="/slide/6" element={<Slide06 />} />
          <Route path="/slide/7" element={<Slide07 />} />
          <Route path="/slide/8" element={<Slide08 />} />
          <Route path="/slide/9" element={<Slide09 />} />
          <Route path="/slide/10" element={<Slide10 />} />
          <Route path="/slide/11" element={<Slide11 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
