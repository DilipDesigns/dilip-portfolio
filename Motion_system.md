# Motion System

> Global motion, interaction, scroll behavior, transitions, and animation guidelines for this portfolio.

---

## 1. Purpose

This file defines the motion language for the entire portfolio website.

All pages, sections, components, case studies, and future additions must follow this system.

The purpose of motion is to:

* Improve storytelling
* Create clear visual hierarchy
* Guide attention
* Make interactions feel responsive
* Add depth and spatial awareness
* Communicate craftsmanship
* Make the portfolio feel premium and cinematic
* Demonstrate strong interaction design thinking
* Support usability instead of competing with it

The website should feel:

**Calm. Cinematic. Precise. Responsive. Intentional. Premium. Human.**

Motion must never feel like decoration added after the design.

Every animation should answer at least one question:

1. Does it guide attention?
2. Does it explain hierarchy?
3. Does it provide interaction feedback?
4. Does it improve storytelling?
5. Does it help users understand spatial relationships?
6. Does it improve perceived quality?

If the answer to all six questions is no, do not add the animation.

---

# 2. Agent Instructions

Before creating, editing, or removing animation, inspect the existing project.

Determine:

* Framework and version
* Rendering architecture
* Routing architecture
* Styling system
* Existing animation libraries
* Existing smooth-scroll implementation
* Existing design tokens
* Component architecture
* Responsive breakpoints
* Accessibility implementation
* Current performance characteristics

Do not immediately install a new animation dependency.

First determine whether the required behavior can be implemented using:

1. Existing project dependencies
2. Native CSS transitions and animations
3. IntersectionObserver
4. Web Animations API
5. requestAnimationFrame
6. Existing animation utilities

Only recommend an additional dependency when it creates clear implementation or performance benefits.

Do not rewrite stable components unnecessarily.

Do not change visual design, content, layout, typography, spacing, or information architecture unless explicitly requested.

Motion implementation must respect the existing design system.

---

# 3. Motion Philosophy

The portfolio should feel like a carefully directed experience, not an animation showcase.

Follow these principles.

## 3.1 Restraint

Do not animate everything.

Static content creates contrast that makes important motion moments feel more powerful.

Use strong motion for:

* Hero introductions
* Featured project transitions
* Case study storytelling
* Major section transitions
* Selected visual moments

Use subtle motion for:

* Standard content reveals
* Cards
* Navigation
* Buttons
* Links
* Supporting content

---

## 3.2 Continuity

The website should feel like one connected experience.

Avoid assigning random animation styles to individual sections.

Motion patterns must repeat consistently.

For example:

* Section labels use the same reveal behavior.
* Major headings use the same reveal family.
* Project cards use consistent hover physics.
* Images use a controlled set of reveal patterns.
* Buttons follow the same interaction timing.
* Page transitions use one consistent transition language.

Consistency creates perceived quality.

---

## 3.3 Hierarchy

Motion intensity must match content importance.

Use three motion levels.

### Level 1: Cinematic Motion

Use for:

* Homepage hero
* Page introductions
* Featured project reveals
* Major case study moments
* Important visual storytelling
* Selected section transitions

Typical duration:

`700ms – 1200ms`

Use sparingly.

---

### Level 2: Content Motion

Use for:

* Section headings
* Paragraphs
* Project cards
* Images
* Process steps
* Experience entries
* Testimonials
* Metrics

Typical duration:

`500ms – 800ms`

This is the default motion level.

---

### Level 3: Interface Motion

Use for:

* Buttons
* Links
* Navigation
* Tags
* Icons
* Card hover states
* Input focus states
* Small UI feedback

Typical duration:

`120ms – 350ms`

These interactions should feel immediate.

---

# 4. Motion Tokens

Create centralized reusable motion tokens.

Do not use arbitrary timing values throughout components.

Suggested conceptual structure:

```css
--motion-instant: 120ms;
--motion-fast: 180ms;
--motion-ui: 280ms;
--motion-content: 650ms;
--motion-slow: 900ms;
--motion-cinematic: 1100ms;
```

Create reusable easing tokens.

Suggested conceptual easing categories:

```css
--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-exit: cubic-bezier(0.7, 0, 0.84, 0);
--ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1);
```

The exact implementation should match the project architecture.

Use a small set of consistent curves.

