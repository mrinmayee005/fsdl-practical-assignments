import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerLinks = {
  shop: [
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Sarees', href: '/category/sarees' },
    { name: 'Kurtas', href: '/category/kurtas' },
    { name: 'Lehengas', href: '/category/lehengas' },
    { name: 'Jewelry', href: '/category/jewelry' },
    { name: "Men's Wear", href: '/category/mens' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Artisans', href: '/artisans' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Press', href: '/press' },
    { name: 'Careers', href: '/careers' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-3xl lg:text-4xl font-semibold mb-4">
              Join the Bombay Button Family
            </h3>
            <p className="font-body text-primary-foreground/80 mb-6">
              Subscribe for exclusive offers, new arrivals, and styling tips from our curators.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 font-body text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
              />
              <Button className="bg-gold hover:bg-gold/90 text-foreground font-body font-medium px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-3xl font-bold">Bombay Button</span>
            </Link>
            <p className="font-body text-primary-foreground/80 mb-6 max-w-sm">
              Celebrating the rich heritage of Indian craftsmanship. Handpicked collections from 
              artisans across India, bringing timeless elegance to your wardrobe.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-foreground transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-foreground transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-foreground transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-foreground transition-all">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-body text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-body text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-gold" />
                <span className="font-body text-primary-foreground/70 text-sm">
                  123 Fashion Street, Colaba<br />Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold" />
                <span className="font-body text-primary-foreground/70 text-sm">
                  +91 22 1234 5678
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <span className="font-body text-primary-foreground/70 text-sm">
                  hello@bombaybutton.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-primary-foreground/60">
              © 2024 Bombay Button. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="font-body text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="font-body text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
