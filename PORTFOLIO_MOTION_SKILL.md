# PORTFOLIO MOTION & INTERACTION SKILL

## Purpose

This document defines the global motion, scrolling, reveal, transition, and micro-interaction system for the portfolio website.

The goal is to create a premium, cinematic, modern, and highly crafted portfolio experience that demonstrates strong attention to detail.

Motion must support storytelling, hierarchy, usability, and emotional impact.

The website should feel:

* Premium
* Cinematic
* Smooth
* Calm
* Intentional
* Modern
* Technically polished
* Human
* Interactive without being distracting

Avoid excessive animation, unnecessary movement, exaggerated parallax, random effects, and anything that reduces readability or performance.

Every animation must have a purpose.

---

# 1. GLOBAL MOTION PRINCIPLES

Follow these principles across the entire website.

## Motion Hierarchy

Not every element should animate with the same intensity.

Use three motion levels:

### Level 1: Primary Moments

Use for:

* Hero introduction
* Major page transitions
* Featured case study reveals
* Large visual storytelling moments
* Important section transitions

These animations may be more cinematic and expressive.

### Level 2: Content Reveals

Use for:

* Section headings
* Paragraphs
* Project cards
* Images
* Metrics
* Process steps
* Testimonials

These should be subtle and consistent.

### Level 3: Micro-interactions

Use for:

* Buttons
* Links
* Navigation
* Tags
* Cards
* Icons
* Image hover states
* Cursor feedback

These should feel immediate and responsive.

---

# 2. SMOOTH SCROLLING SYSTEM

Implement smooth scrolling only if it works well with the existing technology stack.

Requirements:

* Scrolling should feel fluid and natural.
* Do not make scrolling feel heavy or delayed.
* Preserve native scrolling expectations.
* Avoid excessive scroll smoothing.
* Touch devices should retain natural native scrolling.
* Keyboard navigation must continue to work correctly.
* Anchor links should smoothly navigate to sections.
* Respect prefers-reduced-motion.

If a smooth-scroll library is already installed, reuse it.

Do not add a large dependency only for basic smooth scrolling.

The experience should feel polished, not artificially slowed down.

---

# 3. SCROLL REVEAL SYSTEM

Create one reusable global reveal system.

Do not write independent animation logic for every section.

Support reusable reveal variants:

* fade-up
* fade-down
* fade-left
* fade-right
* scale-in
* blur-in
* clip-reveal
* stagger-children
* image-reveal
* text-line-reveal

Default content reveal:

Initial state:

* opacity: 0
* translateY: 24px to 40px
* subtle blur where appropriate

Visible state:

* opacity: 1
* translateY: 0
* blur: 0

Recommended duration:

* 600ms to 900ms

Recommended easing:

* smooth premium easing
* avoid linear easing
* avoid bouncy animation unless specifically appropriate

Animations should trigger slightly before the element reaches the center of the viewport.

Content should normally animate once and remain visible.

Do not replay every animation whenever the user slightly scrolls up and down.

---

# 4. STAGGERED CONTENT REVEALS

Use staggered animation for related content groups.

Examples:

* Navigation links
* Hero metadata
* Project cards
* Process steps
* Skills
* Experience items
* Testimonials
* Footer links

Recommended stagger delay:
50ms to 120ms between elements.

The stagger should communicate hierarchy.

Avoid very long sequential animations that force users to wait.

---

# 5. HERO CINEMATIC ENTRANCE

The homepage hero should create the strongest first impression.

Suggested entrance sequence:

1. Small introductory label appears.
2. Main headline reveals line by line.
3. Supporting paragraph fades upward.
4. Primary actions appear.
5. Hero visual or featured work reveals.
6. Scroll indicator appears last.

The entire sequence should feel coordinated.

Do not animate every word individually unless there is a strong visual reason.

Preferred headline treatment:

* line-based reveal
* overflow hidden container
* text moves upward into position
* subtle opacity transition
* optional very light blur-to-sharp transition

Keep the total hero introduction reasonably fast.

Users should not wait several seconds before they can interact with the page.

---

# 6. TYPOGRAPHY MOTION

Typography is an important part of the portfolio identity.

Use text animation selectively.

Supported patterns:

## Line Reveal

For:

* Hero headlines
* Large section statements
* Case study introductions

Each line reveals from an overflow-hidden wrapper.

## Word Reveal

Use only for short statements.

Do not animate long paragraphs word by word.

## Character Reveal

Use very rarely.

Suitable only for:

* Small labels
* Short experimental moments
* Selected creative headings

Never reduce readability for visual effect.

---

# 7. SECTION TRANSITIONS

Sections should not feel like isolated blocks stacked vertically.

Create visual continuity between sections using:

* spacing rhythm
* background transitions
* image movement
* typography scale changes
* subtle parallax
* overlapping visual elements
* sticky storytelling where appropriate

Avoid adding a different effect to every section.

The entire website should feel like one connected story.

