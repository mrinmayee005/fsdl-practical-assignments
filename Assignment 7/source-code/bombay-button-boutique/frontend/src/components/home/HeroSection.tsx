import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroBanner from '@/assets/hero-banner.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Luxurious Indian Fabrics"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-slide-up">
          <span className="inline-block font-body text-gold text-sm uppercase tracking-[0.3em] mb-4">
            New Collection 2024
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-cream leading-tight mb-6">
            Weaving Stories of
            <span className="text-gold block">Indian Heritage</span>
          </h1>
          <p className="font-body text-cream/80 text-lg lg:text-xl mb-8 max-w-lg">
            Discover handcrafted elegance from master artisans across India. 
            From timeless Banarasi sarees to contemporary fusion wear.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold/90 text-foreground font-body font-medium px-8 py-6 text-base"
            >
              <Link to="/new-arrivals">Explore Collection</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cream text-cream hover:bg-cream hover:text-foreground font-body font-medium px-8 py-6 text-base bg-transparent"
            >
              <Link to="/category/sarees">Shop Sarees</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className={`w-12 h-1 rounded-full ${i === 0 ? 'bg-gold' : 'bg-cream/30'}`}
          />
        ))}
      </div>
    </section>
  );
};
