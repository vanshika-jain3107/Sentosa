# Vibe Coding Guide — Sentosa, The Coffee Unit (Single-Page Cafe Landing)

This guide contains a series of **9 sequential prompts** for building an editorial, non-templated single-page landing site for a real Jaipur cafe.

Feed the prompts to an AI coding assistant (Claude, Gemini, ChatGPT, Cursor) **one at a time, in order**. Each prompt is creative + technical *direction* — layout logic, motion behaviour, copy tone, spacing rules. The AI writes the code; this document never does.

**Recommended stack:** Next.js 15+ (App Router) + TypeScript + Tailwind CSS + Framer Motion + GSAP ScrollTrigger + Lenis smooth scroll. Single route (`/`) with anchored sections.

---

## Business Context (real data — do not invent facts)

| Field | Value |
|---|---|
| Name | Sentosa – The Coffee Unit |
| Address | Haldighati Marg, near HDFC Bank, Sector 26, Pratap Nagar, Jaipur, Rajasthan 302033 |
| Rating | 4.0 ★ (49 Google reviews) |
| Price range | ₹400–600 per person |
| Hours | Open daily · closes 10:00 PM |
| Brand line | Cozy, contemporary space made for good coffee, great food, and even better moments. |

**Review themes to paraphrase (never fabricate new quotes):** fresh baked items, warm ambience, delicious food, cooperative and attentive service.

**Brand voice:** warm, unhurried, second-person, slightly literary. Short sentences. No exclamation marks. Never say "premium experience," "your perfect cup awaits," or "we serve the best coffee in Jaipur."

---

## Design System (fixed — do not alter)

**Colors**

| Token | Hex | Role |
|---|---|---|
| `--ivory` | `#F5EFE5` | Main background |
| `--cream` | `#FBF8F2` | Alternate section background |
| `--espresso` | `#292621` | Primary text / nav |
| `--sage` | `#737965` | Secondary accents |
| `--terracotta` | `#C94B45` | Brand accent, buttons, highlights |
| `--sand` | `#C9A77D` | Decorative elements, rules, numerals |
| `--charcoal` | `#45423D` | Secondary text |

**Typography**

- **Display:** Fraunces (variable) — use `opsz` axis deliberately: high optical size (96–144) for large headlines so serifs stay delicate; low optical size (9–14) for small caps labels so they stay sturdy. Italic cut is a *narrative* tool, used on one emphasised word per headline, never on the whole line.
- **Body/UI:** Instrument Sans — 400 for body, 500 for UI, letter-spacing `0.08em` uppercase for eyebrow labels.

---

# Global Motion & Interaction Principles

> **Student/Dev Action:** Read this section before running Step 1. Every later prompt refers back to these tokens by name.

### Easing curves (define once, reuse by name — never use `ease`, `ease-in-out`, or `linear` defaults)

| Name | Curve | Used for |
|---|---|---|
| `easeSteam` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances, reveals — fast start, long settle |
| `easePour` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetric transitions, tab switches |
| `easeSettle` | `cubic-bezier(0.34, 1.26, 0.64, 1)` | Micro-interactions with a slight overshoot |
| `easeDrift` | `cubic-bezier(0.83, 0, 0.17, 1)` | Slow parallax and horizontal scroll |

### Pacing philosophy

- **Unhurried, not slow.** Base durations: micro-interaction `180–260ms`, element entrance `600–900ms`, full section choreography `1.2–1.6s`.
- **Stagger is the signature.** Nothing enters as a block. Children stagger `40–90ms` apart, and the stagger *direction* changes per section (left-to-right in Hero, centre-out in Menu, bottom-up in Gallery).
- **Each section has one motion identity.** Hero = layered depth. About = horizontal wipe. Menu = crossfade + mask. Gallery = velocity-reactive drag. Booking = focus/state morph. Contact = draw-on. Footer = settle. Never reuse a section's signature move elsewhere.
- **Scroll library:** Lenis for smooth scroll (`lerp ≈ 0.08`), GSAP ScrollTrigger for pinned/scrubbed sequences, Framer Motion for component-level state and hover.
- **Scrub vs trigger:** anything tied to background position, horizontal movement, or scale is *scrubbed* to scroll progress. Anything tied to text is *triggered once* at `start: "top 75%"` and never replays.
- **Respect `prefers-reduced-motion`:** all transforms collapse to a 200ms opacity fade; parallax and horizontal scroll become static layouts.