---

# 8. PROJECT CARD INTERACTIONS

Project cards are one of the most important interaction surfaces.

Desktop hover behavior may include:

* image scale between 1.02 and 1.06
* subtle image translation
* card title movement
* arrow movement or rotation
* metadata opacity change
* background or border transition
* cursor state change

Keep movement subtle.

The card should feel responsive immediately when hovered.

Recommended micro-interaction duration:
180ms to 350ms.

On touch devices:

* Do not depend on hover.
* Ensure the card remains understandable and usable without animation.

---

# 9. IMAGE REVEAL SYSTEM

Important project images should not simply fade into view.

Use cinematic image reveals where appropriate.

Possible patterns:

## Clip Reveal

Image container reveals from:

* bottom to top
* left to right
* center outward

## Mask Reveal

A temporary overlay or clipping mask reveals the image smoothly.

## Scale Reveal

Image begins slightly enlarged and settles into final scale.

Recommended:

* initial scale: approximately 1.04 to 1.1
* final scale: 1

Combine with overflow hidden.

Avoid excessive zoom effects.

---

# 10. SUBTLE PARALLAX

Use parallax only for selected visual elements.

Suitable for:

* large project images
* decorative background objects
* abstract shapes
* oversized typography
* hero visual elements

Movement should be subtle.

Foreground and background elements may move at slightly different speeds.

Do not apply parallax to:

* long body text
* essential controls
* navigation
* form elements

Disable or simplify parallax on mobile if performance is affected.

---

# 11. STICKY STORYTELLING

For selected sections, consider sticky scroll storytelling.

Suitable for:

* My Process
* Selected Work
* Career Journey
* Case Study Overview
* Design Philosophy

Example behavior:

Left column:
Sticky heading and context.

Right column:
Content steps scroll progressively.

As each step becomes active:

* increase opacity
* reduce blur
* update active indicator
* optionally update corresponding visual

Do not overuse sticky sections.

One or two strong sticky storytelling moments are better than using the effect everywhere.

---

# 12. SCROLL PROGRESS FEEDBACK

For long pages and case studies, add subtle progress feedback.

Possible implementation:

* thin progress line
* case study chapter indicator
* section navigation state
* reading progress indicator

Keep it visually minimal.

The progress indicator should help orientation without competing with content.

---

# 13. MAGNETIC BUTTON INTERACTIONS

For selected primary CTA buttons on desktop, use subtle magnetic interaction.

Requirements:

* movement should be very small
* button follows cursor slightly
* content inside may move at a slightly different ratio
* return animation should be smooth

Do not use magnetic behavior for every button.

Use only for:

* primary hero CTA
* contact CTA
* selected major actions

Disable on touch devices.

---

# 14. CURSOR EXPERIENCE

If implementing a custom cursor, keep it minimal and accessible.

Possible states:

* default
* view project
* drag
* open
* play

The cursor may:

* scale slightly
* change label
* change opacity
* respond to interactive elements

Do not replace the native cursor if it reduces usability.

Disable custom cursor on touch devices.

Do not implement a custom cursor unless performance remains smooth.

---

# 15. NAVIGATION MOTION

Navigation should respond intelligently to scrolling.

States:

## Top State

* transparent or integrated with hero
* visually minimal

## Scrolled State

* subtle background
* optional backdrop blur
* subtle border
* compact appearance if appropriate

## Scroll Down

* hide smoothly after scroll threshold

## Scroll Up

* reveal quickly and smoothly

## Section Awareness

Highlight the active section based on viewport position.

Transitions must not cause layout shift.

---

# 16. PAGE TRANSITIONS

If routing architecture supports it, implement subtle page transitions.

Recommended transition:

Exit:

* current content fades slightly
* very subtle vertical movement

Enter:

* new page fades in
* content enters with controlled upward movement

Keep transitions fast.

Do not create long loading sequences between portfolio pages.

Case study navigation should feel seamless.

---

# 17. CASE STUDY CINEMATIC EXPERIENCE

Case studies should feel like guided stories, not long static articles.

Use a structured rhythm:

* strong opening
* project context
* problem
* process
* visual evidence
* key decisions
* outcomes
* reflection

Motion opportunities:

* chapter reveals
* image sequences
* sticky visual comparisons
* before/after transitions
* metric count-up
* horizontal visual galleries where appropriate
* progressive process diagrams
* animated annotations
* section progress indicator

Motion must help explain the design process.

Avoid adding animation only for decoration.

---

# 18. NUMBER AND METRIC ANIMATIONS

For meaningful metrics, animate values when they enter the viewport.

Examples:

* years of experience
* projects completed
* users impacted
* efficiency improvements
* conversion improvements

Requirements:

* animate once
* keep duration short
* use readable number formatting
* final value must always be accurate
* do not animate decorative or meaningless numbers

---

# 19. BEFORE AND AFTER INTERACTIONS

For redesign projects, support interactive comparisons.

