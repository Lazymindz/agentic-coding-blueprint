import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import BlueprintHome from "./pages/BlueprintHome";
import ToolsHome from "./pages/ToolsHome";
import NotFound from "./pages/NotFound";
import ApiTest from "./pages/ApiTest";
import SlideWrapper from "./components/SlideWrapper";
import LegacySlideRedirect from "./components/LegacySlideRedirect";
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
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          
          {/* Blueprint Section */}
          <Route path="/blueprint" element={<BlueprintHome />} />
          <Route path="/blueprint/slide/:slideNumber" element={<SlideWrapper />} />
          
          {/* Tools Section */}
          <Route path="/tools" element={<ToolsHome />} />
          
          {/* Legacy redirects - preserve existing links */}
          <Route path="/slide/:slideNumber" element={<LegacySlideRedirect />} />
          
          {/* Utility routes */}
          <Route path="/api-test" element={<ApiTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
