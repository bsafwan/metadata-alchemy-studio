
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <img 
              src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
              alt="Elismet LTD" 
              className="h-12 mx-auto md:mx-0" 
            />
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-end">
            <Link to="/" className="hover:text-elismet-lightBlue transition-colors">Home</Link>
            <Link to="/#projects" className="hover:text-elismet-lightBlue transition-colors">Projects</Link>
            <Link to="/#about" className="hover:text-elismet-lightBlue transition-colors">About</Link>
            <Link to="/#contact" className="hover:text-elismet-lightBlue transition-colors">Contact</Link>
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
