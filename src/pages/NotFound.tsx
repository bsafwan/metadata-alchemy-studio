
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Elismet Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
            alt="Elismet LTD" 
            className="h-16 mx-auto mb-4 animate-bounce" 
          />
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-elismet-blue mb-4 animate-pulse">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to="/">
            <Button className="bg-elismet-blue hover:bg-elismet-lightBlue text-white w-full group">
              <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Go to Homepage
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Link to="/get-started">
            <Button variant="outline" className="w-full border-elismet-blue text-elismet-blue hover:bg-elismet-blue hover:text-white group">
              Get Started with Elismet
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Need help? Contact our support team
          </p>
          <Link to="/contact-direct" className="text-elismet-blue hover:text-elismet-lightBlue underline font-medium">
            Contact Support
          </Link>
        </div>

        {/* Branding Footer */}
        <div className="mt-8 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Elismet LTD. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
