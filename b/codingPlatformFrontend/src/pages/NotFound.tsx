
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md mx-auto">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
          <Terminal className="h-8 w-8 text-primary" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Hmm, we couldn't find that page. It seems the code for this route doesn't compile.
        </p>
        
        <div className="mb-8 bg-code p-4 rounded-md text-left overflow-hidden">
          <pre className="font-mono text-sm text-code-error">
            <span className="text-code-keyword">Error</span>: Route not found at <span className="text-code-text">"{location.pathname}"</span>
            <br />
            <span className="text-code-comment">// The page you're looking for doesn't exist or has been moved.</span>
          </pre>
        </div>
        
        <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
