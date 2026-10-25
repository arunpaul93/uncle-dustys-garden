# Uncle Dusty's Garden

A custom, buildless garden maintenance website personalised for Uncle Dusty. See DESIGN-PLAN.md for the creative direction, visitor journey, interaction specifications, and image-generation prompt.

## Run

From this directory, run `node server.mjs` and open http://127.0.0.1:4173. JavaScript syntax check: `node --check dist/app.js`. No dependencies or build step required. Deploy the `dist` directory as a static website.

## Hosting

Keep this website in the local checkout and the public GitHub repository at https://github.com/arunpaul93/uncle-dustys-garden. The default branch is `master`. GitHub Pages hosts the website at uncledustys.com.au. The workflow in `.github/workflows/pages.yml` publishes `dist/` when website files change on `master`, and can also be run manually. Do not create or publish a ChatGPT Site for this project.

The deployment runs `node scripts/version-assets.mjs` to fingerprint the CSS and JavaScript URLs, preventing browsers from pairing new markup with older cached styles. Run the same command after local asset edits to update the references in `dist/index.html`. The mascot's essential layer positioning and clip paths stay in the HTML with their matching markup.

## Features

- Responsive garden palette, handwritten accents, a mascot and clear service cards.
- Local WebP garden photograph and an interactive Uncle Dusty mascot with a coordinated elbow-and-wrist wave on tap before opening an About us dialog.
- Four visible service cards with contextual enquiry actions, followed by the process, contact details and practical FAQs.
- Single-page enquiry with job details, required contact name and phone, optional email, prefilled office-team email draft, and plain-text download.
- Canvas lawn game with pointer, touch, arrow-key and guided-stripe controls; a larger completion banner appears above the finished lawn.
- Mowing game below the business content, plus optional Australian seasonal notes with four distinct icon tabs and keyboard controls.
- Reduced-motion support, native modal focus management and form validation.

## Business configuration still needed

Brand and contacts were supplied by the user: Uncle Dusty?s Garden, 0483 313 425, support@uncledustys.com.au. The service area has not been supplied and is not claimed. Confirm the waste policy. No prices are calculated or displayed in the enquiry form. The job sheet prepares a mailto draft; the visitor must send it from their mail app. Nothing is submitted automatically, persisted, or booked. Downloads are a fallback for devices without a configured mail app. The mascot is an illustrated brand character and the garden photo is illustrative, not a documented client project.

## Source

`dist/index.html`: content and semantics. `dist/style.css`: original noticeboard system. `dist/dusty.css`: Uncle Dusty branding and responsive personalisation. `dist/practical.css`: clearer service cards, restrained headings and business-first layout. `dist/quote.css`: base quote sheet styling. `dist/app.js`: interactions. `.github/workflows/pages.yml`: GitHub Pages deployment configuration.