---

# Prompt Sequence

### Step 1: Scaffolding, Design Tokens & Motion Primitives

> **Student Action:** Copy the prompt below to start the project. This step produces zero visible pages — it builds the vocabulary everything else depends on.

```text
Initialize a Next.js 15+ project with TypeScript, App Router and a `src` directory in the current folder. Install: `tailwindcss`, `framer-motion`, `gsap`, `lenis`, `lucide-react@0.475.0`, `clsx`.

1. Load fonts via next/font/google: Fraunces (variable, include the optical-size and italic axes) and Instrument Sans (400, 500, 600). Expose them as CSS variables --font-display and --font-body.
2. Extend the Tailwind theme with these exact brand tokens — ivory #F5EFE5, cream #FBF8F2, espresso #292621, sage #737965, terracotta #C94B45, sand #C9A77D, charcoal #45423D. Do not add any other colors anywhere in this project.
3. Define four named easing curves as both Tailwind timing functions and exported JS constants for Framer Motion:
   easeSteam (0.22, 1, 0.36, 1), easePour (0.65, 0, 0.35, 1), easeSettle (0.34, 1.26, 0.64, 1), easeDrift (0.83, 0, 0.17, 1).
4. Build a 12-column CSS grid utility with asymmetric gutters: 28px on mobile, 40px on tablet, and an intentionally uneven page margin on desktop — 8vw on the left, 5vw on the right. This off-centre margin is a deliberate design decision; keep it consistent site-wide.
5. Create a global film-grain overlay: a fixed, non-interactive layer above the background and below content, at roughly 4% opacity, using an inline SVG turbulence filter. It must never intercept pointer events.
6. Create reusable animation primitives in src/lib/motion.ts: a MaskedLine component that reveals text by animating a clip-path from bottom to top with per-line stagger; a SplitWords helper that wraps each word in a span for staggered animation; and a useScrollVelocity hook that returns normalised scroll velocity for later use.
7. Create a SmoothScroll client wrapper using Lenis with lerp 0.08, and register GSAP ScrollTrigger so it syncs with Lenis. Wrap the root layout with it.
8. Add a global reduced-motion guard: when prefers-reduced-motion is set, all transform-based animations collapse to a 200ms opacity fade.

Do not build any page sections yet. Once done, print Tasks Finished.
```

---

### Step 2: Navigation & Hero — "Slow mornings"

> **Student Action:** Build the full-bleed hero and the nav that reveals over it.

