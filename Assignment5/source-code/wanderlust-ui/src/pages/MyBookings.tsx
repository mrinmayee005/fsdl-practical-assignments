import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { mockBookings } from '@/data/bookings';

const MyBookings = () => {
  const statusColors = {
    confirmed: 'bg-green-500',
    pending: 'bg-yellow-500',
    completed: 'bg-blue-500',
    cancelled: 'bg-red-500',
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        {mockBookings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">No bookings yet</p>
              <Link to="/packages"><Button>Browse Packages</Button></Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {mockBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-32 md:h-auto">
                    <img src={booking.image} alt={booking.packageName} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="flex-1 p-4 flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{booking.packageName}</h3>
                        <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4" /> {booking.destination}
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {booking.travelDate}</span>
                        <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {booking.travelers} travelers</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-primary">${booking.totalPrice.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Booked on {booking.bookedOn}</p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyBookings;