Avoid:

* Linear easing for expressive UI motion
* Excessive spring animations
* Strong bouncing
* Elastic effects
* Cartoon-like overshoot

The motion personality is refined and controlled.

---

# 5. Smooth Scroll Behavior

The website should have a fluid scrolling experience without making scrolling feel artificially slow.

## Requirements

* Preserve natural user control.
* Scrolling must never feel delayed.
* Trackpad scrolling should remain precise.
* Mouse-wheel scrolling should feel smooth.
* Touch devices should preserve native behavior.
* Keyboard scrolling must continue to work.
* Anchor navigation must work correctly.
* Browser history behavior must remain correct.
* Respect reduced-motion preferences.

If the project already uses a smooth-scroll solution, inspect and configure it rather than introducing another system.

Do not run multiple smooth-scroll systems simultaneously.

Avoid aggressive smoothing.

The visitor should feel that the website is polished, not that the scroll is fighting against them.

---

# 6. Global Scroll Reveal Architecture

Create a reusable global reveal system.

Do not write isolated IntersectionObserver logic inside every section.

Create a shared implementation that supports reusable variants.

Required variants:

* `fade-up`
* `fade-down`
* `fade-left`
* `fade-right`
* `scale-in`
* `blur-in`
* `clip-up`
* `clip-left`
* `image-reveal`
* `line-reveal`
* `stagger-children`

The implementation can use:

* reusable components
* animation wrappers
* hooks
* directives
* utilities
* data attributes

Choose the approach that best matches the existing framework.

---

# 7. Default Reveal Behavior

The default reveal animation should be subtle.

Suggested initial state:

```text
opacity: 0
translateY: 24px to 36px
optional blur: 4px to 8px
```

Visible state:

```text
opacity: 1
translateY: 0
blur: 0
```

Recommended duration:

`600ms – 800ms`

Recommended viewport trigger:

Begin the animation when approximately 10% to 20% of the element enters the viewport.

Do not wait until the element reaches the center of the screen.

Most content animations should:

* play once
* remain visible
* not repeatedly replay while scrolling slightly up and down

Avoid excessive movement distances.

Large movement does not automatically create cinematic motion.

---

# 8. Reveal Hierarchy Within Sections

Content inside a section should reveal according to reading order.

Preferred sequence:

1. Eyebrow or section label
2. Main heading
3. Supporting description
4. Primary content
5. Supporting visual or metadata
6. CTA if present

Do not animate all elements simultaneously.

Do not create excessively long delays.

The complete section should become readable quickly.

Typical stagger:

`60ms – 120ms`

Large content groups should use smaller stagger values.

Small important groups can use slightly longer stagger values.

---

# 9. Hero Motion Sequence

The homepage hero is the primary cinematic moment.

It should have a coordinated entrance sequence.

Recommended sequence:

### Stage 1: Environment

* Page background becomes visible immediately.
* Decorative visual atmosphere may appear subtly.
* Avoid blank-screen waiting.

### Stage 2: Introductory Element

Reveal:

* availability status
* small introduction
* role label
* location or context if present

Use subtle fade and upward motion.

### Stage 3: Main Headline

Reveal the headline line by line.

Preferred technique:

* each visual line has an overflow-hidden wrapper
* text moves upward into position
* opacity transitions from subtle to full
* optional blur moves from soft to sharp

Do not reveal every character individually.

Do not use typewriter effects for the main portfolio headline.

### Stage 4: Supporting Content

Reveal:

* supporting paragraph
* role description
* relevant metadata

Use a smaller movement distance than the headline.

### Stage 5: Actions

Reveal:

* primary CTA
* secondary CTA
* social or contact links if present

Use a subtle stagger.

### Stage 6: Hero Visual

Reveal the main visual through one controlled technique:

* clip reveal
* mask reveal
* subtle scale settle
* layered depth entrance

### Stage 7: Scroll Cue

The scroll indicator should appear last.

It may use extremely subtle continuous movement.

Total hero sequence should feel cinematic but should not delay interaction.

Target complete sequence:

Approximately `1.2 – 2.2 seconds`.

The user should be able to interact before all secondary animations finish.

---

# 10. Typography Motion

Typography is a core part of the portfolio experience.

Use text motion selectively.

## 10.1 Line Reveal

