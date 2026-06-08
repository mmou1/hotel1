import { Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface RoomCardProps {
  title: string;
  capacity: number;
  image: string;
  description: string;
  slug: string;
}

export function RoomCard({ title, capacity, image, description, slug }: RoomCardProps) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-serif mb-2">{title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Users className="w-4 h-4 mr-1" />
          <span>{capacity} {capacity > 1 ? 'personnes' : 'personne'}</span>
        </div>
        <p className="text-sm text-foreground/70 mb-4 leading-relaxed">{description}</p>
        <Link to={`/chambres/${slug}`} className="flex items-center text-primary hover:text-primary/80 transition-colors group/btn">
          <span className="mr-1">Découvrir</span>
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
