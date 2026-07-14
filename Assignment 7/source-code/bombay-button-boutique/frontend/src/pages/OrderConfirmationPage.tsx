import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Download, Home, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/types/order';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const billRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('bombay-button-last-order');
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      if (parsedOrder.id === orderId) {
        setOrder({
          ...parsedOrder,
          orderDate: new Date(parsedOrder.orderDate),
          estimatedDelivery: new Date(parsedOrder.estimatedDelivery),
        });
      }
    }
  }, [orderId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const handlePrintBill = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="font-display text-2xl">Order not found</h1>
        <Button onClick={() => navigate('/')}>Go to Homepage</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/30">
      {/* Success Header */}
      <div className="bg-emerald/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald/20 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-emerald" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Order Placed Successfully!
          </h1>
          <p className="font-body text-muted-foreground">
            Thank you for shopping with Bombay Button
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Bill / Invoice */}
          <div ref={billRef} className="bg-background rounded-xl shadow-lg overflow-hidden print:shadow-none">
            {/* Bill Header */}
            <div className="bg-primary text-primary-foreground p-6 print:bg-primary print:text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-display text-2xl font-bold">BOMBAY BUTTON</h2>
                  <p className="font-body text-sm opacity-90">Premium Indian Fashion</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-semibold">INVOICE</p>
                  <p className="font-body text-sm opacity-90">#{order.orderNumber}</p>
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="p-6 grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-display font-semibold text-muted-foreground mb-2">Billed To</h3>
                <p className="font-body font-medium">{order.shippingAddress.fullName}</p>
                <p className="font-body text-sm text-muted-foreground">
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                  Phone: {order.shippingAddress.phone}<br />
                  Email: {order.shippingAddress.email}
                </p>
              </div>
              <div className="sm:text-right">
                <div className="space-y-1">
                  <p className="font-body text-sm">
                    <span className="text-muted-foreground">Order Date: </span>
                    <span className="font-medium">{formatDate(order.orderDate)}</span>
                  </p>
                  <p className="font-body text-sm">
                    <span className="text-muted-foreground">Payment Method: </span>
                    <span className="font-medium capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()}</span>
                  </p>
                  <p className="font-body text-sm">
                    <span className="text-muted-foreground">Est. Delivery: </span>
                    <span className="font-medium">{formatDate(order.estimatedDelivery)}</span>
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Items Table */}
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="font-display text-left py-3 text-sm font-semibold">Item</th>
                    <th className="font-display text-center py-3 text-sm font-semibold">Qty</th>
                    <th className="font-display text-right py-3 text-sm font-semibold">Price</th>
                    <th className="font-display text-right py-3 text-sm font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-14 object-cover rounded print:hidden"
                          />
                          <div>
                            <p className="font-body font-medium text-sm">{item.name}</p>
                            <p className="font-body text-xs text-muted-foreground">
                              {item.selectedSize && `Size: ${item.selectedSize}`}
                              {item.selectedSize && item.selectedColor && ' | '}
                              {item.selectedColor && `Color: ${item.selectedColor}`}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center font-body text-sm">{item.quantity}</td>
                      <td className="py-4 text-right font-body text-sm">{formatPrice(item.price)}</td>
                      <td className="py-4 text-right font-body text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="bg-muted/30 p-6">
              <div className="max-w-xs ml-auto space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={order.shipping === 0 ? 'text-emerald' : ''}>
                    {order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-display text-xl font-bold">
                  <span>Grand Total</span>
                  <span className="text-primary">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 text-center border-t border-border">
              <p className="font-body text-sm text-muted-foreground">
                Thank you for your purchase! For any queries, contact us at support@bombaybutton.com
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center print:hidden">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrintBill}
              className="font-body"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/')}
              className="font-body"
            >
              <Home className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </div>

          {/* Order Tracking Info */}
          <div className="mt-8 bg-background rounded-xl p-6 shadow-sm print:hidden">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-primary" />
              <h3 className="font-display text-lg font-semibold">What's Next?</h3>
            </div>
            <div className="space-y-3 font-body text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <p>You will receive an order confirmation email shortly.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <p>Our team will prepare your order for shipping within 1-2 business days.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <p>You'll receive tracking information once your order ships.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold shrink-0">4</span>
                <p>Estimated delivery by <strong>{formatDate(order.estimatedDelivery)}</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmationPage;
