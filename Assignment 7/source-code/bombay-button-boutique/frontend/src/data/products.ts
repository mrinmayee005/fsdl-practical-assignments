import { Product, Category } from '@/types/product';

// Import product images
import sareeBanarasi from '@/assets/products/saree-banarasi.jpg';
import kurtaChikankari from '@/assets/products/kurta-chikankari.jpg';
import lehengaBridal from '@/assets/products/lehenga-bridal.jpg';
import jewelryKundan from '@/assets/products/jewelry-kundan.jpg';
import mensNehruJacket from '@/assets/products/mens-nehru-jacket.jpg';
import accessoryPotli from '@/assets/products/accessory-potli.jpg';
import sareePatola from '@/assets/products/saree-patola.jpg';
import kurtaAnarkali from '@/assets/products/kurta-anarkali.jpg';
import jewelryTemple from '@/assets/products/jewelry-temple.jpg';
import mensSherwani from '@/assets/products/mens-sherwani.jpg';
import accessoryDupatta from '@/assets/products/accessory-dupatta.jpg';
import accessoryJuttis from '@/assets/products/accessory-juttis.jpg';

// Import category images
import categorySarees from '@/assets/categories/sarees.jpg';
import categoryKurtas from '@/assets/categories/kurtas.jpg';
import categoryLehengas from '@/assets/categories/lehengas.jpg';
import categoryJewelry from '@/assets/categories/jewelry.jpg';
import categoryMens from '@/assets/categories/mens.jpg';
import categoryAccessories from '@/assets/categories/accessories.jpg';

export const categories: Category[] = [
  {
    id: 'sarees',
    name: 'Sarees',
    image: categorySarees,
    count: 156,
  },
  {
    id: 'kurtas',
    name: 'Kurtas',
    image: categoryKurtas,
    count: 234,
  },
  {
    id: 'lehengas',
    name: 'Lehengas',
    image: categoryLehengas,
    count: 89,
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    image: categoryJewelry,
    count: 312,
  },
  {
    id: 'mens',
    name: "Men's Wear",
    image: categoryMens,
    count: 178,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: categoryAccessories,
    count: 245,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Banarasi Silk Saree',
    price: 12999,
    originalPrice: 18999,
    image: sareeBanarasi,
    category: 'sarees',
    description: 'Exquisite handwoven Banarasi silk saree with intricate gold zari work. Perfect for weddings and special occasions.',
    sizes: ['Free Size'],
    colors: ['Red', 'Maroon', 'Green', 'Blue'],
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Cotton Chikankari Kurta',
    price: 2499,
    originalPrice: 3499,
    image: kurtaChikankari,
    category: 'kurtas',
    description: 'Elegant white cotton kurta with delicate Lucknowi Chikankari embroidery. Breathable and comfortable.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Cream', 'Light Pink'],
    isNew: true,
  },
  {
    id: '3',
    name: 'Bridal Lehenga Set',
    price: 45999,
    originalPrice: 65999,
    image: lehengaBridal,
    category: 'lehengas',
    description: 'Stunning bridal lehenga with heavy embroidery, mirror work, and intricate beadwork. Comes with matching choli and dupatta.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Red', 'Maroon', 'Pink'],
    isBestseller: true,
  },
  {
    id: '4',
    name: 'Kundan Jewelry Set',
    price: 8999,
    originalPrice: 12999,
    image: jewelryKundan,
    category: 'jewelry',
    description: 'Elegant Kundan jewelry set with necklace, earrings, and maang tikka. Handcrafted by skilled artisans.',
    colors: ['Gold', 'Rose Gold'],
    isNew: true,
  },
  {
    id: '5',
    name: 'Nehru Jacket',
    price: 4999,
    originalPrice: 6999,
    image: mensNehruJacket,
    category: 'mens',
    description: 'Classic Nehru jacket in premium fabric with subtle embroidery. Perfect for festive occasions.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Maroon', 'Beige'],
  },
  {
    id: '6',
    name: 'Embroidered Potli Bag',
    price: 1499,
    originalPrice: 2299,
    image: accessoryPotli,
    category: 'accessories',
    description: 'Handcrafted potli bag with traditional embroidery and beadwork. Perfect accessory for ethnic wear.',
    colors: ['Red', 'Gold', 'Green', 'Blue'],
    isBestseller: true,
  },
  {
    id: '7',
    name: 'Patola Silk Saree',
    price: 24999,
    originalPrice: 35999,
    image: sareePatola,
    category: 'sarees',
    description: 'Authentic Patola silk saree from Gujarat with geometric patterns. A collector\'s piece.',
    sizes: ['Free Size'],
    colors: ['Red', 'Green', 'Blue'],
    isNew: true,
  },
  {
    id: '8',
    name: 'Anarkali Suit Set',
    price: 5999,
    originalPrice: 8999,
    image: kurtaAnarkali,
    category: 'kurtas',
    description: 'Flowing Anarkali suit with threadwork embroidery. Comes with matching churidar and dupatta.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Teal', 'Maroon', 'Navy'],
  },
  {
    id: '9',
    name: 'Temple Jewelry Set',
    price: 15999,
    originalPrice: 22999,
    image: jewelryTemple,
    category: 'jewelry',
    description: 'Traditional South Indian temple jewelry set with intricate deity motifs.',
    colors: ['Antique Gold'],
    isBestseller: true,
  },
  {
    id: '10',
    name: 'Sherwani Set',
    price: 18999,
    originalPrice: 28999,
    image: mensSherwani,
    category: 'mens',
    description: 'Royal sherwani with intricate embroidery. Includes matching stole and mojris.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ivory', 'Gold', 'Maroon'],
    isNew: true,
  },
  {
    id: '11',
    name: 'Silk Dupatta',
    price: 2999,
    originalPrice: 4499,
    image: accessoryDupatta,
    category: 'accessories',
    description: 'Pure silk dupatta with gold zari border. Elevates any ethnic outfit.',
    colors: ['Red', 'Pink', 'Orange', 'Green'],
  },
  {
    id: '12',
    name: 'Designer Juttis',
    price: 1999,
    originalPrice: 2999,
    image: accessoryJuttis,
    category: 'accessories',
    description: 'Handcrafted leather juttis with traditional embroidery and mirror work.',
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['Gold', 'Red', 'Black', 'Multi'],
    isBestseller: true,
  },
];

export const getFeaturedProducts = () => products.filter(p => p.isBestseller || p.isNew).slice(0, 8);
export const getNewArrivals = () => products.filter(p => p.isNew);
export const getBestsellers = () => products.filter(p => p.isBestseller);
export const getProductsByCategory = (categoryId: string) => products.filter(p => p.category === categoryId);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
};
