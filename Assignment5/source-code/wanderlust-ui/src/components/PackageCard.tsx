import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { TravelPackage } from '@/data/packages';

interface PackageCardProps {
  package: TravelPackage;
}

const PackageCard = ({ package: pkg }: PackageCardProps) => {
  const categoryColors = {
    beach: 'bg-ocean text-primary-foreground',
    mountain: 'bg-tropical text-primary-foreground',
    city: 'bg-accent text-accent-foreground',
    adventure: 'bg-coral text-primary-foreground',
    cultural: 'bg-primary text-primary-foreground',
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <Badge className={`absolute top-3 left-3 ${categoryColors[pkg.category]}`}>
          {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
        </Badge>
        {pkg.featured && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            Featured
          </Badge>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-background line-clamp-1">{pkg.name}</h3>
          <div className="flex items-center gap-1 text-background/80 text-sm">
            <MapPin className="h-3 w-3" />
            <span>{pkg.destination}, {pkg.country}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {pkg.shortDescription}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium">{pkg.rating}</span>
            <span className="text-muted-foreground">({pkg.reviews})</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <p className="text-xl font-bold text-primary">${pkg.price.toLocaleString()}</p>
          </div>
          <Link to={`/packages/${pkg.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
