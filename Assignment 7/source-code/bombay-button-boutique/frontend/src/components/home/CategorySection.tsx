import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export const CategorySection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="font-body text-gold text-sm uppercase tracking-[0.2em]">
            Explore
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mt-2">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="font-display text-lg lg:text-xl font-semibold text-cream mb-1">
                  {category.name}
                </h3>
                <p className="font-body text-sm text-cream/70">
                  {category.count} Items
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-body text-primary hover:text-gold transition-colors group"
          >
            View All Categories
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
