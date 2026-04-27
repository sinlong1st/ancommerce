# E-commerce Website Project Blueprint v1

## 1. Project Goal

Build a real, production-style e-commerce website that can sell products online. The goal is not only to create a working website, but also to learn the full software development workflow: planning, database design, frontend, backend, authentication, admin tools, payment, deployment, and AI-assisted coding.

This document will be used as the main project guide. We can adjust it over time as the project becomes clearer.

---

## 2. Project Name

Temporary name: **ShopGenie**

Alternative names:
- MiniCommerce AI
- SimpleCart
- SmartShop
- AnCommerce

We can rename this later.

---

## 3. Target Users

### Customer
A normal user who visits the website to browse products, add items to cart, and place an order.

### Admin
The store owner or internal staff who manages products, orders, and customer information.

---

## 4. Core Features

## Customer Features

### 4.1 Homepage
Purpose: Give users a quick overview of the store and featured products.

Includes:
- Hero banner
- Featured products
- Product categories
- Basic navigation
- Search bar

### 4.2 Product Listing Page
Purpose: Let users browse all products.

Includes:
- Product grid
- Product image
- Product name
- Price
- Category filter
- Search
- Sort by price or newest

### 4.3 Product Detail Page
Purpose: Let users view full product information before buying.

Includes:
- Product image gallery
- Product name
- Price
- Description
- Stock status
- Quantity selector
- Add to cart button

### 4.4 Cart Page
Purpose: Let users review selected products before checkout.

Includes:
- Cart items
- Quantity update
- Remove item
- Subtotal
- Estimated tax placeholder
- Checkout button

### 4.5 Checkout Page
Purpose: Collect shipping and payment information.

Includes:
- Customer contact information
- Shipping address
- Order summary
- Stripe payment integration later

### 4.6 User Account
Purpose: Let customers manage their own information.

Includes:
- Register
- Login
- Logout
- View order history
- View order details

---

## Admin Features

### 4.7 Admin Dashboard
Purpose: Give admin a simple overview of store activity.

Includes:
- Total orders
- Total revenue
- Pending orders
- Low-stock products

### 4.8 Product Management
Purpose: Let admin create and manage products.

Includes:
- Add product
- Edit product
- Delete product
- Upload product image
- Set price
- Set inventory quantity
- Assign category

### 4.9 Order Management
Purpose: Let admin review and update orders.

Includes:
- View all orders
- View order detail
- Update order status
- Search by customer name or order number

### 4.10 Customer Management
Purpose: Let admin view basic customer information.

Includes:
- Customer list
- Customer order history
- Contact information

---

## 5. Recommended Tech Stack

## Frontend
- **Next.js**: Main React framework
- **TypeScript**: Safer JavaScript
- **Tailwind CSS**: Styling
- **shadcn/ui**: Clean UI components

## Backend
Option A, recommended for first version:
- **Next.js API Routes / Server Actions**

Option B, more advanced later:
- **NestJS backend**

Start with Option A so the project is easier to finish.

## Database
- **PostgreSQL**
- **Prisma ORM**

Recommended database hosting:
- Supabase
- Neon
- Railway

## Authentication
- **Auth.js / NextAuth**

Login options:
- Email/password first
- Google login later if needed

## Payment
- **Stripe Sandbox** for testing
- Real Stripe account later

## Deployment
- **Vercel** for Next.js
- **Supabase/Neon** for PostgreSQL

---

## 6. Project Milestones

## Phase 0 — Setup and Planning
Goal: Prepare project structure and documentation.

Tasks:
- Create GitHub repository
- Create README.md
- Create this blueprint document
- Define MVP scope
- Choose project name
- Create initial database schema draft

Deliverables:
- GitHub repo ready
- Project blueprint ready
- MVP feature list ready

---

## Phase 1 — Project Setup
Goal: Create the base Next.js application.

Tasks:
- Initialize Next.js project
- Add TypeScript
- Add Tailwind CSS
- Add shadcn/ui
- Create basic folder structure
- Create homepage layout
- Create navbar and footer

Deliverables:
- Website runs locally
- Basic layout ready

Suggested folder structure:

```txt
src/
  app/
    page.tsx
    products/
    cart/
    checkout/
    account/
    admin/
  components/
    ui/
    layout/
    product/
    cart/
    admin/
  lib/
    db.ts
    auth.ts
    utils.ts
  prisma/
    schema.prisma
  types/
```

---

## Phase 2 — Database Design
Goal: Create database tables and relationships.

Core tables:
- User
- Product
- Category
- Cart
- CartItem
- Order
- OrderItem
- Payment
- Address

