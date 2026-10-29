# Uncle Dusty’s Garden — brand notes

## Heading punctuation

Use headings without full stops, including the hero, section titles, dialogs, game labels and seasonal titles. Keep normal sentence punctuation in body copy.

## Current mascot (29 October 2026)

Use the illustrated man from the user-supplied Uncle Dusty's signature: orange-brown broad-brim hat with a green band, full grey and white beard, olive collared shirt and folded arms. The transparent asset is `dist/assets/uncle-dusty-signature.webp` (1275 x 1234, RGBA). It appears in the hero, footer and About us dialog. The navigation uses the matching mowing pose described below. The hero remains an accessible button that opens About us immediately; the previous layered hand-wave animation has been removed to preserve the supplied pose.

The built-in image generation tool isolated the character from the supplied signature. All lettering, contact details and decorative artwork were excluded. Conversion to WebP changes the file format only and retains alpha transparency. The existing garden photograph, business content and contact details are retained.

The local checkout is `uncle-dustys-site`. GitHub is `arunpaul93/uncle-dustys-garden`, with `master` deployed to uncledustys.com.au through GitHub Pages. Saved deployment archives also use Uncle Dusty's naming. Keep email DNS unchanged and do not create or publish a ChatGPT Site.

The current brand is Uncle Dusty's Garden, with 0483 313 425 and support@uncledustys.com.au. Do not invent attendance promises, biography, reviews, credentials or service coverage. Enquiries prepare an email draft that the visitor reviews and sends.

Validation: JavaScript syntax and local asset references pass. The page and mascot return HTTP 200, with the mascot served as image/webp. Checked layouts at 1440, 768, 390 and 320 pixels without horizontal overflow. All four mascot instances load. Pointer and keyboard activation open About us, Escape restores focus, About us hands off to the enquiry form, and the mobile menu opens and closes. Browser console has no warnings or errors.

## Animated navigation logo (29 October 2026)

The navigation combines the existing character artwork with an SVG animation rig. Uncle Dusty looks ahead, turns toward the viewer, and looks back along the mowing path while the mower clears vector grass to reveal the complete wordmark. The animation loops automatically: grass grows back for 1.4 seconds, the 3.9-second mowing pass reveals the name, and the complete wordmark rests for 2.4 seconds before the next cycle. The final pose looks toward the viewer. A separate pause/resume button stops the motion while keeping the complete logo visible. Reduced motion and a failed image load show a static logo; hidden tabs suspend the loop, while returning to the tab or resizing restarts it safely. The accessible home label is available throughout. The mown path is completely clear: no short grass strip or flying clippings cover the Care & Maintenance tagline.

Artwork source: `dist/assets/uncle-dusty-walking-strip.webp` (2172 x 724 RGBA; four 543 x 724 cells, 262070 bytes). Use the original illustrated trouser legs and boots, as requested by the user; the code-drawn articulated legs have been removed. The four original leg poses advance every 180 ms during the push, while the upper body and mower remain fixed and the head uses the existing four angles. The mower stays level; wheel holes rotate independently inside perspective-matched hubs according to rolling distance and each tire's radius. The short acceleration remains. Both boots stay inside the desktop and phone navbar. The original mowing portrait remains the no-script / failed-load fallback. No new raster artwork was generated for this restoration.

Current motion validation: the wheel rolling-distance test and JavaScript syntax checks pass. Browser review confirms the original illustrated leg layer, absence of code-drawn legs, changing leg frames and rotating wheel hubs, desktop and phone layouts, pause/resume and a clear tagline after mowing. Tests for the removed articulated-leg geometry have also been removed.

Loop validation: desktop, 390-pixel and 320-pixel browser checks pass without horizontal overflow or menu overlap. Automatic repetition reached eight cycles without interaction. Grass growth scales upward as the wordmark fades, then mowing reveals it again. Pause restores the complete logo; resume starts another growth cycle. The mobile menu still opens and closes, the narrow text box fits, and the console has no warnings or errors. A Node DOM harness passed growth, mowing, head turns, readable hold, second-cycle scheduling, pause/resume, hidden-tab suspension, reduced motion, resize recovery and asset-failure checks. JavaScript syntax and whitespace checks pass.

Walking correction validation: syntax and diff checks pass. Browser checks show changing body background positions during mowing, visible boots at 1280 and 320 pixels, no horizontal overflow, working pause/resume, a clear tagline with no grass remnants, repeated cycles and no console warnings or errors.