```text
Build the site navigation and hero section for a cafe landing page called "Sentosa – The Coffee Unit".

NAVIGATION
- Layout: not a centred pill and not a full-width bar with evenly spaced links. Place the wordmark at the far left in Fraunces at low optical size with tight tracking; place the links (About, Menu, Gallery, Book, Contact) in a single cluster pushed to the right, separated by thin sand-colored vertical rules rather than spacing alone.
- Reveal: on first load the nav does not exist. After the hero's first headline line lands (~900ms), the nav slides down from -100% with easeSteam over 700ms, and the links fade in staggered 60ms apart, left to right.
- On scroll past the hero, the nav does not simply "become sticky with a shadow". Instead it contracts: height reduces by 30%, the wordmark shrinks and the background transitions from transparent to a blurred ivory with 88% opacity. Transition with easePour over 400ms.
- Link hover: a terracotta underline that grows from the left on enter and exits to the right on leave (two different directions — never a symmetric grow-from-centre). Simultaneously the label shifts up 2px.
- Mobile: a full-screen overlay menu in espresso with links in Fraunces at 44px, entering as a staggered mask-reveal from the bottom. The toggle icon morphs rather than swapping icons.

HERO
- Layout: full-bleed and asymmetric. The headline block sits in columns 1–7 and is vertically anchored to the lower third, not centred. A tall portrait-crop image occupies columns 8–12 and deliberately bleeds past the right viewport edge so it is clipped. Leave a large, confident block of empty ivory in the upper-left quadrant — that emptiness is the design.
- Imagery: three layered elements moving at different scroll speeds — a wide background photo of the cafe interior in warm low light (scrubbed parallax, y moves 0 to -12%), the main portrait-crop coffee/counter image (y 0 to -5%), and a small circular cut-out detail image (steam, a cup rim, a hand) pinned near the headline moving y 0 to +8% so it drifts against the others. Apply a subtle warm grade to all imagery so nothing reads as cold stock photography. Use easeDrift for all parallax.
- Typography: eyebrow label in Instrument Sans uppercase 12px, 0.08em tracking, sage, reading "Pratap Nagar · Jaipur". Headline in Fraunces at clamp(56px, 8vw, 132px), optical size high, line-height 0.92, with the second line indented by roughly 2ch so the left edge is intentionally ragged. Set exactly one word in Fraunces italic.
- Copy: headline "Slow mornings, / strong coffee." with "Slow" set in italic. Subtext, Instrument Sans 18px charcoal, max-width 46ch: "A corner of Pratap Nagar where the cup is unhurried and the seat is yours for as long as you need it."
- Entrance: headline animates as a per-line mask reveal (clip-path bottom to top), 900ms, easeSteam, 120ms apart between lines. Subtext fades and rises 16px after a 400ms delay. Images do not fade in — they scale from 1.06 to 1 over 1.4s with easeDrift while their masks wipe open from the bottom edge.
- Primary button: "See the menu" in terracotta with ivory text, rectangular with a 2px radius — not a pill. On hover, the label slides up and is replaced by a duplicate label sliding in from below (vertical label swap inside a fixed-height mask), while the background darkens 8%. 240ms, easeSettle.
- Scroll cue: NOT a bouncing arrow. Render a slim vertical sand-colored line, 64px tall, fixed near the bottom-left of the hero, with a terracotta dot travelling down it on a 2.4s loop, and a rotated uppercase label reading "keep going" set vertically beside it. The whole cue fades out once scroll passes 12% of viewport height.

Once done, print Tasks Finished.
```

---

### Step 3: About — Editorial Split with a Detail Strip

> **Student Action:** This section carries the brand story and the real business stats, styled as design elements.

```text
Build the About section for Sentosa.

- Background: soft cream #FBF8F2, creating a visible but gentle break from the ivory hero. The boundary between them should not be a straight edge — offset it with a shallow diagonal or a wide sand-colored hairline that sits slightly off-horizontal.
- Layout concept: a two-column editorial split that refuses to be 50/50. Text occupies columns 1–5, image columns 7–12, and the image sits roughly 80px lower than the text baseline so the two columns are deliberately unaligned. A large Fraunces numeral "01" in sand at 180px sits behind the text block at 12% opacity, half-cropped by the left page margin.
- Typography: section eyebrow "About the unit" in uppercase sage. Heading in Fraunces 48–64px, two lines, with a pull-quote-scale italic line breaking out of the text column and extending into the gutter. Body copy in Instrument Sans 17px, charcoal, line-height 1.75, max-width 52ch, set in two short paragraphs rather than one block.
- Copy: heading "We built Sentosa around / the pause." Body: "Good coffee, food worth finishing, and a room that doesn't rush you. Some people come here to work, some to talk for three hours, some to sit alone with a cup and say nothing at all. All of it counts. Pull up a chair, order something warm, and stay as long as the day allows."
- Imagery: a single tall interior photograph with a soft warm duotone drawn from espresso and sand, overlaid with the global grain. Mask it with a subtle torn or irregular bottom edge rather than a clean rectangle. Add one small overlapping detail image — a pastry or a saucer — offset to the lower-left of the main image, breaking its boundary.
- DETAIL STRIP (must not look like plain text): a horizontal band beneath the two columns, separated by thin sand rules, holding three cells — "4.0 ★ / 49 Google reviews", "₹400–600 / for two", "Open daily / until 10 PM". Set each value in Fraunces at 34px espresso and each label in Instrument Sans 11px uppercase sage directly beneath. The strip spans the full content width and the rules extend past the text into the page margins.
- Motion signature (horizontal wipe — used nowhere else): as the section enters, the text column wipes in from the left via clip-path while the image column wipes in from the right, both 1s, easeSteam, image delayed 150ms. The background "01" numeral is scrubbed to scroll progress, drifting x from -30px to +30px across the section.
- The detail strip animates separately: the sand rules draw horizontally from left to right (scaleX 0 to 1, transform-origin left, 700ms easePour), then the three numbers count up from zero to their real values over 900ms, staggered 120ms apart. Numbers animate only once.
- Microinteraction: hovering any detail cell lifts its number 3px and fades in a one-line note beneath it ("as rated on Google", "approx. per person", "kitchen closes 9:30 PM"), 200ms easeSettle.

Once done, print Tasks Finished.
```

