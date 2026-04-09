# Custom Product Page — Empire Theme (Synergy Edge layout)

This package recreates the Bomber Synergy Edge cornhole product page as a
reusable custom product template for the Shopify **Empire** theme.

## What you get

| File | Purpose |
| --- | --- |
| `templates/product.synergy.json` | Custom product template with all sections pre-wired |
| `sections/main-product-synergy.liquid` | Gallery + product info + "Complete Your Set" upsell column |
| `sections/product-description-features.liquid` | Description + checkmark feature list (with optional tabs) |
| `sections/product-models-grid.liquid` | "Shop Pro Board Models" 4-column grid |
| `sections/product-trust-badges.liquid` | Edge Tech / ACA / 30-day guarantee row |
| `sections/product-edge-banner.liquid` | Dark "Introducing Synergy Edge" hero banner |
| `sections/product-feature-columns.liquid` | "Game Changing Edge Technology" 4-column feature cards |
| `sections/product-cta-edge.liquid` | "Get An Edge Over The Competition" CTA banner |
| `sections/product-faq-accordion.liquid` | FAQ accordion (expandable) |
| `sections/product-reviews-placeholder.liquid` | Reviews anchor (wires into Shopify Reviews / Judge.me) |
| `assets/custom-synergy.css` | All styling for the page |
| `assets/custom-synergy.js` | Gallery, variant picker, tabs, qty, etc. |

## Install

1. **Upload files** to your Empire theme. In the Shopify admin:
   - Online Store → Themes → your Empire theme → Actions → Edit code
   - Copy each file into the matching folder. The folder structure here
     mirrors what Empire expects (`templates/`, `sections/`, `assets/`).

2. **Assign the template** to a product:
   - Products → select the product (e.g. "Bomber Synergy Edge Cornhole Bags")
   - In the Theme template dropdown on the right, pick **synergy**
   - Save

3. **Customize in the theme editor**:
   - Online Store → Customize
   - Top-left dropdown → Products → *your Synergy product*
   - You'll see every section listed in the left sidebar. Click any section
     to edit its content (images, copy, products, blocks).

## Configuring each section

### Synergy Product (main section)
- Toggle **Complete Your Set** on/off
- Add upsell products via the **Upsell product** block
- Controls the image gallery, variant picker, price, ATC button

### Synergy Description
- Add **Feature bullet** blocks for each checkmark line
- Optional **Tab** blocks if you want SPECS / SHIPPING tabs alongside the description

### Synergy Models Grid
- Add up to 6 **Model** blocks
- Each block can reference a real product *or* override with custom image/title/price

### Synergy Trust Badges
- 3 badge blocks by default (Edge Tech / ACA / 30-day)
- Upload your own icon images per block

### Synergy Edge Banner
- Upload the hero image of the bag
- Customize eyebrow text, headline, and background color

### Synergy Feature Columns
- Add 4 **Feature** blocks with image + title + description
- Responsive: 4 cols → 2 cols → 1 col

### Synergy CTA Banner
- Upload a background image (red-tinted overlay is applied automatically)
- Headline, description, button label and link are all editable

### Synergy FAQ
- Add as many **FAQ item** blocks as you need
- Each item is an HTML-rich answer that expands/collapses

### Synergy Reviews
- By default renders Shopify Product Reviews *or* Judge.me if installed
- To use a different reviews app, enter your reviews snippet name in the section settings

## Notes on the Empire theme

- The CSS is namespaced with the `synergy-` prefix so it won't collide with
  Empire's existing product page styles.
- All sections use `enabled_on: product` where appropriate so you can drop
  them into other product templates too.
- Variant handling supports color swatches automatically: any option named
  "Color" / "Colour" renders as circles, other options render as pill buttons.
- Variant inventory state is read from the hidden `<select>` so you can
  extend it with Empire's AJAX cart or live inventory updates.

## Customization tips

- To change the accent color globally, edit `--synergy-accent` in
  `assets/custom-synergy.css`.
- To add more sections to the template, edit
  `templates/product.synergy.json` and add the section and order entry.
- To reuse any of these sections on other pages, move the section's
  `enabled_on` restriction or remove it entirely.

## Branch

All development lives on `claude/custom-product-page-empire-j3lkc`.
