import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AlertTriangle, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-20 flex items-center justify-center min-h-[70vh]">
        {/* Bauhaus geometric elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-16 h-16 color-accent-red border-4 border-black rotate-12" />
          <div className="absolute top-32 right-32 w-20 h-20 color-accent-blue border-4 border-black -rotate-12" />
          <div className="absolute bottom-20 left-32 w-12 h-12 color-accent-yellow border-4 border-black rotate-45" />
        </div>

        <div className="text-center relative z-10">
          <div className="inline-block color-accent-red border-8 border-black p-6 shadow-brutal mb-8">
            <AlertTriangle className="h-16 w-16 text-white" />
          </div>
          
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">404</h1>
          <p className="text-xl font-mono uppercase mb-8 max-w-md mx-auto">
            PAGE NOT FOUND IN THE AI ERA RESOURCE HUB
          </p>
          
          <Link to="/">
            <button className="brutal-button bg-accent text-accent-foreground">
              <Home className="mr-2 h-5 w-5" />
              RETURN TO HOME
            </button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