Use for:

* hero headlines
* section statements
* case study introductions
* large editorial typography

Implementation behavior:

* wrap each visual line
* apply overflow hidden
* reveal the inner text vertically
* preserve responsive line wrapping

Be careful with responsive layouts.

Do not hard-code line breaks only for animation unless the design intentionally requires fixed editorial line breaks.

---

## 10.2 Word Reveal

Use for:

* short statements
* selected design philosophy content
* short creative section introductions

Avoid word-by-word reveals for long paragraphs.

Reading should never become dependent on animation timing.

---

## 10.3 Character Reveal

Use rarely.

Suitable only for:

* short labels
* small experimental moments
* selected creative microcopy

Do not use character animation for paragraphs, navigation, or essential content.

---

# 11. Section Transition System

The page should not feel like disconnected rectangular sections.

Create continuity using:

* controlled spacing rhythm
* background transitions
* image overlap
* visual depth
* typography scale shifts
* subtle parallax
* foreground and background relationships

Not every section needs a transition effect.

Use stronger transitions between major narrative chapters.

Examples:

* Introduction → Selected Work
* Selected Work → About
* About → Process
* Process → Experience
* Experience → Contact

The transition should support the story of the page.

---

# 12. Selected Work and Project Cards

Project cards are high-priority interaction surfaces.

They should feel responsive and crafted.

## Desktop Hover Behavior

A project card may combine:

* subtle image scale
* small image translation
* title movement
* arrow translation
* arrow rotation
* metadata opacity adjustment
* border transition
* background transition
* subtle cursor feedback

Recommended image scale:

`1.02 – 1.06`

Recommended duration:

`250ms – 500ms`

Image movement may be slightly slower than text movement to create layered depth.

Do not apply extreme zoom.

Do not move the entire card excessively.

Hover behavior should never make text difficult to read.

---

## Project Card Entrance

When project cards enter the viewport:

* reveal cards in reading order
* use controlled stagger
* reveal image and content as a coordinated unit
* avoid animating every internal card element independently

For large cards, consider:

1. container reveal
2. image reveal
3. content reveal

Keep the complete sequence concise.

---

## Touch Devices

Never depend on hover to communicate information.

On touch devices:

* all essential content remains visible
* hover-only labels must have alternatives
* cursor effects are disabled
* motion complexity is reduced

---

# 13. Image Motion System

Images should be treated as storytelling surfaces.

Use a limited family of image reveal patterns.

## Pattern A: Clip Reveal

Use for:

* major project images
* case study visuals
* editorial photography

Reveal direction can be:

* bottom to top
* left to right
* center outward

Use direction consistently within a page.

---

## Pattern B: Scale Settle

Suggested behavior:

Initial:

```text
scale: 1.04 – 1.08
```

Final:

```text
scale: 1
```

Use with an overflow-hidden parent.

Duration:

`800ms – 1200ms`

Use smooth cinematic easing.

---

## Pattern C: Mask Reveal

Use for selected high-impact moments.

A temporary layer or clipping mask reveals the image.

Use sparingly.

Do not mask-reveal every image on the page.

---

## Image Loading Behavior

Below-the-fold images should be lazy-loaded.

When appropriate:

* avoid sudden visual popping
* preserve aspect ratio before image load
* prevent layout shifts
* use a subtle loading transition
* do not create long artificial loading animations

Performance is part of visual quality.

---

# 14. Parallax System

Parallax should create subtle depth.

It should not become the primary visual effect.

Suitable elements:

* hero visuals
* large project images
* decorative shapes
* oversized background typography
* abstract visual elements
* selected case study imagery

Recommended movement should be small.

Different layers may move at slightly different rates.

Avoid parallax on:

* body text
* buttons
* forms
* navigation
* essential controls
* dense content areas

On mobile:

* simplify parallax
* reduce movement
* disable if performance is affected

Parallax must never cause horizontal overflow.

---

# 15. Scroll-Linked Motion

Scroll-linked animation should be used only when the user's scrolling progress has a meaningful relationship with the content.

Suitable examples:

* process progression
* case study chapters
* image sequences
* before/after transformations
* visual storytelling
* progress indicators
* selected pinned sections

Avoid using scroll-linked animation simply because it looks impressive.

The user must remain in control.

Do not create extremely long pinned sections.

