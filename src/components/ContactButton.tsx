
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ContactButtonProps {
  source: string;
  className?: string;
  children?: React.ReactNode;
}

const ContactButton = ({ source, className = '', children = 'Get Your Custom Solution' }: ContactButtonProps) => {
  return (
    <Link to={`/contact-direct?source=${source}`}>
      <Button className={`bg-elismet-blue hover:bg-elismet-lightBlue text-white ${className}`}>
        {children}
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </Link>
  );
};

export default ContactButton;
