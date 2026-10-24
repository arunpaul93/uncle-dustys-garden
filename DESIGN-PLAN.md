# Mow Bros — design and implementation plan

## Intent
Turn a practical garden service into a memorable local brand. Visitors should understand the services, enjoy a small moment of play, and leave with a useful quote request. Brand name is inferred from the workspace. No address, phone number, crew history, customer review, accreditation, service area, or real price has been supplied; do not manufacture them.

## Creative direction: the outdoor good life
An independent garden club, with the confidence of a vintage workwear label. Warm cream, deep forest green, acid lime, and a small terracotta accent. Oversized Bricolage Grotesque headlines meet quieter DM Sans body copy and handwritten-style garden annotations. Use generous editorial space, thin rules, asymmetry, one beautiful garden photograph, and custom SVG botanical details. Avoid gradient panels, floating UI dashboards, repetitive feature cards, fake ratings, and gratuitous animations.

## Visitor journey
1. Header: recognisable mower wordmark, concise anchor navigation, quote action.
2. Hero: “Less chore. More outdoors.” Arch-topped garden image, playful lawn-care stamp, and clear primary action.
3. Brand ribbon: a short typographic beat communicating the service categories.
4. Services: numbered, expandable rows with specific inclusions and contextual quote actions.
5. Lawn playground: pointer/touch mowing with progress; keyboard arrows and a guided-mow button provide equivalent access. Reset supports replay.
6. How we roll: three concrete steps, presented as an editorial sequence.
7. Seasonal field notes: four accessible tabs with distinct seasonal priorities; general Australian guidance with no unsourced horticultural instructions.
8. Closing enquiry prompt, useful FAQ, and honest footer.

## Interaction specifications
- Quote dialog: three steps, service selection, lawn size, visit frequency, live illustrative AUD estimate, then validated contact details. Create a downloadable text request, with explicit confirmation that nothing was sent. Keep entered personal details only in memory, with no persistence or network submission.
- Services: native details/summary, open first row initially, quote buttons preselect a service.
- Lawn canvas: deterministic grass field, cell-based cut progress, drag to mow; interpolate pointer positions to avoid gaps; keyboard navigation, accessible progress, guided action, reset, completion state.
- Garden notes: tabs with keyboard navigation, current season initially selected according to Australian months, focus management and ARIA relationships.
- Mobile: compact menu, stacked hero, finger-friendly buttons, fluid heading sizes, no horizontal overflow.
- Motion: subtle hover and enter transitions only, honour reduced-motion preferences.

## Technical choices
Buildless static HTML, CSS, and ES modules. No unnecessary framework or dependencies. Local Node server for preview. Local custom generated garden asset, SVG brand illustrations. CSS grid/flex layouts, native dialog, browser form validation, canvas at device pixel ratio. Font fallbacks remain functional if Google Fonts is unavailable.

## Validation and delivery
Check JavaScript syntax and static asset routes. Browser QA at desktop and mobile sizes, verify quote validation and all steps, download generation, services, seasonal tabs, mobile menu, mowing progress and reset. Inspect screenshots for spacing, clipping, contrast, image balance, and overall character. Publish as an owner-private Site through the supported Sites workflow. Report any deployment or verification limits accurately.

## Image production record
Built-in image generation. Asset: dist/assets/garden-hero.webp.
Prompt: Premium editorial film photograph of an immaculately striped lush green Australian suburban backyard lawn in soft late-afternoon sunlight. Vintage dark forest-green walk-behind mower with orange-red wheels in right foreground, complete handle visible. Leafy trees, white daisies, lavender, ornamental grasses, garden borders, low timber fence. Wide 3:2 framing, realistic grass, warm natural colours, subtle grain. No people, text, logos, watermarks, or dominant buildings. This is illustrative brand photography, not a documented client project.
