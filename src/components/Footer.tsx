
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <img 
              src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
              alt="Elismet LTD" 
              className="h-10 mb-4 filter brightness-0 invert" 
            />
            <p className="text-gray-400 max-w-md">
              Professional software development company creating custom solutions for businesses worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <div className="space-y-2">
              <Link to="/custom-solution" className="block text-gray-400 hover:text-white transition-colors">
                Custom Solutions
              </Link>
              <Link to="/multi-channel-support" className="block text-gray-400 hover:text-white transition-colors">
                Multi-Channel Support
              </Link>
              <Link to="/ai-customer-onboarding" className="block text-gray-400 hover:text-white transition-colors">
                AI Onboarding
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <div className="space-y-2">
              <Link to="/contact-direct" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link to="/get-started" className="block text-gray-400 hover:text-white transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Elismet LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