---

### Step 4: Menu — Category Switcher with Hover-Driven Image Reveals

> **Student Action:** Build the interactive menu. This must not be a static price list.

```text
Build the Menu section for Sentosa.

- Background: return to ivory #F5EFE5.
- Layout concept: a three-zone asymmetric grid. Column 1–2 holds a vertical category rail (Coffee, Cold Brews, All-Day Plates, Bakes, Sweet). Columns 3–8 hold the item list. Columns 9–12 hold a sticky image stage that stays fixed while the list scrolls. Rows are separated by full-bleed hairlines in sand that run past the list into the page margins, so the section reads like a printed menu card, not a set of cards on a grid.
- Category rail: vertical, left-aligned, in Fraunces 22px. The active category is espresso with a terracotta dot at its left; inactive ones are sage at 55% opacity. Switching categories moves a terracotta indicator bar vertically between items with easePour, 380ms — the bar travels rather than teleports.
- Item rows: name in Fraunces 24px, one-line description in Instrument Sans 14px sage, price in Instrument Sans 16px tabular numerals aligned right. Rows have generous vertical padding (28–32px). No boxes, no cards, no shadows.
- Hover reveal (the section's motion signature): hovering an item row fades and scale-swaps a corresponding photo into the sticky image stage — outgoing image scales to 1.04 and fades, incoming scales from 0.96 to 1, crossfading over 420ms with easePour. Simultaneously the hovered row's name shifts right by 10px, its price shifts left by 6px, and a thin terracotta rule draws beneath the row from the left. Non-hovered rows drop to 45% opacity — a focus dimming effect, not a highlight effect.
- Category switching: the item list does not fade as a block. Outgoing rows leave upward with a 30ms stagger, incoming rows enter from below with a 45ms stagger, both masked by their row height, 520ms, easeSteam. The sticky image stage crossfades to that category's default image.
- Cursor: inside the item list, the native cursor is replaced by a small terracotta circle with the word "look" in it, which scales up on row hover and follows with a lerp of 0.15 (trailing, not locked to the pointer).
- Typography detail: category names use Fraunces italic when active only — the italic swap itself is the state indicator.
- Copy: eyebrow "What's on" and heading "Everything here is made / to be lingered over." Below the list, a single sage line: "Prices are approximate. ₹400–600 covers two people comfortably."
- Mobile: the category rail becomes a horizontally scrollable row with momentum and edge fade; the sticky image stage moves to sit above the list and swaps on tap rather than hover.

Do not invent a full menu of fictional dishes with exact prices. Use a small, honest set of placeholder items per category with clear TODO comments so real menu data can be dropped in later.

Once done, print Tasks Finished.
```

---

### Step 5: Gallery — Horizontal Scroll with Magnetic Cursor

> **Student Action:** Build the gallery as a horizontal, velocity-reactive sequence.

