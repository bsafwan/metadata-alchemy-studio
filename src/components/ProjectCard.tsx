
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  status: 'upcoming' | 'established';
  tags: string[];
  imageUrl: string;
  direction?: 'left' | 'right';
  index: number;
}

const ProjectCard = ({
  title,
  description,
  status,
  tags,
  imageUrl,
  direction = 'left',
  index
}: ProjectCardProps) => {
  return (
    <div 
      className={cn(
        "relative flex flex-col lg:flex-row rounded-xl overflow-hidden card-hover",
        "bg-white shadow-md border border-slate-100",
        index % 2 === 0 ? "animate-slide-in-right" : "animate-slide-in-left"
      )}
      style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
    >
      <div 
        className={cn(
          "w-full lg:w-1/2 aspect-video lg:aspect-auto",
          direction === 'right' && "lg:order-2"
        )}
      >
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <Badge 
            className={cn(
              "text-xs font-semibold",
              status === 'established' 
                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
            )}
          >
            {status === 'established' ? 'Established' : 'Upcoming'}
          </Badge>
          
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <Button 
          variant="outline" 
          className="group w-fit border-elismet-blue text-elismet-blue hover:bg-elismet-blue hover:text-white flex items-center gap-2"
        >
          Learn more
          <ArrowRight 
            size={16} 
            className="transition-transform group-hover:translate-x-1"
          />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
