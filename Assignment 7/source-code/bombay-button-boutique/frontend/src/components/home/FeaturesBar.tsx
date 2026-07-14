import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders above ₹2999',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '15-day hassle-free returns',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer care',
  },
];

export const FeaturesBar = () => {
  return (
    <section className="py-8 lg:py-12 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <feature.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
