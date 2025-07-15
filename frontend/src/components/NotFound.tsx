import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="max-w-5xl px-4 mx-auto flex flex-col items-center justify-center min-h-[60vh] py-8">
      <div className="space-y-6 text-center max-w-md">
        <div className="relative">
          <span className="text-9xl font-bold text-primary/10">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold bg-background px-6 py-2 rounded-full border shadow-sm">
              Page Not Found
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Oops! Lost in the digital void
        </h1>
        
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild variant="outline" className="gap-1">
            <Link to="/">
              <ChevronLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <Button asChild>
            <Link to="/blog">
              Visit our blog
            </Link>
          </Button>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            Still stuck?{" "}
            <Link 
              to="/" 
              className="text-primary hover:underline underline-offset-4"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
