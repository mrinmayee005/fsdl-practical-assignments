import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Building2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Order, ShippingAddress } from '@/types/order';
import { z } from 'zod';

const shippingSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  address: z.string().trim().min(10, 'Address must be at least 10 characters').max(200),
  city: z.string().trim().min(2, 'City is required').max(50),
  state: z.string().trim().min(2, 'State is required').max(50),
  pincode: z.string().trim().regex(/^\d{6}$/, 'Enter valid 6-digit pincode'),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const subtotal = totalPrice;
  const shipping = subtotal > 2000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    const result = shippingSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: 'Please fix the errors',
        description: 'Some fields have invalid values.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: `BB${Date.now().toString().slice(-8)}`,
      items: [...items],
      shippingAddress: formData,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod,
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    // Store order in localStorage for the bill page
    localStorage.setItem('bombay-button-last-order', JSON.stringify(order));
    
    clearCart();
    setIsProcessing(false);
    
    navigate(`/order-confirmation/${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="font-display text-2xl">Your cart is empty</h1>
        <Button onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-display text-2xl font-bold">Checkout</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <div className="bg-background rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-xl font-semibold mb-6">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="fullName" className="font-body">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={errors.fullName ? 'border-destructive' : ''}
                  />
                  {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="font-body">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="font-body">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address" className="font-body">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House no, Street, Locality"
                    className={errors.address ? 'border-destructive' : ''}
                  />
                  {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                </div>
                <div>
                  <Label htmlFor="city" className="font-body">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className={errors.city ? 'border-destructive' : ''}
                  />
                  {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <Label htmlFor="state" className="font-body">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className={errors.state ? 'border-destructive' : ''}
                  />
                  {errors.state && <p className="text-destructive text-sm mt-1">{errors.state}</p>}
                </div>
                <div>
                  <Label htmlFor="pincode" className="font-body">Pincode *</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    className={errors.pincode ? 'border-destructive' : ''}
                  />
                  {errors.pincode && <p className="text-destructive text-sm mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-background rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-xl font-semibold mb-6">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className={`flex items-center gap-4 p-4 rounded-lg border ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-body font-medium">Credit / Debit Card</p>
                      <p className="font-body text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                    </div>
                  </Label>
                </div>
                <div className={`flex items-center gap-4 p-4 rounded-lg border ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Wallet className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-body font-medium">UPI</p>
                      <p className="font-body text-sm text-muted-foreground">GPay, PhonePe, Paytm</p>
                    </div>
                  </Label>
                </div>
                <div className={`flex items-center gap-4 p-4 rounded-lg border ${paymentMethod === 'netbanking' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Label htmlFor="netbanking" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-body font-medium">Net Banking</p>
                      <p className="font-body text-sm text-muted-foreground">All major banks supported</p>
                    </div>
                  </Label>
                </div>
                <div className={`flex items-center gap-4 p-4 rounded-lg border ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                    <span className="h-5 w-5 flex items-center justify-center text-primary font-bold">₹</span>
                    <div>
                      <p className="font-body font-medium">Cash on Delivery</p>
                      <p className="font-body text-sm text-muted-foreground">Pay when you receive</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="font-body text-xs text-muted-foreground">
                        Qty: {item.quantity}
                        {item.selectedSize && ` | ${item.selectedSize}`}
                      </p>
                      <p className="font-body text-sm font-semibold text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald' : ''}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-display text-lg font-semibold mb-6">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
              </Button>

              <p className="font-body text-xs text-muted-foreground text-center mt-4">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
