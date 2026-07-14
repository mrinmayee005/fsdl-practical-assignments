import { useState } from 'react';
import { X, Minus, Plus, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickView = ({ product, isOpen, onClose }: ProductQuickViewProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
        <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 hover:bg-muted transition-colors">
          <X className="h-4 w-4" />
        </DialogClose>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6 lg:p-8 flex flex-col">
            <div className="flex-1">
              <p className="font-body text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="font-body text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="font-body text-sm font-medium text-emerald">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="font-body text-muted-foreground mb-6">
                {product.description}
              </p>

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="font-body text-sm font-medium text-foreground block mb-3">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] px-3 py-2 rounded border font-body text-sm transition-all ${
                          selectedSize === size
                            ? 'border-gold bg-gold/10 text-foreground'
                            : 'border-border hover:border-gold/50 text-muted-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="font-body text-sm font-medium text-foreground block mb-3">
                    Color: <span className="text-muted-foreground">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded border font-body text-sm transition-all ${
                          selectedColor === color
                            ? 'border-gold bg-gold/10 text-foreground'
                            : 'border-border hover:border-gold/50 text-muted-foreground'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="font-body text-sm font-medium text-foreground block mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-body">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-body"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-gold hover:text-gold"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
