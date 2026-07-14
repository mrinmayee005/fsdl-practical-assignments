import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Package, Heart, LogOut, Edit2, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '', address: '' });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('bombaybutton_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setEditForm({
        name: parsed.name || '',
        phone: parsed.phone || '',
        address: parsed.address || '',
      });
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('bombaybutton_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: editForm.name,
        phone: editForm.phone,
        address: editForm.address,
      };
      localStorage.setItem('bombaybutton_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }
  };

  if (!user) {
    return null;
  }

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-10',
      status: 'Delivered',
      total: 15999,
      items: 2,
    },
    {
      id: 'ORD002',
      date: '2024-01-05',
      status: 'In Transit',
      total: 8499,
      items: 1,
    },
  ];

  // Mock wishlist data
  const mockWishlist = [
    { id: '1', name: 'Banarasi Silk Saree', price: 12999, image: '/placeholder.svg' },
    { id: '3', name: 'Bridal Lehenga Set', price: 45999, image: '/placeholder.svg' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 lg:p-8 mb-8 text-primary-foreground">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gold/20 flex items-center justify-center">
                <User className="w-10 h-10 lg:w-12 lg:h-12" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="font-display text-2xl lg:text-3xl font-bold">{user.name}</h1>
                <p className="font-body text-primary-foreground/80">{user.email}</p>
                <p className="font-body text-sm text-primary-foreground/60 mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <Button
                variant="outline"
                className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="profile" className="font-body">Profile</TabsTrigger>
              <TabsTrigger value="orders" className="font-body">Orders</TabsTrigger>
              <TabsTrigger value="wishlist" className="font-body">Wishlist</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="bg-background rounded-xl border border-border p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold">Personal Information</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="font-body"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name" className="font-body">Full Name</Label>
                        <Input
                          id="edit-name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="font-body"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-phone" className="font-body">Phone Number</Label>
                        <Input
                          id="edit-phone"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder="+91 9876543210"
                          className="font-body"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-address" className="font-body">Address</Label>
                      <Input
                        id="edit-address"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        placeholder="Enter your address"
                        className="font-body"
                      />
                    </div>
                    <Button onClick={handleSaveProfile} className="font-body">
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-body text-sm text-muted-foreground">Full Name</p>
                        <p className="font-body font-medium">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-body text-sm text-muted-foreground">Email Address</p>
                        <p className="font-body font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-body text-sm text-muted-foreground">Phone Number</p>
                        <p className="font-body font-medium">{user.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-body text-sm text-muted-foreground">Address</p>
                        <p className="font-body font-medium">{user.address || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <div className="bg-background rounded-xl border border-border p-6 lg:p-8">
                <h2 className="font-display text-xl font-semibold mb-6">Order History</h2>
                {mockOrders.length > 0 ? (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <Package className="w-8 h-8 text-primary" />
                          <div>
                            <p className="font-body font-medium">Order #{order.id}</p>
                            <p className="font-body text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('en-IN')} • {order.items} item(s)
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-body font-semibold">₹{order.total.toLocaleString('en-IN')}</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded font-body ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="font-body text-muted-foreground">No orders yet</p>
                    <Button asChild className="mt-4 font-body">
                      <Link to="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <div className="bg-background rounded-xl border border-border p-6 lg:p-8">
                <h2 className="font-display text-xl font-semibold mb-6">Your Wishlist</h2>
                {mockWishlist.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {mockWishlist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-muted rounded-lg"
                      >
                        <div className="w-16 h-16 bg-cream rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-body font-medium line-clamp-1">{item.name}</p>
                          <p className="font-body text-primary font-semibold">
                            ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Heart className="w-4 h-4 fill-primary text-primary" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="font-body text-muted-foreground">Your wishlist is empty</p>
                    <Button asChild className="mt-4 font-body">
                      <Link to="/shop">Explore Products</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
