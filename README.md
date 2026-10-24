# Mow Bros

A custom, buildless lawn and garden care website. See DESIGN-PLAN.md for the creative direction, visitor journey, interaction specifications, and image-generation prompt.

## Run

From this directory, run `node server.mjs` and open http://127.0.0.1:4173. JavaScript syntax check: `node --check dist/app.js`. No dependencies or build step required. Deploy the `dist` directory as a static website.

## Features

- Responsive garden-shed noticeboard layout, handwritten annotations, and custom SVG brand illustrations.
- Local WebP garden photograph generated specifically for the design.
- Service disclosures with contextual quote selection.
- Three-step quote request builder, illustrative AUD estimate and plain-text download.
- Canvas lawn game with pointer, touch, arrow-key and guided-stripe controls.
- Australian seasonal notes with accessible keyboard-controlled tabs.
- Reduced-motion support, native modal focus management and form validation.

## Business configuration still needed

The business name is inferred from the workspace. Replace demo rates in `dist/app.js` with approved pricing. Confirm the actual services, service area, contact details, waste policy, and business credentials. The quote builder is a browser-local demonstration: no details are transmitted, persisted, or booked. Connect a real enquiry service before presenting it as an online booking system. The garden photograph illustrates the brand and is not a client portfolio photo.

## Source

`dist/index.html`: content and semantics. `dist/style.css`: visual system and responsive layouts. `dist/quote.css`: base quote sheet styling. `dist/app.js`: interactions. `.openai/hosting.json`: Sites identity and static deployment configuration.
