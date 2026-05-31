/* AnCommerce — data layer: catalog, categories, themes.
   Plain global script. Exposes window.AC. */
(function () {
  // ── Category metadata: vibrant hue + line icon (inner SVG markup) ───────────
  const CAT = {
    "Electronics": {
      color: "#3D5BFF",
      icon: '<path d="M4 6h16v9H4z"/><path d="M2 19h20"/><path d="M9.5 19v-4"/><path d="M14.5 19v-4"/>'
    },
    "Clothing": {
      color: "#FF3D9A",
      icon: '<path d="M8 3l4 3 4-3 4 4-3 3v9H7v-9L4 7z"/>'
    },
    "Home & Garden": {
      color: "#16A974",
      icon: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M12 14c2 0 3-1.5 3-3-1.8 0-3 1-3 3z"/>'
    },
    "Books": {
      color: "#F4920B",
      icon: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>'
    },
    "Sports & Outdoors": {
      color: "#FF6B2C",
      icon: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18"/><path d="M3.5 9h17M3.5 15h17"/>'
    },
    "Toys & Games": {
      color: "#7C5CFC",
      icon: '<rect x="3" y="9" width="18" height="9" rx="3"/><path d="M8 13.5h.01M16 13.5h.01M13.5 12.5h.01M13.5 14.5h.01"/><path d="M8 9V6a2 2 0 0 1 2-2h0"/>'
    }
  };

  const CATEGORIES = Object.keys(CAT).map((name) => ({ name, ...CAT[name] }));

  // ── Catalog (extends the codebase mock-data with retail-shaped fields) ──────
  const P = [
    { id: "1",  name: "Wireless Bluetooth Headphones", category: "Electronics", price: 79.99, compareAt: 99.99,
      tagline: "Studio-grade sound, anywhere", stock: 24, rating: 4.7, reviews: 1284, badge: "Sale",
      description: "Premium noise-cancelling headphones with 30-hour battery life, plush memory-foam earcups, and instant Bluetooth pairing.",
      highlights: ["Active noise cancellation", "30-hour battery life", "USB-C fast charge", "Foldable travel design"] },
    { id: "2",  name: "Classic Cotton T-Shirt", category: "Clothing", price: 24.99,
      tagline: "Your everyday essential", stock: 140, rating: 4.5, reviews: 642,
      description: "A comfortable everyday t-shirt made from 100% organic cotton with a relaxed modern fit that holds its shape wash after wash.",
      highlights: ["100% organic cotton", "Pre-shrunk, relaxed fit", "8 colorways", "Ethically made"] },
    { id: "3",  name: "Stainless Steel Water Bottle", category: "Home & Garden", price: 34.99,
      tagline: "Cold for 24h, hot for 12", stock: 80, rating: 4.8, reviews: 988, badge: "Bestseller",
      description: "Double-wall insulated bottle that keeps drinks cold for 24 hours and hot for 12. Leak-proof lid and a powder-coated finish that won't sweat.",
      highlights: ["24h cold / 12h hot", "Leak-proof lid", "BPA-free", "Fits most cup holders"] },
    { id: "4",  name: "The Art of Programming", category: "Books", price: 49.99,
      tagline: "A modern developer's bible", stock: 32, rating: 4.6, reviews: 311,
      description: "A comprehensive, beautifully typeset guide to modern software development practices — from clean architecture to shipping with confidence.",
      highlights: ["840 pages, hardcover", "Updated 3rd edition", "Code samples included", "Lay-flat binding"] },
    { id: "5",  name: "Yoga Mat Premium", category: "Sports & Outdoors", price: 44.99,
      tagline: "Grip that never slips", stock: 56, rating: 4.7, reviews: 720, badge: "New",
      description: "Non-slip, extra-cushioned exercise mat perfect for yoga, pilates, and floor work. Sweat-resistant top layer wipes clean in seconds.",
      highlights: ["6mm cushioned core", "Non-slip texture", "Carry strap included", "Free of phthalates"] },
    { id: "6",  name: "Smart Watch Pro", category: "Electronics", price: 299.99, compareAt: 349.99,
      tagline: "Your health on your wrist", stock: 18, rating: 4.9, reviews: 2140, badge: "Sale",
      description: "A feature-rich smartwatch with continuous health tracking, on-wrist notifications, GPS, and a bright always-on AMOLED display.",
      highlights: ["AMOLED always-on display", "ECG + SpO2 sensors", "Built-in GPS", "5-day battery"] },
    { id: "7",  name: "Denim Jacket", category: "Clothing", price: 89.99,
      tagline: "A wardrobe that lasts", stock: 44, rating: 4.4, reviews: 208,
      description: "A stylish denim jacket with a modern tailored fit, durable stitching, and a soft-washed finish that only gets better with age.",
      highlights: ["Premium 12oz denim", "Tailored modern fit", "Reinforced seams", "Unisex sizing"] },
    { id: "8",  name: "Ceramic Plant Pot Set", category: "Home & Garden", price: 39.99,
      tagline: "Bring the outside in", stock: 65, rating: 4.6, reviews: 415, badge: "New",
      description: "A set of three hand-glazed decorative plant pots with drainage holes and matching saucers. Perfect for herbs, succulents, and small plants.",
      highlights: ["Set of 3 sizes", "Drainage + saucers", "Hand-glazed finish", "Indoor / outdoor"] },
    { id: "9",  name: "Building Blocks Set", category: "Toys & Games", price: 59.99,
      tagline: "500+ pieces of imagination", stock: 90, rating: 4.8, reviews: 1320, badge: "Bestseller",
      description: "A creative building set with 500+ colorful, compatible pieces and an idea booklet to spark hours of open-ended play.",
      highlights: ["500+ pieces", "Idea booklet included", "Reusable storage tub", "Ages 4+"] },
    { id: "10", name: "Running Shoes", category: "Sports & Outdoors", price: 119.99, compareAt: 139.99,
      tagline: "Go further, feel lighter", stock: 38, rating: 4.7, reviews: 876, badge: "Sale",
      description: "Lightweight running shoes with responsive foam cushioning, a breathable knit upper, and a grippy outsole built for the long haul.",
      highlights: ["Responsive foam midsole", "Breathable knit upper", "Reflective accents", "9.2 oz per shoe"] },
    { id: "11", name: "Portable Bluetooth Speaker", category: "Electronics", price: 64.99,
      tagline: "Big sound, pocket size", stock: 72, rating: 4.5, reviews: 530,
      description: "A waterproof speaker with rich 360-degree sound, 16 hours of playtime, and a rugged strap to take the party anywhere.",
      highlights: ["IPX7 waterproof", "360° sound", "16h playtime", "Pairs in stereo"] },
    { id: "12", name: "World Kitchen Cookbook", category: "Books", price: 29.99,
      tagline: "Recipes from everywhere", stock: 48, rating: 4.6, reviews: 264,
      description: "Essential recipes from around the world, with step-by-step photos, weeknight-friendly timings, and a chapter on pantry basics.",
      highlights: ["220 recipes", "Full-color photos", "Weeknight timings", "Hardcover"] }
  ];

  // ── Themes: each is a set of CSS custom properties applied to the app root ──
  const THEMES = {
    cocoa: {
      label: "Cocoa",
      blurb: "Warm caramel, rounded & friendly",
      vars: {
        "--bg": "#FBF6F0",
        "--surface": "#FFFFFF",
        "--surface-2": "#F4E9DD",
        "--ink": "#2A1E14",
        "--muted": "#8A7A6A",
        "--primary": "#C2683C",
        "--on-primary": "#FFFFFF",
        "--accent": "#2E8B8B",
        "--accent-2": "#E8A93C",
        "--border": "#ECDFD0",
        "--ring": "rgba(194,104,60,0.35)",
        "--font-display": "'Baloo 2', system-ui, sans-serif",
        "--font-body": "'Nunito', system-ui, sans-serif",
        "--display-weight": "800",
        "--radius-card": "26px",
        "--radius-btn": "999px",
        "--radius-pill": "999px",
        "--shadow-sm": "0 2px 0 rgba(42,30,20,0.06)",
        "--shadow-md": "0 18px 40px -22px rgba(194,104,60,0.5)",
        "--shadow-card": "0 24px 48px -30px rgba(42,30,20,0.3)"
      }
    },
    citrus: {
      label: "Citrus",
      blurb: "Sunny tangerine, crisp & retro",
      vars: {
        "--bg": "#FFFCF2",
        "--surface": "#FFFFFF",
        "--surface-2": "#FFF1D9",
        "--ink": "#211803",
        "--muted": "#7A6A4A",
        "--primary": "#FF6A1A",
        "--on-primary": "#FFFFFF",
        "--accent": "#1FA85A",
        "--accent-2": "#E11D6B",
        "--border": "#EFE2C6",
        "--ring": "rgba(255,106,26,0.35)",
        "--font-display": "'Space Grotesk', system-ui, sans-serif",
        "--font-body": "'DM Sans', system-ui, sans-serif",
        "--display-weight": "700",
        "--radius-card": "16px",
        "--radius-btn": "12px",
        "--radius-pill": "999px",
        "--shadow-sm": "0 2px 0 rgba(33,24,3,0.08)",
        "--shadow-md": "4px 5px 0 rgba(33,24,3,0.9)",
        "--shadow-card": "5px 6px 0 rgba(33,24,3,0.12)"
      }
    },
    electric: {
      label: "Electric",
      blurb: "Cobalt + volt, high-contrast modern",
      vars: {
        "--bg": "#F4F6FF",
        "--surface": "#FFFFFF",
        "--surface-2": "#EAefff",
        "--ink": "#0A0E27",
        "--muted": "#5E6486",
        "--primary": "#3D5BFF",
        "--on-primary": "#FFFFFF",
        "--accent": "#00C2A8",
        "--accent-2": "#FF4D6D",
        "--border": "#DEE3FB",
        "--ring": "rgba(61,91,255,0.35)",
        "--font-display": "'Sora', system-ui, sans-serif",
        "--font-body": "'Manrope', system-ui, sans-serif",
        "--display-weight": "800",
        "--radius-card": "14px",
        "--radius-btn": "10px",
        "--radius-pill": "999px",
        "--shadow-sm": "0 1px 2px rgba(10,14,39,0.08)",
        "--shadow-md": "0 16px 36px -20px rgba(61,91,255,0.6)",
        "--shadow-card": "0 20px 44px -28px rgba(10,14,39,0.35)"
      }
    }
  };

  window.AC = {
    products: P,
    categories: CATEGORIES,
    catColor: function (name) { return (CAT[name] && CAT[name].color) || "#888"; },
    catIcon: function (name) { return (CAT[name] && CAT[name].icon) || ""; },
    themes: THEMES
  };
})();
