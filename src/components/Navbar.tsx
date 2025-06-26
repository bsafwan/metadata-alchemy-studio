
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
                alt="Elismet LTD" 
                className="h-8" 
              />
              <span className="text-xl font-bold text-gray-900">Elismet</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/get-started" className="text-gray-700 hover:text-blue-600 transition-colors">
              Get Started
            </Link>
            <Link to="/custom-solution" className="text-gray-700 hover:text-blue-600 transition-colors">
              Custom Solution
            </Link>
            <Link to="/author" className="text-gray-700 hover:text-blue-600 transition-colors">
              Author
            </Link>
          </div>

          {/* Simple Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button size="sm">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/get-started">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/get-started" 
                className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
              <Link 
                to="/custom-solution" 
                className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Custom Solution
              </Link>
              <Link 
                to="/author" 
                className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Author
              </Link>
              
              <div className="border-t border-gray-200 mt-2 pt-2">
                {user ? (
                  <Link 
                    to="/dashboard" 
                    className="text-blue-600 font-medium px-4 py-2 block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link 
                    to="/get-started" 
                    className="text-blue-600 font-medium px-4 py-2 block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
