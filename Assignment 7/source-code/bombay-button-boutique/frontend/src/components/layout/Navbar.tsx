import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Sarees', href: '/category/sarees' },
  { name: 'Kurtas', href: '/category/kurtas' },
  { name: 'Lehengas', href: '/category/lehengas' },
  { name: 'Jewelry', href: '/category/jewelry' },
  { name: "Men's", href: '/category/mens' },
];

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('bombaybutton_user');
      setIsLoggedIn(!!user);
    };
    checkAuth();
    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-body">
        <p>✨ Free Shipping on Orders Above ₹2999 | Use Code: <span className="font-semibold">BOMBAY10</span> for 10% Off ✨</p>
      </div>

      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/" className="font-display text-2xl font-bold text-primary">
                  Bombay Button
                </Link>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-lg font-body text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-border pt-4">
                  <Link
                    to={isLoggedIn ? '/profile' : '/auth'}
                    className="flex items-center gap-2 text-lg font-body text-foreground hover:text-primary transition-colors"
                  >
                    <User className="h-5 w-5" />
                    {isLoggedIn ? 'My Account' : 'Login / Sign Up'}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl lg:text-3xl font-bold text-primary tracking-tight">
              Bombay Button
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-foreground hover:text-primary"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-foreground hover:text-primary"
            >
              <Heart className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-foreground hover:text-primary"
              onClick={handleUserClick}
            >
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground hover:text-primary"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gold text-foreground text-xs font-semibold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-border animate-slide-up">
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for sarees, kurtas, jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-24 rounded-lg border border-border bg-background font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                autoFocus
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button
                  type="submit"
                  size="sm"
                  className="font-body"
                >
                  Search
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </nav>
    </header>
  );
};
