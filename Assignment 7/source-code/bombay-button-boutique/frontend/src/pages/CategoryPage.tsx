import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCard } from '@/components/products/ProductCard';
import { getProductsByCategory, categories, products } from '@/data/products';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [sortBy, setSortBy] = useState('featured');
  
  const category = categories.find((c) => c.id === id);
  const categoryProducts = id ? getProductsByCategory(id) : products;

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return a.isNew ? -1 : 1;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CartDrawer />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-cream-dark py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {category?.name || 'All Products'}
            </h1>
            <p className="font-body text-muted-foreground">
              {sortedProducts.length} products found
            </p>
          </div>
        </div>

        {/* Filters and Products */}
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="font-body">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-body text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 font-body">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