Do not trap users inside animation sequences.

---

# 16. Sticky Storytelling System

Use sticky storytelling for selected high-value sections.

Recommended candidates:

* My Process
* Selected Work introduction
* Career Journey
* Case Study Process
* Design Philosophy

Suggested structure:

### Left Side

Sticky content:

* section label
* heading
* short explanation
* progress indicator if needed

### Right Side

Scrollable content:

* steps
* project stages
* decisions
* visuals
* outcomes

As each content item becomes active:

* increase opacity
* remove blur
* slightly adjust position
* update active indicator
* update corresponding visual if appropriate

Inactive content should remain readable enough to understand context.

Do not reduce inactive content opacity excessively.

Use sticky storytelling only where it improves comprehension.

---

# 17. Process Section Motion

The Process section should demonstrate systems thinking.

Suggested behavior:

1. Section introduction reveals.
2. Process stages enter progressively.
3. Active stage becomes visually prominent.
4. Supporting description reveals.
5. Related visual responds where available.
6. Progress connection updates smoothly.

Possible visual behaviors:

* progressive line growth
* step indicator activation
* number transition
* visual replacement
* subtle background shift
* sticky heading with scrolling stages

Avoid gimmicky timeline animation.

The process should remain understandable without motion.

---

# 18. Experience and Career Timeline

The career section should feel progressive and structured.

Recommended behavior:

* timeline line grows progressively
* experience entries reveal in sequence
* year or duration appears first
* role and company information follow
* description enters last

Keep motion subtle.

The section should communicate progression rather than spectacle.

Do not animate the timeline continuously if it distracts from reading.

---

# 19. Metrics and Numbers

Animate numbers only when they represent meaningful data.

Examples:

* years of experience
* projects delivered
* users impacted
* workflow improvements
* time reduction
* conversion improvement
* adoption metrics

Rules:

* animate once
* start when entering viewport
* keep duration short
* use appropriate number formatting
* preserve suffixes and prefixes
* always end on the exact final value

Do not create fake metrics.

Do not animate decorative numbers.

---

# 20. Before and After Interaction

For redesign case studies, use interactive comparison when it improves understanding.

Supported patterns:

* draggable comparison slider
* Before / After toggle
* side-by-side comparison
* progressive scroll transformation

Requirements:

* clearly label states
* support keyboard interaction where applicable
* support touch input
* avoid hiding important information
* maintain good performance

The interaction must help explain the design decision.

---

# 21. Case Study Motion System

Case studies should feel like guided product stories.

They should not feel like long static articles with random fade animations.

Use motion to support narrative chapters.

Suggested chapter rhythm:

1. Project Introduction
2. Context
3. Problem
4. Research
5. Key Insights
6. Strategy
7. Information Architecture
8. User Flows
9. Design Exploration
10. Final Solution
11. Design System
12. Outcomes
13. Reflection

Not every case study requires every chapter.

Motion opportunities include:

* chapter introductions
* sticky context panels
* progressive diagrams
* flow animations
* image reveals
* UI sequence reveals
* before/after comparison
* metric count-up
* annotation reveals
* horizontal galleries
* visual progression

Motion should explain design decisions.

Do not animate UI mockups unnecessarily.

The work itself must remain the focus.

---

# 22. Case Study Progress Navigation

For long case studies, provide subtle orientation.

Possible patterns:

* thin reading progress line
* chapter indicator
* active section label
* compact side navigation
* sticky progress navigation

Requirements:

* visually quiet
* responsive
* keyboard accessible
* accurate active section detection
* no layout shifts

On smaller devices, simplify the navigation.

---

# 23. Horizontal Motion

Horizontal scrolling should be used cautiously.

Suitable for:

* selected project galleries
* visual explorations
* design iterations
* controlled image sequences

Do not convert standard vertical content into horizontal scrolling without a strong reason.

Requirements:

* clear directional affordance
* touch support
* keyboard support where appropriate
* no scroll trapping
* responsive fallback
* reduced-motion fallback

The user should always understand how to continue navigating.

---

# 24. Navigation Motion

The global navigation should use state-based behavior.

## State A: Page Top

* header is fully visible
* visual treatment integrates with hero
* no unnecessary shadow
* transparent or context-aware background

## State B: Scrolled

After leaving the top area:

