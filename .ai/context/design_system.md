# Design System Context

## Purpose

This document defines the visual direction for ShopGenie homepage and related marketing surfaces.

Scope for this version:
- E-commerce homepage design rules
- Visual language inspired by Claude homepage reference
- Practical implementation guidance for small, safe UI iterations

Non-goals:
- No routing changes
- No backend logic changes
- No database, auth, or checkout architecture changes

## Brand Style

ShopGenie should feel:
- Friendly
- Trustworthy
- Energetic
- Modern but simple

Brand personality rules:
- Use clear, human copy over corporate wording
- Emphasize discovery, confidence, and convenience
- Balance excitement (hero/promos) with trust (quality, shipping, secure checkout)

Visual tone rules:
- Soft gradients and rounded shapes for warmth
- Crisp text and strong CTA contrast for clarity
- Decorative elements should support content, not distract from shopping actions

## Color Direction

Primary direction:
- Blue-led palette for trust and consistency with current UI
- Light neutral backgrounds for readability
- Accent highlights for promotional moments only

Usage rules:
- Primary blue is reserved for key actions (main CTA, active states, badges)
- Secondary tones support links, subtle surfaces, and category tiles
- Neutral grays carry body text, borders, and structural hierarchy
- Success/alert colors should be minimal and functional

Contrast and accessibility:
- Ensure text contrast is strong on all interactive controls
- Avoid low-contrast light text on gradient backgrounds
- Promotional color accents must not reduce legibility

## Typography

Typography goals:
- Confident headline hierarchy
- Highly readable body copy
- Compact, scannable product and section metadata

Hierarchy rules:
- Hero title: strongest weight and size
- Section titles: one step below hero title
- Kicker/eyebrow labels: small uppercase or semibold compact text
- Body copy: comfortable line height for paragraph scanning
- Utility labels (badges, microcopy): small but high-contrast

Copy length guidance:
- Hero subtitle: 1 to 2 short sentences
- Value proposition descriptions: 1 sentence each
- Button labels: short action-first text

## Spacing

Spacing goals:
- Consistent section rhythm
- Predictable card gutters
- Comfortable mobile-first reading flow

Rules:
- Keep one standard container width across homepage sections
- Use a defined vertical spacing scale for section padding
- Separate heading blocks from content grids with a consistent gap
- Keep CTA groups visually near the related copy block
- On mobile, reduce decorative spacing before reducing content spacing

Micro-spacing:
- Tight spacing for title and subtitle pairs
- Moderate spacing between sections of different content types
- Larger spacing before major transitions (hero to categories, featured to promo)

## Button Styles

Button system:
- Primary button: high-emphasis action (Shop now, Join and save)
- Secondary button: lower-emphasis companion action
- Text link button: inline navigation (View all, Learn more)

Primary button rules:
- Solid blue background with white text
- Rounded corners, medium-to-strong weight text
- Visible hover/focus states
- Avoid oversized button groups on mobile

Secondary button rules:
- Ghost or soft-neutral background with clear border or text contrast
- Should not visually compete with primary button

Interaction states:
- Hover: clear but subtle shift
- Focus: visible outline for keyboard users
- Disabled: reduced emphasis without losing readability

## Card Styles

Homepage card types:
- Category tile cards
- Product cards
- Value proposition cards

Shared card rules:
- Rounded corners
- Clean border and/or soft shadow
- Strong internal hierarchy: title, metadata, action
- Stable height behavior within the same row when possible

Category tile rules:
- Icon or visual marker + category name + directional affordance
- Color accents may vary by category but remain within palette harmony

Product card rules:
- Reuse existing product card component patterns where possible
- Keep pricing visually prominent
- CTA should be clear and consistent across listing and homepage

Value card rules:
- Simple icon + short heading + one-line support text
- Focus on trust and operational clarity

## Section Rhythm

Homepage section order (recommended):
1. Hero
2. Category strip
3. Featured products
4. Value propositions
5. Promo band

Rhythm rules:
- Alternate dense sections (grids) with lighter sections (single-band copy/CTA)
- Use section headers with optional kicker and trailing link for scanability
- Keep section transitions clean and predictable
- Avoid stacking multiple heavy gradients in consecutive sections

Density rules:
- Hero can be visually rich
- Product sections should prioritize readability and product clarity
- Promo section can reintroduce stronger visual styling for conversion focus

## E-commerce Homepage Layout Rules

Primary objective:
- Move users from interest to product exploration in minimal steps

Layout principles:
- Hero must communicate value proposition and present clear CTA to shop
- Category strip should provide fast discovery paths
- Featured products should expose real inventory early on page
- Trust section should reduce purchase anxiety
- Promo band should offer optional conversion uplift (membership/newsletter/deals)

Routing and architecture guardrails:
- Keep existing route structure
- Keep existing mock data source unless product strategy changes
- Keep existing cart context and interactions
- Homepage should compose reusable components, not duplicate product logic

Content strategy:
- Prioritize plain-language commerce messaging
- Use social proof and trust signals sparingly and credibly
- Keep promotional claims realistic and verifiable

Mobile behavior:
- Prioritize vertical scanning
- Keep CTAs thumb-friendly and visible
- Collapse decorative complexity before reducing content clarity

## Reusability Standards

Component design expectations:
- Build homepage sections as independent reusable components
- Keep data shaping in shared utility/data files when possible
- Prefer composition over large monolithic page files

Naming conventions:
- Use Home prefix for homepage-specific components
- Use generic names only when component is reusable beyond homepage

## Quality Checklist For Design Updates

Before approving any homepage UI change, verify:
- Brand tone remains friendly and trustworthy
- Primary CTA remains obvious above the fold
- Category and featured sections are easy to scan
- Cards are visually consistent
- Spacing rhythm feels intentional and not cramped
- Mobile layout stays clear and tappable
- No changes to backend/auth/cart architecture unless explicitly planned

## Version Notes

Source reference for this document:
- Claude homepage design analysis and comparison against current homepage implementation

This document is a living guide and should be updated as the homepage evolves.
