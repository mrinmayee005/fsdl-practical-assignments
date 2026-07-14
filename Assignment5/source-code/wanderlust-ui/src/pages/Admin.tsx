import { useState } from 'react';
import { Plus, Edit, Trash2, Package, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { packages } from '@/data/packages';
import { mockBookings } from '@/data/bookings';

const Admin = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Package saved!", description: "The package has been saved successfully." });
    setOpen(false);
  };

  const handleDelete = (name: string) => {
    toast({ title: "Package deleted", description: `${name} has been removed.`, variant: "destructive" });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-3xl font-bold">{packages.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-3xl font-bold">{mockBookings.length}</div></CardContent>
          </Card>
        </div>

        {/* Packages Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Manage Packages</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-2" /> Add Package</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>Add New Package</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                  <div><Label>Package Name</Label><Input placeholder="Maldives Paradise" /></div>
                  <div><Label>Destination</Label><Input placeholder="Maldives" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Price ($)</Label><Input type="number" placeholder="1999" /></div>
                    <div><Label>Duration</Label><Input placeholder="7 Days / 6 Nights" /></div>
                  </div>
                  <div><Label>Description</Label><Textarea placeholder="Package description..." /></div>
                  <div><Label>Image URL</Label><Input placeholder="https://..." /></div>
                  <Button onClick={handleSave} className="w-full">Save Package</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell><img src={pkg.image} alt={pkg.name} className="w-16 h-10 object-cover rounded" /></TableCell>
                    <TableCell className="font-medium">{pkg.name}</TableCell>
                    <TableCell>{pkg.destination}</TableCell>
                    <TableCell>${pkg.price.toLocaleString()}</TableCell>
                    <TableCell>{pkg.duration}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(pkg.name)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Admin;
