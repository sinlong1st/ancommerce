const fs = require('fs');
const path = require('path');

console.log('📁 Creating directory structure for product listing page...\n');

// Create directories
const directories = [
  'types',
  'lib',
  'components/product',
  'app/products'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  } else {
    console.log(`✓ Already exists: ${dir}`);
  }
});

// Create Product type
const productType = `export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
}
`;
fs.writeFileSync(path.join(__dirname, 'types', 'product.ts'), productType);
console.log('✓ Created: types/product.ts');

// Create mock data
const mockData = `import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 79.99,
    description: "Premium noise-cancelling headphones with 30-hour battery life",
  },
  {
    id: "2",
    name: "Classic Cotton T-Shirt",
    category: "Clothing",
    price: 24.99,
    description: "Comfortable everyday t-shirt made from 100% organic cotton",
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    category: "Home & Garden",
    price: 34.99,
    description: "Insulated water bottle keeps drinks cold for 24 hours",
  },
  {
    id: "4",
    name: "The Art of Programming",
    category: "Books",
    price: 49.99,
    description: "Comprehensive guide to modern software development practices",
  },
  {
    id: "5",
    name: "Yoga Mat Premium",
    category: "Sports & Outdoors",
    price: 44.99,
    description: "Non-slip exercise mat perfect for yoga and fitness",
  },
  {
    id: "6",
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 299.99,
    description: "Feature-rich smartwatch with health tracking and notifications",
  },
  {
    id: "7",
    name: "Denim Jacket",
    category: "Clothing",
    price: 89.99,
    description: "Stylish denim jacket with a modern fit",
  },
  {
    id: "8",
    name: "Ceramic Plant Pot Set",
    category: "Home & Garden",
    price: 39.99,
    description: "Set of 3 decorative plant pots with drainage holes",
  },
  {
    id: "9",
    name: "Building Blocks Set",
    category: "Toys & Games",
    price: 59.99,
    description: "Creative building set with 500+ colorful pieces",
  },
  {
    id: "10",
    name: "Running Shoes",
    category: "Sports & Outdoors",
    price: 119.99,
    description: "Lightweight running shoes with superior cushioning",
  },
  {
    id: "11",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 64.99,
    description: "Waterproof speaker with 360-degree sound",
  },
  {
    id: "12",
    name: "Cookbook Collection",
    category: "Books",
    price: 29.99,
    description: "Essential recipes from around the world",
  },
];
`;
fs.writeFileSync(path.join(__dirname, 'lib', 'mock-data.ts'), mockData);
console.log('✓ Created: lib/mock-data.ts');

// Create ProductCard component
const productCard = `import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Image Placeholder */}
      <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="flex h-full w-full items-center justify-center">
          <svg
            className="h-16 w-16 text-blue-300"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
          {product.name}
        </h3>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 mb-4">
          \${product.price.toFixed(2)}
        </p>

        {/* View Product Button */}
        <div className="mt-auto">
          <Link
            href={\`/products/\${product.id}\`}
            className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(__dirname, 'components', 'product', 'ProductCard.tsx'), productCard);
console.log('✓ Created: components/product/ProductCard.tsx');

// Create products page
const productsPage = `import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mock-data";

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shop All Products
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Browse our collection of quality products at great prices
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(__dirname, 'app', 'products', 'page.tsx'), productsPage);
console.log('✓ Created: app/products/page.tsx');

console.log('\n✅ Product listing page setup complete!');
console.log('\nNext steps:');
console.log('1. Run: npm run dev');
console.log('2. Visit: http://localhost:3000/products');
console.log('3. Delete this setup file: del setup-products.js');