Walking correction prompts (built-in image generation edit mode):

> Use case: precise-object-edit. Asset type: four-frame transparent website walking animation sprite strip. Edit target: supplied Uncle Dusty mowing strip. Correct ONLY the trouser legs and brown work boots BELOW the belt so the gardener visibly WALKS to the RIGHT while pushing the mower. Current legs are almost identical and look stationary. Make a clear four-phase looping gait: cell 1 near leg stretched FORWARD to the right, far leg stretched BACK to the left; cell 2 near leg passes UNDER the hip, far knee bent with boot lifted; cell 3 near leg stretched BACK to the left, far leg stretched FORWARD to the right (OPPOSITE cell 1); cell 4 near knee bent with boot lifted, far leg planted UNDER the hip (OPPOSITE cell 2). Both legs swap leading/trailing roles. Exaggerate the stride and lifted heels enough to read at 90px character height. Exactly TWO anatomical legs and TWO boots per frame. Keep the hip attachment fixed and a consistent ground baseline. Preserve the EXACT supplied 2172x724 canvas, FOUR equal 543x724 cells, fixed character scale and alignment, alpha transparency, the mower in precisely the same position, wheel geometry, hands, arms, green shirt, belt, face, orange hat and the existing distinct head direction in each cell. Change NOTHING above the belt or on the mower. Boots and entire silhouette fully inside each cell. No grass, ground, shadow, background, text, labels, separators, extra frames, motion marks or added props. Output one four-cell horizontal sprite strip with real transparent background.

Final targeted gait edit:

> Use case: precise-object-edit. Edit target: supplied four-cell Uncle Dusty walking strip. The first TWO frames are good. KEEP ALL ARTWORK in cells 1 and 2 EXACTLY unchanged. Change ONLY the LEGS BELOW THE BELT in cells 3 and 4. They currently repeat cells 1 and 2, which makes him hop. We need the OPPOSITE half of a real walking cycle. In CELL 3 (third from left): the NEAR leg, which is drawn in front of the other trouser leg, must extend BACKWARDS DOWN-LEFT from the hip to a brown boot planted to the LEFT of his body; the FAR leg must extend FORWARDS DOWN-RIGHT to a brown boot to the RIGHT of his body, partially behind the mower. In CELL 4 (rightmost): the NEAR leg bends at the knee and lifts its boot FORWARD to the RIGHT, while the FAR leg is straight and planted beneath the hip. Make these last two leg silhouettes CLEARLY DIFFERENT from cells 1 and 2. Exactly two legs and two boots per cell, dark charcoal work trousers and brown boots, natural hip joints. Ground baseline and fixed belt position identical. Preserve ALL other pixels: mower, wheels, hands, torso, heads, hats, faces, distinct head directions, positioning and scale. Preserve original four equal horizontal cells and same canvas dimensions, no extra frame. Real alpha transparency, no grass, shadow, background, text, grid or labels.

Previous walking-strip prompt:

> Use case: identity-preserve. Asset type: transparent 4-frame animation sprite strip for a website navigation logo. Transform the supplied Uncle Dusty mowing mascot into FOUR animation frames in one horizontal row of FOUR EQUAL SQUARE CELLS, overall canvas aspect ratio exactly 4:1. Each frame shows the SAME full-body Uncle Dusty in a RIGHT-FACING SIDE VIEW pushing the SAME walk-behind lawnmower to the RIGHT. This is a different angle from the frontal reference: gardener on the left of each cell, mower on the right, both hands connected to the mower handle. Preserve his recognizable smiling grey-and-white bearded face, orange broad-brim hat with dark green band, olive rolled-sleeve collared shirt, warm skin colors and bold dark cartoon outlines. Add dark work trousers and brown work boots. Keep the face in a slight three-quarter side profile so his friendly expression is visible. Four consecutive simple walking-cycle poses: frame 1 leading boot forward, frame 2 legs passing, frame 3 opposite boot forward, frame 4 legs passing back to frame 1. Keep the hat, head, torso, hands, mower and mower handle in exactly the same place in every cell; only the legs and wheel-spoke angle change. Keep the mower wheels on exactly the same ground baseline across all cells. Mower compact dark forest-green with orange wheels, side profile, all details consistent. The complete man and complete mower must fit inside every square cell, with identical modest transparent margins, identical scale, no overlaps across cell boundaries. Simple clean shapes readable at small navbar size. Real alpha transparency around every figure and between cells. No text, numbers, arrows, grid lines, frames, backgrounds, grass, ground shadow, extra people, or props. One sprite strip, precisely four equally spaced frames, not four separate images.

