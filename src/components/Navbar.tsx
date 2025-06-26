
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", action: () => window.location.pathname === '/' ? scrollToSection('home') : window.location.href = '/' },
    { label: "Projects", action: () => window.location.pathname === '/' ? scrollToSection('projects') : window.location.href = '/#projects' },
    { label: "About", action: () => window.location.pathname === '/' ? scrollToSection('about') : window.location.href = '/#about' },
    { label: "Contact", path: "/contact-direct" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-3",
        isScrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 animate-slide-down">
          <img 
            src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
            alt="Elismet LTD Logo" 
            className="h-12" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            link.path ? (
              <Link 
                key={link.label}
                to={link.path}
                className="text-foreground hover:text-elismet-blue transition-colors animated-link font-medium animate-slide-down"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={link.action}
                className="text-foreground hover:text-elismet-blue transition-colors animated-link font-medium animate-slide-down"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </button>
            )
          ))}
          {user ? (
            <Link to="/dashboard">
              <Button 
                className="bg-elismet-blue hover:bg-elismet-lightBlue text-white animate-slide-down"
                style={{ animationDelay: `${navLinks.length * 0.1}s` }}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/get-started">
              <Button 
                className="bg-elismet-blue hover:bg-elismet-lightBlue text-white animate-slide-down"
                style={{ animationDelay: `${navLinks.length * 0.1}s` }}
              >
                Get Started
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground hover:text-elismet-blue transition-colors"
          onClick={toggleMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 px-6 transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            link.path ? (
              <Link 
                key={link.label}
                to={link.path}
                className="text-xl font-medium text-foreground hover:text-elismet-blue transition-colors"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={link.action}
                className="text-xl font-medium text-foreground hover:text-elismet-blue transition-colors text-left"
              >
                {link.label}
              </button>
            )
          ))}
          {user ? (
            <Link to="/dashboard" onClick={toggleMenu}>
              <Button className="bg-elismet-blue hover:bg-elismet-lightBlue text-white w-full mt-4">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/get-started" onClick={toggleMenu}>
              <Button className="bg-elismet-blue hover:bg-elismet-lightBlue text-white w-full mt-4">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
