import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCard } from '@/components/products/ProductCard';
import { getNewArrivals, products } from '@/data/products';

const NewArrivalsPage = () => {
  const newProducts = getNewArrivals();
  const allProducts = newProducts.length > 0 ? newProducts : products.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CartDrawer />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-cream-dark py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <span className="font-body text-gold text-sm uppercase tracking-[0.2em]">
              Just Dropped
            </span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
              New Arrivals
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Discover our latest collections, featuring fresh designs and timeless craftsmanship 
              from artisans across India.
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewArrivalsPage;
