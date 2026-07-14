import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Absolutely stunning Banarasi saree! The quality of zari work is exceptional. Bombay Button has become my go-to for all ethnic wear.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Anjali Mehta',
    location: 'Delhi',
    rating: 5,
    text: 'The bridal lehenga I ordered was beyond my expectations. The craftsmanship and attention to detail made my wedding day perfect.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Kavya Reddy',
    location: 'Bangalore',
    rating: 5,
    text: 'Fast shipping and excellent customer service. The Chikankari kurta is so comfortable and elegantly designed. Highly recommend!',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop',
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="font-body text-gold text-sm uppercase tracking-[0.2em]">
            Happy Customers
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mt-2">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-lg p-6 lg:p-8 shadow-soft hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-body text-foreground/80 mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