* introduce subtle background treatment
* optional backdrop blur
* subtle border
* optional compact visual state

Do not cause layout shift.

## State C: Scrolling Down

After a meaningful scroll threshold:

* hide header smoothly upward
* avoid reacting to tiny movements
* do not hide immediately after the first small scroll

## State D: Scrolling Up

* reveal header promptly
* transition smoothly
* preserve current scrolled visual style

## State E: Near Top

* restore original top state
* keep header visible

Use a small scroll delta threshold to prevent jitter.

---

# 25. Active Navigation State

Detect the current page section.

Update the relevant navigation item.

Possible active treatments:

* text color transition
* animated underline
* small background pill
* subtle indicator movement

Keep active state visually clear but refined.

Clicking navigation links should:

* scroll to the correct section
* account for header offset
* update URL behavior appropriately if the project uses anchors
* maintain keyboard accessibility

---

# 26. Mobile Navigation Motion

Mobile navigation should feel designed, not simply displayed.

Suggested sequence:

1. Menu trigger responds immediately.
2. Menu container reveals.
3. Navigation links enter with subtle stagger.
4. Secondary information appears last.

On close:

* reverse or simplify the sequence
* keep exit faster than entrance

Requirements:

* lock background scrolling
* preserve focus correctly
* support Escape key where applicable
* restore focus to trigger after close
* close after navigation selection
* prevent background interaction
* maintain correct z-index behavior

Avoid overly long menu animations.

---

# 27. Buttons and CTA Motion

Buttons should feel responsive immediately.

Possible behavior:

* background transition
* text shift
* icon translation
* icon rotation where meaningful
* subtle scale on press
* controlled magnetic response for selected CTAs

Recommended timing:

Hover:

`180ms – 300ms`

Press:

`100ms – 160ms`

Do not apply the same dramatic animation to every button.

Primary CTAs may have stronger interaction.

Secondary actions should remain quieter.

---

# 28. Magnetic Interaction

Use magnetic interaction only on selected desktop elements.

Suitable for:

* hero CTA
* contact CTA
* selected circular buttons
* major project links

Behavior:

* element moves slightly toward cursor
* internal content may move at a different ratio
* movement remains within a small boundary
* return animation is smooth

Do not make the effect strong.

Disable on:

* touch devices
* reduced-motion mode
* low-performance contexts if necessary

Do not use magnetic motion for standard navigation links or every button.

---

# 29. Link Interactions

Text links should provide refined feedback.

Possible patterns:

* underline draws from left to right
* underline exits and re-enters
* arrow shifts horizontally
* external-link icon moves slightly
* text opacity changes subtly

Avoid complex animations on inline links inside paragraphs.

Focus-visible states must remain clear.

---

# 30. Custom Cursor

A custom cursor is optional.

Only implement it if it improves the experience and performs smoothly.

Possible cursor states:

* Default
* View Project
* Open
* Drag
* Play
* Next
* Previous

Behavior may include:

* size transition
* text label transition
* opacity transition
* contextual state change

Rules:

* never reduce usability
* do not hide essential native interaction feedback
* disable on touch devices
* disable in reduced-motion mode if necessary
* do not create noticeable pointer lag

If the cursor feels delayed, remove or simplify it.

---

# 31. Marquee Motion

Use continuous marquee motion sparingly.

Suitable for:

* client names
* selected capabilities
* tools
* technology labels
* short visual separators

Rules:

* slow movement
* seamless loop
* no sudden reset
* pause or simplify when appropriate
* respect reduced motion

Avoid:

* multiple marquees close together
* fast ticker-style motion
* long paragraphs inside marquees
* essential information available only through moving content

---

# 32. Page Transitions

If supported by the routing architecture, implement subtle transitions between pages.

Recommended behavior:

### Exit

* subtle opacity reduction
* very small vertical movement if appropriate

### Enter

* restore scroll position correctly
* reveal new page quickly
* introduce page heading and primary visual in sequence

Keep route transitions fast.

Do not create artificial loading screens for pages that are already ready.

Suggested total route transition:

`400ms – 800ms`

Case study navigation should feel seamless.

---

# 33. Footer and Contact Section

The final section should feel like a deliberate conclusion.

Suggested sequence:

1. Closing statement reveals.
2. Contact CTA enters.
3. Supporting links reveal.
4. Footer metadata appears.
5. Optional subtle visual motion continues.

The final CTA can have slightly stronger interaction treatment than standard buttons.

Avoid turning the footer into a separate visual experience disconnected from the website.

---

# 34. Loading States

Avoid unnecessary full-screen preloaders.

Use a preloader only when there is a genuine technical reason.

Prefer:

* progressive content rendering
* reserved image dimensions
* subtle image loading transitions
* skeletons only where useful
* immediate access to available content

Do not delay the user only to display a logo animation.

Perceived performance is part of premium design.

---

# 35. Micro-Interaction Checklist

Every interactive component should be reviewed for:

* default state
* hover state
* focus-visible state
* active state
* pressed state
* disabled state where relevant
* loading state where relevant
* success state where relevant
* error state where relevant

Check:

### Buttons

* hover feedback
* press feedback
* focus visibility
* icon response

### Links

* hover response
* focus visibility
* external-link indication where needed

### Cards

* hover response
* image response
* focus behavior
* touch behavior

### Forms

* focus transition
* validation feedback
* error transition
* success confirmation
* loading state

### Navigation

* hover state
* active section state
* open and close transitions
* keyboard behavior

Small interaction details should feel consistent.

---

# 36. Mobile Motion Strategy

Mobile motion must be intentionally designed.

Do not simply copy desktop values.

On smaller screens:

* reduce movement distance
* simplify animation sequences
* reduce stagger delay
* disable cursor effects
* disable magnetic interactions
* simplify parallax
* reduce large fixed layers
* preserve native scrolling
* reduce pinned section duration
* avoid heavy blur animation
* prioritize content access

Suggested reveal distance:

Desktop:

`24px – 40px`

Mobile:

`12px – 24px`

Mobile should still feel premium, but lighter and faster.

Test on real mobile viewport behavior.

Pay special attention to:

* browser address bar changes
* dynamic viewport height
* fixed navigation
* sticky sections
* overflow
* touch scrolling

---

# 37. Reduced Motion Accessibility

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

* disable smooth-scroll interpolation
* remove parallax
* remove large transforms
* remove cursor-following effects
* disable magnetic motion
* simplify page transitions
* reduce or remove stagger
* show essential content immediately
* use minimal opacity transitions only where appropriate

Motion must never be required to understand content.

No content should remain hidden if animation JavaScript fails.

The website must remain usable without animation.

---

# 38. Performance Standards

Motion quality depends on performance.

Prefer animating:

* transform
* opacity

Use caution with:

* filter
* blur
* large shadows
* background-position
* width
* height
* top
* left
* layout-triggering properties

Use:

* IntersectionObserver for viewport detection
* requestAnimationFrame for necessary scroll calculations
* passive listeners where appropriate
* reusable animation utilities
* cleanup for listeners and observers
* responsive image loading
* lazy loading below the fold

Avoid:

* duplicate observers
* multiple global scroll listeners
* unnecessary continuous RAF loops
* animation logic duplicated across components
* oversized video backgrounds
* excessive blur layers
* unnecessary will-change usage

Do not apply `will-change` globally.

Use it only when justified.

---

# 39. Scroll Performance Rules

For scroll-driven interactions:

* avoid reading and writing layout repeatedly in the same frame
* batch DOM reads and writes
* cache values where appropriate
* debounce or throttle non-animation scroll logic
* use requestAnimationFrame for visual scroll updates
* use IntersectionObserver instead of scroll listeners for simple reveals

If smooth scrolling is used, ensure scroll-triggered systems are synchronized with it.

Do not allow multiple systems to calculate conflicting scroll positions.

---

# 40. Responsive Testing

Test all motion at minimum across:

* large desktop
* laptop
* tablet landscape
* tablet portrait
* mobile
* small mobile

Verify:

* no horizontal overflow
* no clipped text
* no broken sticky positioning
* no incorrect trigger positions
* no animation delays blocking content
* no header jitter
* no scroll trapping
* no broken anchor offsets
* no hover dependency on touch devices

---

# 41. Accessibility Testing

Verify:

* complete keyboard navigation
* visible focus indicators
* menu focus management
* Escape behavior where relevant
* reduced-motion behavior
* semantic navigation
* screen reader compatibility
* no content available only through hover
* no essential content dependent on animation completion