```text
Build the Gallery section for Sentosa.

- Background: espresso #292621 — the only dark section on the page. Text within it is ivory; the terracotta accent gains intensity against it. This tonal inversion is the section's identity.
- Layout concept: a horizontally scrolling track, pinned with GSAP ScrollTrigger so vertical scroll drives horizontal movement across roughly 180vw. Images are of deliberately varied width and vertical offset — some 280px wide, some 520px — with some hanging above the centreline and some below. Never a uniform row, never a symmetrical masonry grid.
- Imagery: 8–10 photographs mixing interiors, hands and cups, bakes on the counter, and one or two wider room shots. Apply the global grain plus a slight warm lift in the shadows so the dark background does not crush them. Each image sits inside a mask with a 2px radius maximum.
- Velocity reaction: use the scroll-velocity hook from Step 1 — as horizontal scroll speed increases, images skew on the X axis by up to 4 degrees and scale down by up to 2%, returning to rest with easeSettle when motion stops. This is the section's motion signature.
- Magnetic hover: on hover, an image scales to 1.04 and translates up to 12px toward the cursor position (magnetic pull calculated from pointer offset within the bounding box), easing with easeSettle. A short caption in Instrument Sans 12px uppercase ivory fades in at its lower-left. Neighbouring images dim to 55%.
- Cursor: a custom ivory ring that scales up and fills with terracotta over images, with a thin "drag" label inside while the track is being dragged.
- Interaction: the track is also draggable with pointer/touch, with inertia on release. Add a slim horizontal progress rule in sand beneath the track that fills in terracotta as the track advances.
- Typography: the section heading is rotated 90 degrees and pinned to the left edge of the viewport, in Fraunces 28px ivory with wide tracking, staying fixed while the track scrolls past it.
- Copy: rotated heading "Ordinary afternoons, kept." Optional intro line above the track, ivory at 70%: "Regulars, corner seats, and whatever came out of the oven that morning."
- Mobile: fall back to a native horizontal snap-scroll carousel with the same varied heights; disable magnetic hover and velocity skew.

Once done, print Tasks Finished.
```

---

### Step 6: Book a Table — Editorial Form

> **Student Action:** Build the reservation form as part of the page composition, not a boxed widget.

```text
Build the "Book a Table" section for Sentosa.

- Background: soft cream #FBF8F2.
- Layout concept: the form is not a card. Fields are laid directly onto the page in a two-column editorial arrangement where a left column (columns 1–4) holds the heading and a short note, and the fields occupy columns 6–11 in a staggered rhythm — Name full width, then Date and Time as a 60/40 split, then Guests as a narrow field left-aligned with intentional empty space beside it, then a wide Notes field. That trailing empty space is intentional; do not fill it with a decorative image.
- Field styling: no boxes, no rounded input containers, no grey fills. Each field is a baseline — a 1px sand rule beneath a transparent input. The label sits on that baseline in sage and, on focus, scales down to 11px and travels up 22px while the rule thickens to 2px and turns terracotta, drawing from left to right over 320ms with easePour.
- Typography: heading in Fraunces 44–56px with one italic word. Inputs in Instrument Sans 18px espresso. Helper text 13px sage.
- Copy: heading "Save yourself / a seat." Note beneath it: "Walk-ins are always welcome, but a message ahead means the good corner table is waiting. We'll confirm on WhatsApp. Open daily until 10 PM." Submit label: "Hold my table".
- Validation: errors never appear as red boxes. An invalid field's rule turns terracotta and its helper line fades in beneath in terracotta at 12px, with a 3px horizontal nudge (two oscillations, 180ms, easeSettle) — restrained, not a shake.
- Motion signature (state morph — used nowhere else): on submit, the button label mask-swaps to a thin terracotta progress rule that fills left to right. On success, the entire form block wipes upward via clip-path over 600ms and is replaced in the same footprint by a confirmation composition: a Fraunces line "Table held. See you soon.", the submitted date and time rendered as large sand numerals, and a small terracotta circle that draws itself as an SVG stroke (600ms, easeSteam) with a check appearing after the circle completes. A quiet "Book another" text link sits beneath.
- Entrance: heading mask-reveals; each field's baseline rule draws from left to right, staggered 90ms apart, so the form appears to be ruled onto the page line by line.
- Buttons anywhere in this section use the same vertical label-swap hover established in the hero — consistency of micro-interaction is intentional even though section motion differs.

Wire the form to a placeholder submit handler with clear TODO comments for connecting a real endpoint or WhatsApp deep link. Include client-side validation and accessible labels.

Once done, print Tasks Finished.
```

---

### Step 7: Contact — Map, Address & Hours

> **Student Action:** Build the contact section with real business data.