Final head-turn edit prompt:

> Use case: identity-preserve. Edit target: the supplied FOUR-frame mowing sprite strip. Keep the EXACT same canvas dimensions, four equal horizontal cells, transparent background, character scale, cell alignment, ground baseline and ALL artwork below the neck in every cell. Preserve each existing walking pose, both hands, mower, trousers and boots exactly. Change ONLY the direction of Uncle Dusty's HEAD and hat ABOVE the base of the neck to create a natural head-turn sequence. Cell 1 (leftmost): clear RIGHT-FACING PROFILE, nose and gaze pointing right down the mowing route, only one eye strongly visible. Cell 2: head turning halfway toward the viewer, a distinct three-quarter view. Cell 3: head facing the VIEWER directly with both eyes visible and a warm smile, while his BODY stays right-facing and pushing the mower. Cell 4 (rightmost): head halfway turning back toward the right, three-quarter view. The head orientation must visibly differ across the four cells. Rotate the orange brimmed hat WITH his head. Preserve the same facial identity, grey-white beard, eyebrows, hat, colors, outline style and friendly expression. The base of the neck and collar must remain perfectly fixed at the same coordinates in all cells so head and torso layers can be animated independently. Do not move or resize any figure or mower; do not alter the leg poses or anything below the neck. No text, no labels, no grid, no extra frames. Preserve real alpha transparency. Output one horizontal strip with the same four-cell composition.

## Previous navigation avatar (superseded by the animation above)

The header uses `dist/assets/uncle-dusty-mowing.webp` (1254 x 1254, RGBA), showing the same Uncle Dusty holding a walk-behind mower. The built-in image generation tool edited the signature mascot; WebP conversion preserves transparency and the generated composition. Navigation sizing is 94 x 82 pixels on desktop, 68 x 63 on phones and 55 x 55 on narrow phones. The brand link keeps its accessible home label.

Navigation validation: the avatar loads and the header has no horizontal overflow at 1280, 390 and 320 pixels. The brand and menu controls do not overlap. The mobile menu opens and closes. JavaScript syntax and diff whitespace checks pass.

Final generation prompt:

> Use case: identity-preserve. Asset type: compact transparent website navigation avatar. Edit the supplied Uncle Dusty mascot into a friendly action pose using a walk-behind lawnmower. Preserve this exact character's smiling face, full white and grey beard, dark eyebrows, orange-brown broad-brim gardening hat with a dark green band, olive green rolled-sleeve collared shirt, warm colors and bold dark cartoon outlines. Change only the pose and add the lawnmower: both hands naturally gripping the mower handle, Uncle Dusty standing behind and pushing a compact dark forest-green lawnmower with orange wheels. Three-quarter front view, face and hat clearly visible and large, compact balanced near-square silhouette designed to remain recognizable as a small navbar avatar. Show head, upper body, both hands, handle and the complete mower with its wheels; lower legs may be hidden behind mower. Keep all hat and mower edges inside the image with tight but safe transparent margins. Make the mower clearly recognizable and visibly connected to his hands through its handle. Same polished flat cartoon illustration as the reference, simple large shapes. Real alpha-transparent background, no white rectangle, no badge, no grass patch or scenery, no text, no other people, no extra tools, no apron, no watermark.

## Historical implementation notes (superseded where different above)

## Current content direction

Arm-joint correction: the stationary body mask follows the inside sleeve edge and extends under the moving elbow, keeping the cuff connected at both ends of the wave. The hand mask follows the thumb/wrist outline to exclude detached shoulder pixels. Checked enlarged neutral, inward and outward wave poses against a contrasting background before publication.

Mascot cache regression: its structural layer geometry is intentionally in `dist/index.html`, alongside the matching layer markup. The body, forearm and hand must all be absolutely positioned and clipped in one frame, including when an older `practical.css` is cached. Deployment fingerprints the entry CSS and JavaScript references using `scripts/version-assets.mjs`. Verified with the prior wrist-only stylesheet deliberately loaded: no duplicate figures; current styles still animate the elbow and wrist before About us opens.

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
