# Sagar Vashist — Personal Portfolio

Production-ready, single-page personal portfolio website for **Sagar Vashist**, Full-Stack Developer and B.Tech Electronics & Communication Engineering student from Delhi, India.

Built with an editorial engineer-portfolio aesthetic: near-black canvas with ambient glow, oversized display headlines with tight tracking, small monospace labels, numbered sections (00–06), custom circular trailing cursor, interactive dot-lattice canvas, generative project visuals, infinite tech marquee, accessible accordion toolkit, and interactive contact form with Resend integration.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS token variables (`@theme`)
- **Animation**: [Motion](https://motion.dev/) (Framer Motion v12)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) (hardware-accelerated, disabled on touch/reduced-motion)
- **Typography**: `Unbounded` (display), `Geist` (body), `Geist Mono` (metadata/labels) via `next/font/google`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Validation**: [Zod](https://zod.dev/)
- **Email Delivery**: [Resend](https://resend.com/) with graceful mailto fallback
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (tested on Node v22)
- `pnpm` (or `npm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/sagar-vashist/portfolio.git
cd Sagar_Personal_Portfolio

# Install dependencies
pnpm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and set your credentials:

```bash
cp .env.example .env.local
```

```env
# Resend API key for contact form delivery
RESEND_API_KEY=re_your_api_key_here

# Delivery address
CONTACT_TO_EMAIL=sagarvashist02@gmail.com

# Verified sender in Resend
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>

# Production canonical domain
NEXT_PUBLIC_SITE_URL=https://sagarvashist.dev
```

> **Note**: If `RESEND_API_KEY` is omitted, the contact form gracefully degrades by presenting an interactive prompt and pre-filled email client fallback button (`mailto:`).

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `pnpm dev` | Starts local Next.js development server |
| `build` | `pnpm build` | Builds optimized production bundle |
| `start` | `pnpm start` | Runs the production build locally |
| `lint` | `pnpm lint` | Runs ESLint analysis |
| `typecheck` | `pnpm typecheck` | Runs strict TypeScript verification (`tsc --noEmit`) |

---

## 📁 Source Architecture

```
src/
├── app/
│   ├── api/contact/route.ts    # POST endpoint with rate limit & Resend mailer
│   ├── layout.tsx              # Fonts, theme script, JSON-LD Person schema, landmarks
│   ├── page.tsx                # Single-page composer (00–06 sections)
│   ├── opengraph-image.tsx     # Dynamic 1200×630 OG social banner
│   ├── sitemap.ts              # XML sitemap generator
│   ├── robots.ts               # Web crawler directive
│   ├── manifest.ts             # PWA web manifest
│   ├── not-found.tsx           # Custom 404 handler
│   └── error.tsx               # Client error boundary
├── components/
│   ├── cursor/CustomCursor.tsx # Spring-physics custom cursor (fine pointers only)
│   ├── intro/IntroSplash.tsx   # Once-per-session skippable SV monogram wipe
│   ├── layout/                 # Header, MenuOverlay, SectionRail, ScrollProgress, Footer, ThemeToggle, SkipLink
│   ├── sections/               # Hero (00), About (01), Work (02), Stack (03), Experience (04), Learning (05), Contact (06)
│   ├── ui/                     # Button, MagneticButton, Chip, Card, SectionHeader, Reveal, SplitLines, Accordion, Marquee, CountUp, Toast, Tooltip
│   └── visuals/                # DotLattice, KanbanVisual, MapVisual, WaveformVisual, Monogram
├── data/                       # Source of truth: profile, projects, experience, education, certifications, skills
├── hooks/                      # useLenis, useActiveSection, useReducedMotion, useIsTouch, useInView, useMediaQuery
├── lib/                        # utils, seo, rate-limit, validators
└── styles/                     # globals.css (design tokens, animations, layer overrides)
```

---

## ✏️ Customization & Adding Data

All content is driven by strongly-typed data files in `src/data/`:

### 1. Adding Project Live URLs and GitHub Links
In `src/data/projects.ts`, simply fill in `liveUrl` and `githubUrl`:
```ts
{
  slug: "opsforge",
  // ...
  liveUrl: "https://opsforge.example.com", // Button automatically appears!
  githubUrl: "https://github.com/sagar-vashist/opsforge", // Button automatically appears!
}
```
If either field is left as `""`, the corresponding button **gracefully hides**.

### 2. Adding Custom Project Screenshots
Place your screenshot inside `/public/images/projects/opsforge.png` and update:
```ts
image: "/images/projects/opsforge.png"
```
When `image` is empty (`""`), the project renders its custom generative visual instead (Kanban, Map, or Waveform).

### 3. Adding a Profile Photo
Place your photo in `/public/images/sagar.jpg` and update `src/data/profile.ts`:
```ts
photo: "/images/sagar.jpg"
```
When empty (`""`), the About section displays the generative monogram card ("SV").

### 4. Updating Availability Status
Change `availability` in `src/data/profile.ts`:
```ts
availability: "OPEN TO OPPORTUNITIES"
```
The header status pill and hero metadata will update immediately.

---

## 🚢 Deploying to Vercel

1. Push your code to a GitHub repository:
   ```bash
   git add .
   git commit -m "feat: initial commit for Sagar Vashist personal portfolio"
   git push origin main
   ```
2. Log into [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import the repository.
4. Add environment variables in the Vercel dashboard:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
5. Click **Deploy**. Vercel will automatically build and deploy the Next.js application.

---

## ♿ Accessibility & Performance Standards

- **WCAG 2.2 AA Compliant**: All color combinations exceed 4.5:1 contrast in both dark and light modes.
- **Keyboard Navigation**: Full keyboard operability with custom mint `:focus-visible` ring.
- **Reduced Motion**: Full fallback across animations, marquee, canvas, and smooth scroll under `prefers-reduced-motion: reduce`.
- **Mobile First**: Fluid clamping from 320px up to 2560px with touch target sizing >= 44×44px.
- **Zero Layout Shift (CLS)**: Self-hosted Google Fonts via `next/font` with `font-display: swap`.
