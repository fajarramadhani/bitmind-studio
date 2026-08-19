# BITMIND STUDIO — Phase 2 Complete

## Visual Direction

Phase 2 establishes BITMIND STUDIO's visual identity as a premium, modern digital studio. The design direction combines:

- **Premium Digital Studio** — Confident, sophisticated, professional
- **Modern Technology Company** — Clean, technical, precise
- **Editorial Web Design** — Large typography, deliberate composition, generous whitespace
- **Product Design Portfolio** — Emphasis on showcasing work through visual hierarchy

The homepage moves away from generic agency templates toward a more refined, editorial-driven experience where typography, layout, and subtle motion create the visual language instead of decorative elements.

**Key visual principles applied:**

- Large, deliberate typography as a primary visual element
- Structured grid system with intentional alignment
- Generous whitespace creating breathing room
- Subtle borders for visual structure
- Controlled accent color usage (indigo) for emphasis only
- Minimal decoration — every element serves a purpose
- Editorial scale contrast between sections

---

## Homepage

The homepage has been completely redesigned and restructured into **10 distinct sections**, each with its own component:

### 1. Hero Section
- Large responsive headline: "We design and build digital experiences that work"
- Supporting copy with clear value proposition
- Dual CTAs: "Start a Project" (primary) + "View Our Work" (secondary)
- Intentional placeholder preview featuring Ardana Perkasa Group in a browser-chrome mockup
- Mobile preview sidebar on desktop
- Eyebrow text establishing studio positioning
- Location note: "Based in Indonesia — Available for selected projects"
- Framer Motion entrance animation (fade + translate)

### 2. Capability Strip
- Horizontal strip displaying core capabilities
- "Web Design / Development / UI/UX Design / Digital Products"
- Separator-based layout with subtle typography
- Border-top/bottom visual break

### 3. Selected Work Section
- Editorial-scale project cards with alternating aspect ratios
- First project uses square aspect on desktop for visual dominance
- Image hover with scale animation (duration: 700ms)
- Arrow icon with -45° rotation on hover
- Featured projects from data (Ardana Perkasa Group, Prada Badminton Club)
- Stagger animation for card entrance
- "View all work" link with animated arrow

### 4. Services Section
- Two-column layout: heading on left, numbered service list on right
- Services numbered 01–05 with editorial line treatment
- Hover state: border color change + arrow reveal/translate
- Removed generic icon cards in favor of typographic hierarchy
- Dark section background (bg-surface) for visual separation

### 5. Featured Case Study
- Dark inverted section (bg-foreground, text-background)
- Spotlights Ardana Perkasa Group as featured case
- Two-column grid: content left, visual placeholder right
- Challenge/Approach structure with no fake metrics
- Browser-chrome placeholder for future project visual
- White CTA button on dark background

### 6. Products Section
- Grid layout for digital product cards
- Enhanced ProductCard with border, hover shadow
- Honest "Coming Soon" badges
- "Explore Products" link

### 7. Why BITMIND Section
- Four value propositions: Design with purpose, Built for every screen, Design & development unified, From idea to launch
- Large accent numbers (01–04) with light weight
- Surface background for contrast

### 8. Process Section
- Six-step workflow: Discover → Plan → Design → Build → Review → Launch
- Card-based layout with border hover
- Numbered steps with light accent styling

### 9. About Section
- Card-based preview section
- "Built around ideas and technology" headline
- Two-paragraph studio introduction
- Ghost button: "Learn More →"
- No fake team photos or lengthy CV content

### 10. Final CTA Section
- Large centered dark section
- "Have an idea? Let's build it." headline
- Dual CTAs: "Start a Project" + "Get in Touch"
- "Available for selected projects" footer note

---

## Components

### New Components Created

**Animation Wrappers (Client Components):**
- `src/components/shared/FadeIn.tsx` — Scroll-triggered fade + translate animation with `useInView` hook
- `Stagger` and `StaggerItem` — Sequential animation for lists/grids

