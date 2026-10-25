# Uncle Dusty’s Garden — brand notes

## Current content direction

Uncle Dusty may not attend every job. Do not use “a familiar face” or imply that customers will always meet him or receive the same gardener. The hero mascot has no attendance-related caption.

The mascot is an accessible About us button. Activating it plays a 1.05-second coordinated elbow-and-wrist wave while the torso stays still, then opens the About us dialog. Hover/focus no longer tilts the character, and the dialog image does not nod. Reduced-motion visitors open the dialog immediately. Repeated taps are ignored during the wave; Escape or opening the enquiry form cancels a pending wave. Modal close controls and focus restoration remain supported. The About us copy describes the business without an explicit disclaimer about who attends jobs, as requested by the user; do not invent a biography or imply personal attendance.

The game completion banner appears above the finished lawn, uses larger type and receives focus when all cells are cut. Reset hides it again. The cream background and paper panels have subtle darker shading/shadows. Spring, Summer, Autumn and Winter use flower, sun, leaf and rain-cloud icon buttons with a clear selected state. The contact card heading is “Contact us”. Existing photos and the four-field email-draft enquiry remain unchanged.

Keep the headline, palette, existing images, mascot and mixed photo arrows. Use practical service wording, neutral business voice and fewer slogans. Do not imply that the illustrated mascot is the person attending jobs or that a separate office team exists. The homepage order is hero, services, process, contact, FAQs, game, then optional seasonal tips. The enquiry still has four fields and prepares an email draft; no backend or photo uploads have been added. Genuine photos, reviews, service-area claims and trust credentials remain deferred until supplied by the user. Host only locally and on GitHub Pages; do not create or publish a ChatGPT Site.

User-selected name: Uncle Dusty’s Garden. Headline: The grass is greener over here.

Business phone: 0483 313 425. Enquiry address: support@uncledustys.com.au. No service area or approved rates supplied.

The illustrated Uncle Dusty is a brand mascot, not a likeness or biography of a real person. No claims of qualifications, insurance, reviews, service history, or local coverage have been invented.

The quote job sheet prepares a mailto draft addressed to the supplied business email. The visitor reviews and sends it in their mail application. No email was sent by the assistant. A download is available for devices without a configured mail application. The enquiry form does not calculate or display prices.

## Image production

### Hand-wave artwork

Built-in `image_gen` edit of `dist/assets/uncle-dusty.webp`, saved as `dist/assets/uncle-dusty-wave.webp` (1254 × 1254, alpha transparency). WebP conversion changes only the file format. CSS clips the generated image into a stationary torso, a forearm group pivoting at the elbow, and a hand layer pivoting at the wrist; the original artwork remains available for the dialog.

Generation prompt: Use case: precise-object-edit. Asset type: transparent website mascot animation source. Edit target: the supplied Uncle Dusty illustration. Make exactly one change: replace the raised thumbs-up hand on the RIGHT side of the image with a relaxed friendly OPEN PALM greeting, all five fingers visible, palm facing the viewer, ready to wave at the wrist. Preserve the same face, hat, hair, expression, shirt, apron, trowel, lower hand, pose, framing, palette and hand-inked print texture. Keep the raised forearm in its current position; only the hand changes. Hand should be entirely to the right of the head, with a little clear space between the open hand and hat. Keep the complete open hand inside the canvas. Preserve the original square composition and transparent background. One single character, not a sprite sheet. No text, no motion marks, no extra accessories. Actual alpha transparency.

Built-in image-generation tool. Final project asset: `dist/assets/uncle-dusty.webp` (1254 × 1254 RGBA, transparent). Original PNG retained at the tool’s generated-images location; WebP is a format-only optimisation preserving transparency. Garden photograph retained from the original design.

Full mascot prompt:

Use case: illustration-story. Asset type: transparent website brand mascot for Uncle Dusty's Garden, a cheerful Australian garden maintenance business. Create a single original charming hand-inked vintage gardener character, a kindly middle-aged uncle with a gently weathered friendly face, dark friendly eyes, a broad easy grin, a small bushy grey moustache and grey sideburns, soft round nose, wearing a slightly floppy broad-brim ochre gardening hat, faded denim blue work shirt with rolled sleeves, a forest-green gardening apron with a single small white daisy tucked into its chest pocket. Waist-up portrait, one hand resting on a short wooden-handled garden trowel at waist, the other hand giving a relaxed small thumbs-up near shoulder. Three-quarter view, character looks toward viewer. Flat limited screen-printed colors, confident irregular dark forest-green pen outlines, subtle natural ink grain, cream highlights, terracotta and muted ochre accents; old garden centre seed-packet illustration meets friendly contemporary editorial cartoon. Masculine uncle but gentle and welcoming, not a caricature of any actual person. Keep entire hat and hands within the frame, centered, clear silhouette, generous transparent margins. No background, no framing badge, no text, no lettering, no logos, no photorealism, no 3D, no shiny vector gradients. Transparent background, high-quality isolated cutout, approximately square format.

## Validation

JavaScript syntax validation passed. Desktop and phone hero reviewed. Enquiry field validation, contact entry, office-team mailto recipient/body, and branded download checked. Seasonal keyboard controls, mowing completion and reset checked. Phone and email destinations verified without placing calls or sending messages. Responsive layouts reviewed at 1440, 768, 390 and 320 pixels with no horizontal overflow. Mobile menu, contact navigation and native dialog layout checked. Seasonal tabs and tablet sign-off spacing corrected after visual review.


## Contact voice

Dusty remains the illustrated brand character. Calls, quote requests, email drafts, and booking enquiries are handled by the office team. Contact actions use neutral team wording; no copy promises that Dusty personally answers calls or confirms bookings. The phone number, admin email, chosen headline, and character artwork are unchanged.

## Simplified enquiry and level layout

The enquiry now has only four fields: job details, required contact name, required contact number, and optional email. There are no service-selection steps, size/frequency fields, price calculations, or estimates. Contact details and job notes are included in the office-team email draft and download. All tilted text, paper panels and controls are level; handwriting, character art and drawn arrows remain.

Validation of the simplified form: required details/name/phone checked; invalid phone and invalid supplied email blocked; blank email accepted; valid supplied email included; office recipient and phone included in draft; downloaded enquiry contains no estimate; computed transforms on form fields and paper panels are level.

## Mow-o-meter completion

Completion requires every lawn cell to be cut. Incomplete percentages round down, and the mower stays visible until the final patch is cut. The success panel sits below the lawn so the finished stripes remain visible.

Regression verified in the browser: seven guided stripes show 96%, keep mowing enabled, and hide the celebration; the eighth stripe shows 100%, disables guided mowing, and reveals the success panel below the fully cut lawn. Reset returns to 0% and hides the panel. Completed desktop and 390-pixel mobile layouts reviewed; mobile has no horizontal overflow. JavaScript syntax check passed.
