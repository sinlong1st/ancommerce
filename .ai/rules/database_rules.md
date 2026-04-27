# Database Rules

## ORM

Use Prisma for all database operations.

## Database

Use PostgreSQL.

## Important Principles

- Database schema must match real business needs.
- Avoid storing calculated values unless needed for audit.
- Keep order records stable after purchase.
- Store order item price at the time of purchase.
- Do not rely on current product price when displaying old orders.

## Money Rules

- Never calculate final total from frontend data.
- Frontend can display estimated subtotal.
- Server must recalculate:
  - product price
  - quantity
  - subtotal
  - tax later
  - discount later
  - final total

## Product Rules

Products should support:

- name
- slug
- description
- price
- imageUrl
- stock
- isActive
- category

Prefer deactivating products instead of deleting them if they already appear in orders.

## Order Rules

Orders should support:

- user
- order items
- shipping address
- status
- total amount
- payment record later

Order status values:

- PENDING
- PAID
- PROCESSING
- SHIPPED
- DELIVERED
- CANCELLED

## Migration Rules

Before changing Prisma schema:

1. Explain the schema change.
2. Explain why it is needed.
3. Update `schema.prisma`.
4. Run migration.
5. Update seed data if needed.
