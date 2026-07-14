import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Headphones, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PackageCard from '@/components/PackageCard';
import { getFeaturedPackages } from '@/data/packages';

const Index = () => {
  const featuredPackages = getFeaturedPackages();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4 text-center text-background">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Discover Your Next
            <span className="block text-accent">Adventure</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Explore the world's most breathtaking destinations with our curated travel packages. 
            Your dream vacation is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages">
              <Button size="lg" className="gap-2">
                Explore Packages <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="bg-background/10 border-background text-background hover:bg-background hover:text-foreground">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Best Price Guarantee', desc: 'We match any competitor price' },
              { icon: Headphones, title: '24/7 Support', desc: 'Always here to help you' },
              { icon: Star, title: 'Trusted by Thousands', desc: '50,000+ happy travelers' },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-card rounded-xl shadow-sm">
                <div className="p-3 rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked travel experiences that will create memories to last a lifetime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.slice(0, 6).map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/packages">
              <Button size="lg" variant="outline" className="gap-2">
                View All Packages <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-ocean">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-xl mx-auto">
            Sign up today and get exclusive access to deals and early bird discounts.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="gap-2">
              Start Planning Today <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
