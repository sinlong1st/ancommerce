# Manual Test Checklist

## Product Browsing

- [ ] Homepage loads.
- [ ] Product listing page loads.
- [ ] Product cards show image, name, and price.
- [ ] Product detail page loads.
- [ ] Product detail shows description, price, stock, and add to cart button.
- [ ] Search works.
- [ ] Category filter works.

## Cart

- [ ] User can add product to cart.
- [ ] Cart count updates.
- [ ] Cart page shows correct items.
- [ ] User can increase quantity.
- [ ] User can decrease quantity.
- [ ] User can remove item.
- [ ] Subtotal updates correctly.
- [ ] Cart persists after refresh.
- [ ] Empty cart state works.

## Checkout

- [ ] Checkout page loads.
- [ ] User can enter shipping info.
- [ ] Required fields validate.
- [ ] Order is created successfully.
- [ ] Cart clears after order.
- [ ] Confirmation page shows order summary.

## Admin

- [ ] Admin dashboard loads for admin.
- [ ] Customer cannot access admin page.
- [ ] Admin can create product.
- [ ] Admin can edit product.
- [ ] Admin can deactivate product.
- [ ] Admin can view orders.
- [ ] Admin can update order status.

## Security

- [ ] No secrets exposed in frontend.
- [ ] Admin pages are server-protected.
- [ ] Checkout total is calculated on server.
- [ ] Invalid form data is rejected.

## Deployment

- [ ] Production build succeeds.
- [ ] Environment variables are set.
- [ ] Database migration works.
- [ ] Live site loads.
