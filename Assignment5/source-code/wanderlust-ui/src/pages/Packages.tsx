import Layout from '@/components/Layout';
import PackageCard from '@/components/PackageCard';
import { packages } from '@/data/packages';
import API from "../api/api";
const Packages = () => {
  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Travel Packages</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of travel experiences around the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Packages;
