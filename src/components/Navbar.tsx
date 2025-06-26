
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
              alt="Elismet LTD" 
              className="h-10" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/custom-solution" className="text-gray-700 hover:text-blue-600 transition-colors">
              Solutions
            </Link>
            <Link to="/multi-channel-support" className="text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link to="/contact-direct" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link to="/get-started">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link to="/custom-solution" className="text-gray-700 hover:text-blue-600 transition-colors">
                Solutions
              </Link>
              <Link to="/multi-channel-support" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link to="/contact-direct" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
              <Link to="/get-started">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
