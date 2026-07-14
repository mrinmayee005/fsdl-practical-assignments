import { ProductCard } from './ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturedProducts = () => {
  const products = getFeaturedProducts();

  return (
    <section className="py-16 lg:py-24 bg-cream-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-body text-gold text-sm uppercase tracking-[0.2em]">
              Curated Selection
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mt-2">
              Featured Collection
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-body text-primary hover:text-gold transition-colors group"
          >
            View All Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
