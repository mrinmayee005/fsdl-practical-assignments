import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Users, Mountain, Calendar, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { getPackageById } from '@/data/packages';

const PackageDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const pkg = getPackageById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(2);

  if (!pkg) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Package Not Found</h1>
          <Link to="/packages"><Button>Back to Packages</Button></Link>
        </div>
      </Layout>
    );
  }

  const handleBooking = () => {
    toast({
      title: "Booking Submitted!",
      description: `Your trip to ${pkg.destination} has been booked for ${travelers} travelers.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/packages" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Packages
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img src={pkg.gallery[selectedImage]} alt={pkg.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-2">
                {pkg.gallery.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 ${i === selectedImage ? 'border-primary' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge>{pkg.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium">{pkg.rating}</span>
                  <span className="text-muted-foreground">({pkg.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">{pkg.name}</h1>
              <p className="text-muted-foreground">{pkg.destination}, {pkg.country}</p>
            </div>

            <div className="flex flex-wrap gap-4 py-4 border-y">
              <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />{pkg.duration}</div>
              <div className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" />{pkg.groupSize}</div>
              <div className="flex items-center gap-2"><Mountain className="h-5 w-5 text-primary" />{pkg.difficulty}</div>
            </div>

            <div><h2 className="text-xl font-bold mb-3">Description</h2><p className="text-muted-foreground">{pkg.description}</p></div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-bold mb-3">Highlights</h2>
              <div className="grid grid-cols-2 gap-2">
                {pkg.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /><span>{h}</span></div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="text-xl font-bold mb-3">Itinerary</h2>
              <div className="space-y-3">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{day.day}</div>
                      <div><h3 className="font-semibold">{day.title}</h3><p className="text-sm text-muted-foreground">{day.description}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-3">Included</h2>
                {pkg.inclusions.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1"><Check className="h-4 w-4 text-green-500" /><span className="text-sm">{item}</span></div>
                ))}
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Not Included</h2>
                {pkg.exclusions.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1"><X className="h-4 w-4 text-red-500" /><span className="text-sm">{item}</span></div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-primary">${pkg.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground font-normal">per person</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div><Label>Travel Date</Label><Input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} /></div>
                <div><Label>Travelers</Label><Input type="number" min={1} max={10} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} /></div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2"><span>Total:</span><span className="text-2xl font-bold">${(pkg.price * travelers).toLocaleString()}</span></div>
                  <Button className="w-full" size="lg" onClick={handleBooking}><Calendar className="mr-2 h-4 w-4" />Book Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PackageDetails;
