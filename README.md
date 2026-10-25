# Uncle Dusty's Garden

A custom, buildless garden maintenance website personalised for Uncle Dusty. See DESIGN-PLAN.md for the creative direction, visitor journey, interaction specifications, and image-generation prompt.

## Run

From this directory, run `node server.mjs` and open http://127.0.0.1:4173. JavaScript syntax check: `node --check dist/app.js`. No dependencies or build step required. Deploy the `dist` directory as a static website.

## Features

- Responsive garden-shed noticeboard layout, handwritten annotations, and custom SVG brand illustrations.
- Local WebP garden photograph and transparent Uncle Dusty character illustration.
- Service disclosures with contextual quote selection.
- Three-step job sheet with illustrative AUD guide, prefilled email draft to admin@uncledustys.com.au, and branded plain-text download.
- Canvas lawn game with pointer, touch, arrow-key and guided-stripe controls.
- Australian seasonal notes with accessible keyboard-controlled tabs.
- Reduced-motion support, native modal focus management and form validation.

## Business configuration still needed

Brand and contacts were supplied by the user: Uncle Dusty?s Garden, 0483 313 425, admin@uncledustys.com.au. The service area has not been supplied and is not claimed. Replace illustrative rates in `dist/app.js` with approved pricing and confirm the waste policy. The job sheet prepares a mailto draft; the visitor must send it from their mail app. Nothing is submitted automatically, persisted, or booked. Downloads are a fallback for devices without a configured mail app. The mascot is an illustrated brand character and the garden photo is illustrative, not a documented client project.

## Source

`dist/index.html`: content and semantics. `dist/style.css`: original noticeboard system. `dist/dusty.css`: Uncle Dusty branding and responsive personalisation. `dist/quote.css`: base quote sheet styling. `dist/app.js`: interactions. `.openai/hosting.json`: Sites identity and static deployment configuration.