**Section Components:**
- `src/components/sections/HeroSection.tsx` (Client Component)
- `src/components/sections/CapabilityStrip.tsx`
- `src/components/sections/SelectedWorkSection.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/components/sections/FeaturedCaseStudy.tsx`
- `src/components/sections/ProductsSection.tsx`
- `src/components/sections/WhyBitmindSection.tsx`
- `src/components/sections/ProcessSection.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/sections/FinalCTASection.tsx`

### Components Modified

**`src/components/navigation/Navbar.tsx`:**
- Redesigned brand wordmark: stacked "BITMIND" + "STUDIO" with accent color on subtitle
- Refined scroll-triggered backdrop blur and padding transitions
- Fixed mobile menu offset (now `top-[76px]` matching new navbar height)
- Added hover state to hamburger button

**`src/components/layout/Footer.tsx`:**
- Updated brand wordmark to match navbar
- Added `bitmindstudio.id` domain display
- Updated social links to point to `/bitmindstudio` or `/company/bitmindstudio` placeholder structure
- Refined footer layout and spacing

**`src/components/ui/Button.tsx`:**
- Added `disabled` state support
- Enhanced hover states with subtle shadow on primary variant
- Changed `transition-colors` to `transition-all` for smoother animations

**`src/components/ui/ProjectCard.tsx`:**
- Added image scale animation on hover (500ms duration)
- Enhanced placeholder with border transition
- Improved hover state for title color

**`src/components/ui/ProductCard.tsx`:**
- Added border, padding, and card-based layout
- Hover state includes border-accent and shadow
- Image scale animation on hover

---

## Responsive

**Mobile (375px – 767px):**
- Hero headline uses `clamp(2.6rem, 7.5vw, 5.5rem)` for responsive scaling
- Hero browser preview adapts: hides mobile sidebar, adjusts padding
- Capability strip wraps naturally with separator logic
- Selected Work: single column grid
- Services: content flows vertically, arrow hidden
- Featured Case Study: single column, content-first layout
- Products: single column
- Why BITMIND: single column value propositions
- Process: 1-column card grid
- Navbar: stacked wordmark, hamburger menu
- Footer: stacked columns

**Tablet (768px – 1023px):**
- Hero: maintains single-column layout with larger typography
- Selected Work: 2-column grid introduced
- Services: maintains 2-column structure
- Featured Case Study: maintains single column
- Products: 2-column grid
- Why BITMIND: 2-column grid
- Process: 2-column grid

**Desktop (1024px+):**
- Hero: grid layout with browser preview dominance
- Capability strip: horizontal with separators
- Selected Work: 2-column with first project given square aspect
- Services: 2-column editorial layout (heading | list)
- Featured Case Study: 2-column (content | visual)
- Products: 3-column grid
- Why BITMIND: 4-column grid
- Process: 3-column grid
- Navbar: horizontal navigation visible
- Footer: 4-column grid

**Container max-width:** 1280px with responsive horizontal padding (20px mobile → 64px large desktop)

---

## Motion

**Animation Library:** Framer Motion v13

**Animation Strategy:**
- Kept Server Components as default
- Created `"use client"` animation wrappers (`FadeIn`, `Stagger`, `StaggerItem`)
- Minimal JavaScript footprint by isolating motion to wrapper components

**Animations Applied:**

1. **Hero Section (HeroSection.tsx is Client Component):**
   - Main content: fade + translateY (32px → 0) over 0.7s
   - Browser preview: fade + translateY (40px → 0) over 0.8s with 0.2s delay
   - Easing: cubic-bezier(0.21, 0.47, 0.32, 0.98)

2. **Scroll-Reveal Sections:**
   - `FadeIn` wrapper: triggers when element enters viewport (margin: -60px)
   - Opacity 0 → 1, translateY 24px → 0
   - Duration: 0.5s, delay configurable
   - Applied to: section headings, card grids, content blocks

3. **Stagger Animations:**
   - `Stagger` container with configurable delay (default 0.08s)
   - `StaggerItem` children animate sequentially
   - Applied to: project cards, service list, process steps, value propositions

4. **Micro-interactions:**
   - Image scale on hover: `scale(1) → scale(1.05)` over 500-700ms
   - Arrow translate on hover: `translateX(0) → translateX(4px)` or `rotate(-45deg)`
   - Button shadow on hover
   - Border color transitions: 200-300ms

