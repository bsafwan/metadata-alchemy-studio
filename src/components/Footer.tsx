
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      scrollToSection('projects');
    } else {
      window.location.href = '/#projects';
    }
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      scrollToSection('about');
    } else {
      window.location.href = '/#about';
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/">
              <img 
                src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
                alt="Elismet LTD" 
                className="h-12 mx-auto md:mx-0 hover:opacity-80 transition-opacity" 
              />
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-end">
            <Link to="/" className="hover:text-elismet-lightBlue transition-colors">Home</Link>
            <button 
              onClick={handleProjectsClick}
              className="hover:text-elismet-lightBlue transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={handleAboutClick}
              className="hover:text-elismet-lightBlue transition-colors"
            >
              About
            </button>
            <Link to="/contact-direct" className="hover:text-elismet-lightBlue transition-colors">Contact</Link>
            <Link to="/author" className="hover:text-elismet-lightBlue transition-colors">Team</Link>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-slate-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} Elismet LTD. All rights reserved.
            </p>
            <div className="flex gap-6 justify-center md:justify-end">
              <Link to="/privacy-policy" className="text-slate-400 hover:text-elismet-lightBlue transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-slate-400 hover:text-elismet-lightBlue transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
