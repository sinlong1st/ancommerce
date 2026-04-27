const fs = require('fs');
const path = require('path');

// Create components/layout directory
const layoutDir = path.join(__dirname, 'components', 'layout');
fs.mkdirSync(layoutDir, { recursive: true });

console.log('✓ Created components/layout directory');

// Create Navbar.tsx
const navbarContent = `import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              ShopGenie
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
`;

fs.writeFileSync(path.join(layoutDir, 'Navbar.tsx'), navbarContent);
console.log('✓ Created components/layout/Navbar.tsx');

// Create Footer.tsx
const footerContent = `import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} ShopGenie. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
`;

fs.writeFileSync(path.join(layoutDir, 'Footer.tsx'), footerContent);
console.log('✓ Created components/layout/Footer.tsx');

console.log('\n✅ All layout components created successfully!');
