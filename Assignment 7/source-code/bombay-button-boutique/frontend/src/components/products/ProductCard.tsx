import { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductQuickView } from './ProductQuickView';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div
        className="group relative bg-card rounded-lg overflow-hidden hover-lift shadow-soft"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-emerald text-cream font-body text-xs px-2 py-1">
                New
              </Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-gold text-foreground font-body text-xs px-2 py-1">
                Bestseller
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-primary text-primary-foreground font-body text-xs px-2 py-1">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:text-primary hover:bg-background transition-all">
            <Heart className="h-4 w-4" />
          </button>

          {/* Quick actions */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/90 to-transparent transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-gold hover:bg-gold/90 text-foreground font-body"
                onClick={() => addToCart(product)}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-background/80 backdrop-blur-sm border-cream/30 text-cream hover:bg-cream hover:text-foreground"
                onClick={() => setIsQuickViewOpen(true)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="p-4">
          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-body text-lg font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-body text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1 mt-3">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color}
                  className="text-xs font-body text-muted-foreground"
                >
                  {color}
                  {product.colors!.indexOf(color) < Math.min(product.colors!.length - 1, 3) && ','}
                </span>
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs font-body text-muted-foreground">
                  +{product.colors.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <ProductQuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};