```text
Build the Contact section for Sentosa.

- Background: ivory #F5EFE5.
- Layout concept: a 5/7 split — address and hours in columns 1–5, map in columns 7–12. The map deliberately bleeds off the right edge of the viewport, echoing the hero image treatment and bookending the page. Do not centre the map or give it a heavy border.
- Map treatment: an embedded map restyled to the brand — desaturated base, ivory landmass, sage water and parks, sand roads, espresso labels. It must not appear as a default blue-and-white Google map. Overlay the global grain at reduced opacity so it belongs to the same visual world.
- Interactive element: a custom pin drawn as an SVG that strokes itself into existence when the section enters (700ms, easeSteam), then breathes on a slow 3s loop — scale 1 to 1.06 with a soft terracotta halo pulsing behind it. On hover, the pin lifts 6px and a small ivory card fades in beside it showing "Sentosa – The Coffee Unit · Haldighati Marg" with a "Get directions" link that underlines from the left. The map itself desaturates slightly further on hover so the pin gains focus.
- Address block typography: address lines in Fraunces 20px espresso with generous line-height, split across lines as a poem would be — "Haldighati Marg, / near HDFC Bank, / Sector 26, Pratap Nagar, / Jaipur 302033". Hours beneath in Instrument Sans, with a live status chip that reads "Open now" in terracotta or "Closed" in sage, computed from the current time against a daily 10 PM close.
- Add a compact horizontal rule set: three stacked rows separated by sand hairlines for Phone, Email and Instagram, each row revealing an arrow that slides in from the left on hover while the label shifts 6px right.
- Copy: eyebrow "Find us". Heading "Haldighati Marg. / Look for the warm light." Sub-line: "We're open every day until 10 PM. Come hungry, or just come for the coffee."
- Motion: the address lines enter with a per-line mask reveal staggered 80ms; the contact rows draw their hairlines left to right; the map fades and scales from 1.03 to 1 over 1.2s with easeDrift, scrubbed lightly to scroll so it settles as the section reaches centre.
- The live-status chip must be computed after mount to avoid a hydration mismatch between server and client rendering.

Once done, print Tasks Finished.
```

---

### Step 8: Footer & Closing Brand Line

> **Student Action:** Build the footer — minimal, typographic, and carrying the real business details.

```text
Build the footer for Sentosa.

- Background: espresso #292621 with ivory text, closing the page on the same dark note the gallery introduced.
- Layout: three uneven columns — a wide left column with the wordmark and closing line, a narrow middle column with section anchors, and a right column with address, hours and rating. Beneath them, a full-bleed oversized Fraunces wordmark "SENTOSA" clipped by the bottom of the viewport so only its upper two-thirds is visible, at 10% ivory opacity. This cropped wordmark is the footer's single decorative gesture — no icons, no illustrations, no newsletter box.
- Business details, rendered as small caps labels above their values: "Haldighati Marg, near HDFC Bank, Sector 26, Pratap Nagar, Jaipur 302033" · "Open daily until 10 PM" · "4.0 ★ · 49 Google reviews".
- Closing brand line in Fraunces italic 28px: "Sip slow. Stay awhile."
- Motion: the cropped wordmark's vertical position is scrubbed to scroll, rising roughly 40px as the footer enters — it appears to settle into place. Column contents fade and rise 12px, staggered 70ms. Nothing loops or pulses here; the page should come to rest.
- Anchor links use the same underline-in-from-left, out-to-right hover as the nav.
- Bottom rule: a single sand hairline above a line reading "Sentosa – The Coffee Unit · Jaipur" in Instrument Sans 12px ivory at 60%.

Once done, print Tasks Finished.
```

---

### Step 9: Choreography Pass, Responsiveness & Performance QA

> **Student Action:** Final pass. This is where the site stops looking assembled and starts looking designed.

