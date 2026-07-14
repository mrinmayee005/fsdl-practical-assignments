import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { FeaturedProducts } from '@/components/products/FeaturedProducts';
import { FeaturesBar } from '@/components/home/FeaturesBar';
import { PromoBanner } from '@/components/home/PromoBanner';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturesBar />
        <CategorySection />
        <FeaturedProducts />
        <PromoBanner />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