Possible formats:

* draggable comparison slider
* toggle between Before and After
* side-by-side comparison
* scroll-driven transformation

Always provide clear labels.

The interaction should help explain the design improvement.

---

# 20. MARQUEE AND CONTINUOUS MOTION

Use continuous movement very carefully.

Suitable for:

* selected client logos
* capabilities
* technology labels
* small creative separators

Requirements:

* slow speed
* pause or reduce movement when appropriate
* seamless loop
* no distracting high-speed movement
* respect reduced-motion settings

Avoid multiple marquees on the same page.

---

# 21. MICRO-INTERACTION DETAILS

Pay attention to small details.

Buttons:

* subtle press state
* hover transition
* focus-visible state
* icon movement

Links:

* animated underline
* directional arrow response
* clear focus state

Cards:

* border transition
* image response
* metadata movement

Form fields:

* clear focus transition
* validation feedback
* success state animation

Navigation:

* active state transition
* menu open and close animation

Every interactive element should provide clear feedback.

---

# 22. MOBILE MOTION STRATEGY

Do not simply copy desktop animation behavior to mobile.

On mobile:

* reduce animation distance
* shorten complex sequences
* remove cursor effects
* remove magnetic interactions
* simplify parallax
* preserve native scrolling
* prioritize performance
* avoid large fixed layers
* test Safari viewport behavior
* ensure menu animations remain responsive

The mobile experience should still feel premium, but lighter.

---

# 23. PERFORMANCE RULES

Motion quality depends on performance.

Requirements:

* Prefer transform and opacity animations.
* Avoid animating layout-heavy properties where possible.
* Prevent cumulative layout shift.
* Lazy-load below-the-fold images.
* Use responsive image sizes.
* Avoid unnecessary scroll event calculations.
* Use IntersectionObserver where appropriate.
* Use requestAnimationFrame for scroll-linked calculations.
* Reuse animation utilities.
* Clean up observers and event listeners.
* Avoid unnecessary animation libraries.
* Reuse libraries already present in the project.

Target smooth interaction performance.

If an effect causes visible frame drops, simplify or remove it.

Performance is part of the design quality.

---

# 24. ACCESSIBILITY

All motion must respect accessibility preferences.

Implement support for:

prefers-reduced-motion: reduce

When reduced motion is enabled:

* remove parallax
* remove smooth scrolling
* remove large movement
* simplify transitions
* show content immediately or use minimal opacity changes

Animations must never block access to content.

Keyboard navigation must remain fully functional.

Focus states must remain visible.

---

# 25. MOTION TIMING SYSTEM

Use a consistent timing scale.

Suggested durations:

* Instant feedback: 100–180ms
* Hover interaction: 180–300ms
* Small UI transition: 250–400ms
* Content reveal: 500–800ms
* Large cinematic reveal: 700–1200ms

Do not use arbitrary durations for every component.

Create reusable motion tokens.

Example conceptual tokens:

motion-fast
motion-ui
motion-content
motion-cinematic

Create reusable easing tokens as well.

Use a small, consistent set of easing curves.

---

# 26. PREMIUM DETAIL RULES

The portfolio should demonstrate attention to detail through restraint.

Look for opportunities to improve:

* hover states
* focus states
* image loading transitions
* route transitions
* scroll restoration
* anchor navigation
* responsive typography
* text wrapping
* section spacing
* visual rhythm
* loading states
* error states
* empty states
* image aspect ratios
* card alignment
* cursor feedback
* motion consistency

Do not add effects everywhere.

The strongest premium experience comes from consistency.

---

# 27. IMPLEMENTATION WORKFLOW FOR THE IDE AGENT

Before implementing any animation:

1. Inspect the project framework.
2. Inspect the existing component architecture.
3. Identify installed animation libraries.
4. Identify the styling system.
5. Identify existing breakpoints and design tokens.
6. Check whether smooth scrolling already exists.
7. Check current accessibility behavior.
8. Check mobile performance implications.

Then:

1. Create reusable global motion utilities.
2. Create shared reveal components or directives.
3. Define motion timing and easing tokens.
4. Implement section animations gradually.
5. Test desktop behavior.
6. Test tablet behavior.
7. Test mobile behavior.
8. Test keyboard navigation.
9. Test reduced-motion mode.
10. Check for layout shifts and scroll jank.

Do not rewrite stable components unnecessarily.

Do not change the visual design unless required for interaction behavior.

Do not install dependencies without checking whether the same capability already exists in the project.

---

# 28. CREATIVE FREEDOM RULE

The IDE agent may suggest and implement additional interaction details when they improve storytelling, usability, or perceived quality.

However:

* Keep the visual language consistent.
* Avoid trendy effects without purpose.
* Do not sacrifice usability.
* Do not sacrifice performance.
* Do not make every section behave differently.
* Preserve the calm and premium character of the portfolio.

The final experience should feel designed as one coherent motion system, not as a collection of animation demos.