```text
Do a final polish and audit pass across the whole page.

1. CHOREOGRAPHY AUDIT: scroll the entire page and verify each section uses its own motion signature — Hero layered parallax, About horizontal wipe, Menu crossfade/mask, Gallery velocity drag, Booking state morph, Contact draw-on, Footer settle. If any two sections animate the same way, change the later one.
2. Remove every remaining default fade-up-on-scroll. Any element still using a generic opacity+translateY entrance must be replaced with a mask reveal, a directional wipe, a scale-from-crop, or a draw-on.
3. TIMING: no single entrance longer than 1.6s. Verify staggers are between 40 and 90ms. Verify nothing replays on scroll-up except scrubbed parallax.
4. RESPONSIVE: at every breakpoint, preserve the asymmetric left/right page margins rather than collapsing to symmetrical centring. Verify the pinned gallery and sticky menu image stage degrade to the mobile fallbacks specified earlier. Verify tap targets are at least 44px and all custom cursors are disabled on touch devices.
5. ACCESSIBILITY: check contrast of sage on cream and sand on ivory — if either falls below 4.5:1 for body text, use charcoal instead and keep sage/sand for decoration only. Verify full keyboard navigation with visible focus rings in terracotta, correct heading order, alt text on all images, and that prefers-reduced-motion collapses everything to fades.
6. PERFORMANCE: animate only transform and opacity. Lazy-load all gallery and menu imagery, serve modern formats with explicit dimensions, and kill ScrollTrigger and Lenis instances on unmount. Target a Lighthouse performance score above 90 and zero cumulative layout shift.
7. Confirm every fact on the page matches the real business data: address, 10 PM daily close, 4.0 rating with 49 reviews, ₹400–600 per person. Remove any invented claims, awards, fake testimonials or placeholder review quotes.

Once done, print Tasks Finished.
```

---

# Anti-Generic Checklist

Run this before calling the build done. If any line is true, the site still looks AI-templated.

**Layout**
- [ ] A centred hero with a headline, subtext and two buttons stacked in the middle
- [ ] Three equal feature cards in a row — anywhere on the page
- [ ] Symmetrical page margins on desktop (must be 8vw left / 5vw right)
- [ ] Every section starting with a centred eyebrow + centred heading + centred paragraph
- [ ] Content living inside boxes with rounded corners and drop shadows
- [ ] A full-width coloured band with a centred CTA before the footer

**Type**
- [ ] Fraunces used at a single optical size everywhere
- [ ] No italic swaps used as meaning, or italics applied to entire headlines
- [ ] Headline line-heights above 1.1 at display sizes
- [ ] Body text wider than 60ch
- [ ] Ragged edges "fixed" into clean justified blocks

**Color**
- [ ] Any hex outside the seven brand tokens (especially pure #FFF or #000)
- [ ] Gradients, glassmorphism, or glow effects
- [ ] Terracotta used as a background wash instead of a precise accent
- [ ] More than one dark section besides Gallery and Footer

**Motion**
- [ ] Default `ease-in-out` or `ease` anywhere
- [ ] The same fade-up-on-scroll applied to every section
- [ ] Animations replaying each time an element re-enters the viewport
- [ ] A bouncing scroll arrow
- [ ] Hover effects limited to `scale(1.05)` with no secondary detail
- [ ] Entrances longer than 1.6s or micro-interactions longer than 300ms

**Imagery**
- [ ] Cold, blue-toned or obviously generic stock photography
- [ ] All images cropped to the same aspect ratio in a uniform grid
- [ ] No image bleeding past a viewport edge
- [ ] Grain overlay missing or applied so strongly it reads as noise

**Content**
- [ ] Invented review quotes, awards, chef names, or "since 20XX" claims
- [ ] Generic copy: "your perfect cup awaits", "premium coffee experience", "best in Jaipur"
- [ ] Exclamation marks in brand copy
- [ ] Business details inconsistent with the real data in this guide

---

## Tips for Success

- **Run the prompts in order.** Step 1 defines tokens and primitives that every later prompt refers to by name; skipping it makes the rest inconsistent.
- **Re-paste the design system** into any prompt where the AI starts drifting toward off-palette colours or default easings.
- **Swap the imagery early.** Placeholder photography is the single fastest way for this build to look templated — drop in real Sentosa photos before judging the design.
- **Judge motion by scrolling, not by screenshots.** The whole premise of this guide is choreography; a static screenshot cannot tell you whether Step 9 succeeded.
- **Keep real menu data in one file.** Step 4 intentionally uses placeholders with TODOs so the client's actual menu can be dropped in without touching layout code.