Initial Prisma schema idea:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String?
  role      UserRole @default(CUSTOMER)
  orders    Order[]
  carts     Cart[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum UserRole {
  CUSTOMER
  ADMIN
}

model Category {
  id        String    @id @default(cuid())
  name      String
  slug      String    @unique
  products  Product[]
  createdAt DateTime  @default(now())
}

model Product {
  id          String      @id @default(cuid())
  name        String
  slug        String      @unique
  description String?
  price       Decimal
  imageUrl    String?
  stock       Int         @default(0)
  isActive    Boolean     @default(true)
  categoryId  String?
  category    Category?   @relation(fields: [categoryId], references: [id])
  orderItems  OrderItem[]
  cartItems   CartItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Cart {
  id        String     @id @default(cuid())
  userId    String?
  user      User?      @relation(fields: [userId], references: [id])
  items     CartItem[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model CartItem {
  id        String   @id @default(cuid())
  cartId    String
  productId String
  quantity  Int      @default(1)
  cart      Cart     @relation(fields: [cartId], references: [id])
  product   Product  @relation(fields: [productId], references: [id])
}

model Order {
  id          String      @id @default(cuid())
  userId      String?
  user        User?       @relation(fields: [userId], references: [id])
  status      OrderStatus @default(PENDING)
  totalAmount Decimal
  items       OrderItem[]
  payment     Payment?
  address     Address?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Decimal
  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}

model Payment {
  id              String   @id @default(cuid())
  orderId          String   @unique
  order            Order    @relation(fields: [orderId], references: [id])
  provider         String
  providerIntentId String?
  status           String
  amount           Decimal
  createdAt        DateTime @default(now())
}

model Address {
  id        String  @id @default(cuid())
  orderId   String  @unique
  order     Order   @relation(fields: [orderId], references: [id])
  fullName  String
  phone     String?
  line1     String
  line2     String?
  city      String
  state     String
  zipCode   String
  country   String  @default("US")
}
```

---

## Phase 3 — Product Browsing
Goal: Let users browse products.

Tasks:
- Create product seed data
- Build product card component
- Build product grid
- Build product detail page
- Add category filter
- Add search bar

Deliverables:
- User can see product list
- User can open product detail page

---

## Phase 4 — Cart System
Goal: Let users add products to cart.

Tasks:
- Add to cart button
- Cart state management
- Cart page UI
- Update quantity
- Remove item
- Calculate subtotal

MVP decision:
- Start with local cart using browser localStorage
- Later connect cart to database for logged-in users

Deliverables:
- User can add, update, and remove cart items

---

## Phase 5 — Authentication
Goal: Let users create accounts and login.

Tasks:
- Set up Auth.js / NextAuth
- Create register page
- Create login page
- Create logout action
- Protect account page
- Protect admin pages

Deliverables:
- Customer can login
- Admin can access admin dashboard
- Normal customer cannot access admin pages

---

## Phase 6 — Checkout and Orders
Goal: Convert cart into an order.

Tasks:
- Build checkout page
- Collect shipping address
- Create order record
- Create order items
- Clear cart after order creation
- Show order confirmation page

Deliverables:
- User can place a test order without payment first

---

## Phase 7 — Stripe Payment
Goal: Add real payment flow using Stripe sandbox.

Tasks:
- Create Stripe account
- Use Stripe test mode
- Create payment intent
- Redirect to Stripe checkout or use embedded payment form
- Save payment status
- Update order status to PAID after successful payment

Deliverables:
- User can pay with Stripe test card
- Order status updates after payment

---

## Phase 8 — Admin Dashboard
Goal: Allow admin to manage store data.

Tasks:
- Admin layout
- Product list
- Create product form
- Edit product form
- Delete/deactivate product
- Order list
- Order detail page
- Update order status

Deliverables:
- Admin can manage products and orders

---

## Phase 9 — Deployment
Goal: Put the website online.

Tasks:
- Push code to GitHub
- Deploy to Vercel
- Create hosted PostgreSQL database
- Add environment variables
- Run Prisma migration
- Seed production/demo data
- Test website online

Deliverables:
- Live e-commerce website URL

---

## Phase 10 — Polish and Real-World Improvements
Goal: Make the project feel professional.

Possible improvements:
- Product image upload
- Email confirmation
- Better admin analytics
- Coupon code
- Inventory warning
- Order cancellation
- Guest checkout
- Product reviews
- Wishlist
- SEO metadata
- Error tracking
- Loading skeletons
- Empty states
- Responsive mobile layout

---

## 7. MVP Scope

To avoid getting stuck, the first MVP should only include:

1. Homepage
2. Product listing
3. Product detail
4. Cart using localStorage
5. Basic checkout form
6. Create order in database
7. Admin product CRUD
8. Admin order list
9. Deploy online

Payment can be added after MVP if needed.

---

## 8. API / Server Action Plan

Possible backend actions:

### Product
- `getProducts()`
- `getProductBySlug(slug)`
- `createProduct(data)`
- `updateProduct(id, data)`
- `deleteProduct(id)` or `deactivateProduct(id)`

### Category
- `getCategories()`
- `createCategory(data)`

### Cart
- Local only in MVP
- Later:
  - `getCart(userId)`
  - `addToCart(productId, quantity)`
  - `updateCartItem(itemId, quantity)`
  - `removeCartItem(itemId)`

### Order
- `createOrder(data)`
- `getOrderById(id)`
- `getOrdersByUser(userId)`
- `getAllOrders()`
- `updateOrderStatus(orderId, status)`

### Admin
- `getDashboardStats()`

---

## 9. AI-Assisted Development Workflow

Since this project will be built with AI assistance, we should use AI carefully instead of asking it to randomly generate everything.

Recommended workflow for each feature:

1. Describe the feature clearly
2. Ask AI to generate a small plan
3. Ask AI to update or create only the needed files
4. Review the code
5. Run locally
6. Fix errors one by one
7. Commit to GitHub

---

## 10. AI Prompt Templates

## Prompt 1 — Feature Planning

```txt
I am building a Next.js TypeScript e-commerce website using Prisma, PostgreSQL, Tailwind CSS, and shadcn/ui.

Feature: [FEATURE NAME]

Please create a step-by-step implementation plan before writing code.
Include:
- Files to create or update
- Database changes if needed
- Components needed
- Server actions or API routes needed
- Edge cases
Do not write code yet.
```

## Prompt 2 — Generate Code Safely

```txt
Based on the approved plan, generate the code for this feature.

Rules:
- Use TypeScript
- Use clean component structure
- Keep code readable
- Do not change unrelated files
- Explain which files are new and which files are updated
- Include any environment variables needed
```

## Prompt 3 — Debug Error

```txt
I am getting this error:

[PASTE ERROR]

Here is the related code:

[PASTE CODE]

Please explain the root cause in simple terms and provide the smallest safe fix.
Do not refactor unrelated code.
```

## Prompt 4 — Code Review

```txt
Please review this code for:
- Bugs
- Security issues
- TypeScript issues
- Database logic issues
- Performance issues
- Better structure

Do not rewrite the entire file unless necessary.
Give me specific changes only.
```

---

## 11. Git Workflow

Recommended branches:

```txt
main
  dev
    feature/project-setup
    feature/product-listing
    feature/cart
    feature/auth
    feature/checkout
    feature/admin-dashboard
```

Simple rule:
- `main`: stable deployed version
- `dev`: current working version
- `feature/*`: one feature at a time

Commit examples:

```txt
git commit -m "Initialize Next.js project"
git commit -m "Add product listing page"
git commit -m "Create cart state with localStorage"
git commit -m "Add Prisma product schema"
git commit -m "Build admin product form"
```

---

## 12. Environment Variables

Possible `.env` file:

```txt
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="..."
STRIPE_WEBHOOK_SECRET="..."
```

Do not commit `.env` to GitHub.

---

## 13. Security Notes

Important rules:
- Never expose database credentials in frontend code
- Never expose Stripe secret key in frontend code
- Always protect admin pages
- Validate form data before saving to database
- Do not trust client-side price values during checkout
- Calculate order total on the server
- Use environment variables for secrets

---

## 14. Testing Plan

Manual testing checklist:

### Product browsing
- User can see product list
- User can open product detail
- Search works
- Category filter works

### Cart
- User can add item to cart
- User can update quantity
- User can remove item
- Subtotal is correct
- Cart persists after refresh

### Checkout
- User can enter shipping info
- Order is created correctly
- Cart clears after order
- Order confirmation page displays correct info

### Admin
- Admin can create product
- Admin can edit product
- Admin can deactivate product
- Admin can view orders
- Customer cannot access admin pages

### Payment later
- Stripe test payment succeeds
- Failed payment does not mark order as paid
- Paid order updates status correctly

---

## 15. First Week Plan

## Day 1
- Create GitHub repository
- Initialize Next.js project
- Install Tailwind and shadcn/ui
- Create layout, navbar, footer

## Day 2
- Set up Prisma and PostgreSQL
- Create initial database schema
- Run migration
- Seed sample categories and products

## Day 3
- Build product listing page
- Build product card component
- Build product detail page

## Day 4
- Build cart system using localStorage
- Build cart page
- Add quantity update and remove item

## Day 5
- Build checkout page UI
- Create basic order creation logic
- Create order confirmation page

## Weekend
- Review code
- Fix bugs
- Write README
- Plan next phase: auth/admin/payment

---

## 16. Definition of Done

A feature is considered done when:
- It works locally
- It has no obvious console errors
- It is committed to GitHub
- It follows the project folder structure
- It does not break existing features
- It has been manually tested
- The README or blueprint is updated if needed

---

## 17. Current Decisions

Decisions made so far:
- Use Next.js for the main application
- Use PostgreSQL for database
- Use Prisma as ORM
- Start with localStorage cart for MVP
- Add Stripe after basic checkout works
- Build admin dashboard after customer flow works

Open questions:
- What kind of products will the store sell?
- Should the first version support guest checkout?
- Should users need an account before checkout?
- Should product images be uploaded by admin or stored as URLs first?
- Should we use Stripe Checkout page or custom embedded form?

---

## 18. Next Immediate Step

Start with Phase 0 and Phase 1:

1. Pick project name
2. Create GitHub repo
3. Initialize Next.js project
4. Install dependencies
5. Build base layout

Suggested first command:

```bash
npx create-next-app@latest shopgenie
```

Recommended options:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Turbopack: Yes or No, either is fine
- Import alias: Yes, use `@/*`