Motion must enhance the portfolio without reducing access.

---

# 42. Premium Craft Details

Before considering a page complete, inspect details beyond major animations.

Review:

* first page load
* image appearance
* image aspect-ratio preservation
* scroll restoration
* route transition
* header behavior
* active navigation state
* hover consistency
* button press feedback
* link behavior
* focus states
* section rhythm
* text wrapping
* visual alignment
* responsive transitions
* empty states
* loading states
* error states
* footer conclusion
* reduced-motion experience

Premium quality comes from consistency across hundreds of small decisions.

---

# 43. Anti-Patterns

Do not implement:

* animation on every element
* large bounce effects
* excessive spring physics
* extreme parallax
* scroll hijacking
* long intro loaders
* forced horizontal scrolling
* repeated fade-up animation on every object
* random animation directions
* long delays before content becomes readable
* excessive blur
* constant movement everywhere
* cursor effects that create lag
* mobile effects copied directly from desktop
* animation that shifts layout
* multiple competing animation libraries
* effects added only because they are trendy

Avoid making the website feel like a motion template.

---

# 44. Creative Freedom

The implementation agent may propose additional interactions when they clearly improve:

* storytelling
* hierarchy
* usability
* spatial understanding
* emotional impact
* perceived quality

Before implementing an additional effect, evaluate:

1. Why is this motion needed?
2. What does it communicate?
3. Is there already another effect doing the same job?
4. Does it match the motion language?
5. Does it work on mobile?
6. Does it respect accessibility?
7. Is the performance cost justified?

If uncertain, choose the simpler behavior.

---

# 45. Implementation Order

Implement motion progressively.

Recommended order:

## Phase 1: Foundation

1. Inspect existing stack.
2. Create motion tokens.
3. Create reduced-motion support.
4. Create global reveal architecture.
5. Establish performance-safe utilities.

## Phase 2: Global Experience

1. Smooth scroll behavior if justified.
2. Header states.
3. Active navigation.
4. Anchor behavior.
5. Page transitions if architecture supports them.

## Phase 3: Homepage Storytelling

1. Hero sequence.
2. Selected Work reveal.
3. Project card interactions.
4. About section motion.
5. Process storytelling.
6. Experience progression.
7. Contact and footer conclusion.

## Phase 4: Case Studies

1. Case study introduction.
2. Chapter transitions.
3. Image reveal system.
4. Progress navigation.
5. Before/after interaction.
6. Metric animations.
7. Selected sticky storytelling moments.

## Phase 5: Refinement

1. Micro-interactions.
2. Loading behavior.
3. Responsive tuning.
4. Mobile simplification.
5. Reduced-motion testing.
6. Performance optimization.
7. Accessibility testing.

Do not implement all effects simultaneously without testing intermediate stages.

---

# 46. Agent Execution Protocol

Whenever asked to add motion to a page:

### Step 1: Inspect

Review:

* existing page structure
* components
* current motion
* installed dependencies
* responsive behavior

### Step 2: Plan

Briefly identify:

* primary cinematic moment
* content reveal strategy
* interactive states
* mobile simplifications
* accessibility fallback

### Step 3: Implement

Use the shared motion system.

Do not create isolated patterns without reason.

### Step 4: Validate

Test:

* initial load
* slow scroll
* fast scroll
* reverse scroll
* resize behavior
* route navigation
* keyboard navigation
* touch behavior
* reduced-motion mode

### Step 5: Refine

Remove any motion that:

* feels repetitive
* delays reading
* causes jitter
* reduces performance
* competes with content
* feels inconsistent with the rest of the site

---

# 47. Final Quality Standard

The finished portfolio should feel as though motion was designed at the same time as layout, typography, content, and interaction.

Visitors should notice the quality of the experience without constantly noticing the animations themselves.

The experience should communicate that the designer understands:

* product thinking
* interaction design
* visual hierarchy
* motion design
* storytelling
* responsiveness
* accessibility
* technical constraints
* implementation quality
* attention to detail

The portfolio should feel memorable because every detail works together.

The final standard is:

**Cinematic, but not theatrical.**

**Interactive, but not distracting.**

**Expressive, but controlled.**

**Technically impressive, but always usable.**

**Premium because of consistency, not excess.**