5. **Reduced Motion Support:**
   - Added `@media (prefers-reduced-motion: reduce)` in `globals.css`
   - Forces all animations to 0.01ms duration
   - Framer Motion respects `useReducedMotion` hook internally

**Timing:**
- Entrance: 0.5s – 0.8s
- Hover: 0.3s – 0.5s
- Image scale: 0.5s – 0.7s

---

## Accessibility

**Semantic HTML:**
- Proper heading hierarchy: single `<h1>` in hero, `<h2>` for section titles, `<h3>` for cards
- `<section>` elements for major page sections
- `<nav>` for navigation
- `<footer>` for footer
- `<header>` for navbar

**Keyboard Navigation:**
- All interactive elements focusable via Tab
- Focus ring visible: `focus-visible:ring-2 ring-accent`
- Mobile menu: `aria-expanded`, `aria-controls`, `aria-label` attributes
- No keyboard traps

**Screen Reader Support:**
- Alt text on all images (or intentional placeholder with descriptive text)
- Aria labels on icon-only buttons
- Meaningful link text (no "click here")

**Color Contrast:**
- Foreground on background: #111111 on #F6F6F3 (AAA)
- Muted foreground: #707070 on #F6F6F3 (AA)
- Accent text: #4F46E5 (sufficient contrast for UI elements)
- Dark section: #F5F5F5 on #111111 (AAA)

**Motion Considerations:**
- `prefers-reduced-motion` media query implemented
- Disables all animations for users who request reduced motion
- Framer Motion respects system preferences

---

## Performance

**Client Components (JavaScript Required):**
1. `src/components/navigation/Navbar.tsx` — scroll state, mobile menu state
2. `src/components/sections/HeroSection.tsx` — hero entrance animation
3. `src/components/shared/FadeIn.tsx` — animation wrapper (imported by Server Components)

**Server Components (Default):**
- All page routes (`page.tsx`)
- All section components except Hero
- All layout components (Container, Section, SectionHeading, Footer)
- All UI cards (ProjectCard, ProductCard, ServiceCard, Badge, Button when used as Server Component)

**Image Optimization:**
- All images use `next/image` with `fill` + `sizes` attribute
- Lazy loading by default
- No `priority` or `preload` used yet (hero placeholder doesn't require it)

**Bundle Size:**
- Framer Motion only loads in Hero and animation wrapper
- Lucide React icons tree-shaken (only `ArrowRight`, `Menu`, `X` imported)

**No Hydration Issues:**
- Tested build successfully
- Client/Server boundary correctly defined

---

## Validation

```text
npm run lint
PASS (no errors)

npm run build
PASS (compiled successfully in 669ms, TypeScript passed in 2.8s)
```

---

## Technical Notes

**Placeholder Assets:**
- Hero browser-chrome mockup is intentional, branded placeholder (not random screenshot)
- Project cards: text-only placeholders with project name + category
- Featured case study visual: border-based placeholder
- Product cards: text-only placeholders
- No fake/random images from internet used

**Social Links:**
- Updated to `/bitmindstudio` structure (Instagram, LinkedIn, GitHub)
- Links are placeholders until real accounts established

**Hard-coded Content:**
- Hero headline, services list, process steps, value propositions are final production copy
- No Lorem Ipsum used anywhere

**Not Implemented (Per Phase 2 Scope):**
- Dark mode toggle
- CMS integration
- Real project images (awaiting assets)
- Contact form backend
- Product purchase flow
- Blog
- Full services/work detail page redesigns
- Customer accounts
- Analytics dashboard

**Removed:**
- Default `create-next-app` scaffold SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) deleted from `public/`

**Known Limitations:**
- Mobile navbar offset uses hard-coded `top-[76px]` — if navbar height changes significantly, this must be updated
- Featured case study content specific to Ardana Perkasa Group — future phases should make this dynamic
- Social links point to placeholder URLs

---

## Next Phase

```text
Ready for Phase 3 — Portfolio & Case Study Experience.

Waiting for approval before continuing.
```
