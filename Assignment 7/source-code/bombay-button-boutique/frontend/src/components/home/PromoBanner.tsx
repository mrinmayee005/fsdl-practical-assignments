import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const PromoBanner = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 border border-primary-foreground rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border border-primary-foreground rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 border border-primary-foreground rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-4 block">
            Limited Time Offer
          </span>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Wedding Season Sale
          </h2>
          <p className="font-body text-xl text-primary-foreground/80 mb-8">
            Up to 50% off on bridal lehengas, wedding sarees, and complete trousseau collections. 
            Make your special day even more memorable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold/90 text-foreground font-body font-medium px-8 py-6"
            >
              <Link to="/sale">Shop Wedding Collection</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-body font-medium px-8 py-6 bg-transparent"
            >
              <Link to="/bridal">Bridal Lookbook</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
