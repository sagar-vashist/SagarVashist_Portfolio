# Sagar Vashist — Personal Portfolio

Live site: [https://sagarvashist.vercel.app](https://sagarvashist.vercel.app)  
Developer: **Sagar Vashist** (Full-Stack Developer, Delhi, India)

A fast, responsive single-page portfolio built with Next.js 15, React 19, and Tailwind CSS v4 to showcase production web apps, engineering projects, and technical skills.

---

### Tech Stack & Services

- **Frontend & Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom dark/light theme CSS variables
- **Animations & Interaction**: Motion (`motion/react`), Lenis smooth scrolling
- **Email & Forms**: EmailJS (`@emailjs/browser`) with client-side Zod validation
- **Icons & Typography**: Lucide React, Geist & Unbounded fonts
- **Hosting & CI/CD**: Vercel

---

### Key Features

- **Single-page navigation**: Smooth section scrolling with quick-access desktop header and full-screen mobile drawer.
- **Dark & Light mode**: System-aware theme toggle with instant CSS variable switching and high-contrast readability.
- **Generative project visuals**: Interactive canvas and SVG components tailored to each project (Kanban board, ECG/PPG cardiac monitor, geocoded map, and audio waveform).
- **Interactive accordions**: Clean collapsible lists for Services and Tech Stack categories.
- **Spam-protected contact form**: Integrated with EmailJS, Honeypot bot protection, and client-side validation.
- **Mobile responsiveness**: Audited and tested across small Android (360px), iPhone SE, and modern iOS viewports with no horizontal overflow and 44px+ touch targets.
- **SEO & Social Sharing**: Dynamic OpenGraph images (`/opengraph-image`), JSON-LD schema, sitemap, and robots.txt.

---

### Featured Projects

- **OpsForge**: Full-stack software operations platform with Kanban workflows, Supabase, and PostgreSQL.
- **CardioSync AI**: Cardiovascular risk assessment system combining hardware sensors (ECG/PPG), signal preprocessing, and explainable AI.
- **Wanderlust**: Property listing web application featuring Node.js, Express, PostgreSQL, Prisma ORM, MapLibre geocoding, and RBAC authentication.
- **PrepWise AI**: Speech recognition and computer vision interview analytics platform for candidate performance evaluation.

---

### Services Offered

- **Full-Stack Web Development**: End-to-end web apps with React/Next.js and Node.js.
- **UI/UX Implementation**: Pixel-accurate layouts, smooth animations, and clean design systems.
- **Backend & REST APIs**: Structured databases, secure endpoints, and robust error handling.
- **Authentication & Security**: RBAC, encrypted credentials, rate limiting, and session security.
- **Performance & Optimization**: Core Web Vitals tuning, fast bundle loading, and TypeScript refactoring.

---

### Quick Setup

```bash
# 1. Clone repository
git clone https://github.com/sagar-vashist/SagarVashist_Portfolio.git
cd SagarVashist_Portfolio

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.example .env.local
# Add your EmailJS keys (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY) to .env.local

# 4. Start local dev server
pnpm dev
```

Open https://sagarvashist.vercel.app/ to view the site.
