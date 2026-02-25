# Senku — The Human Automation Index

> Real-time intelligence on AI's impact across every profession on Earth.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-senku.fun-0ea5e9?style=flat-square)](https://senku.fun)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)

---

## Overview

Senku tracks automation risk across 25+ professions and 10+ industries. It translates complex AI research from Oxford, McKinsey, Goldman Sachs, and the World Economic Forum into clear, actionable data — so workers can understand where they stand and what to do about it.

---

## Features

- **Automation Risk Scores** — Every profession rated 0–100% with trend direction and timeline
- **Industry Radar** — Visual comparison of automation risk across all major sectors
- **Top At-Risk Tracker** — Live-ranked list of the most vulnerable professions
- **Profession Detail Pages** — What AI replaces, what humans keep, skills to learn
- **AI Timeline** — Key milestones in AI disruption from 2022 to today
- **Survival Guide** — Curated future-proof skills grouped by category
- **Weekly Alert** — Highlighted profession in the spotlight each week
- **Light / Dark Mode** — Smooth system-aware theme toggle
- **Fully Responsive** — Optimized for mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + CSS Variables |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Phosphor Icons (duotone) |
| Theme | next-themes |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css               # CSS variables, theme tokens, utilities
│   ├── layout.tsx                # Root layout — ThemeProvider, Header, Footer
│   ├── page.tsx                  # Home page
│   ├── professions/
│   │   └── page.tsx              # Searchable profession directory
│   ├── profession/
│   │   └── [slug]/page.tsx       # Individual profession detail
│   ├── industries/
│   │   └── page.tsx              # Industry overview + radar
│   ├── timeline/
│   │   └── page.tsx              # AI disruption timeline
│   ├── survival-guide/
│   │   └── page.tsx              # Future-proof skills guide
│   └── not-found.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Sticky nav with custom SVG logo
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx       # Light/dark toggle
│   ├── charts/
│   │   ├── AutomationGauge.tsx   # Half-donut risk gauge
│   │   ├── IndustryRadar.tsx     # Radar chart (Recharts)
│   │   └── TrendLine.tsx         # Projected automation trend line
│   ├── cards/
│   │   ├── ProfessionCard.tsx
│   │   ├── IndustryCard.tsx
│   │   └── SkillCard.tsx
│   ├── sections/
│   │   ├── Hero.tsx              # Animated landing hero with stats
│   │   ├── TopAtRisk.tsx         # Top 5 most at-risk professions
│   │   ├── IndustriesOverview.tsx
│   │   └── WeeklyAlert.tsx       # Weekly spotlight profession
│   └── ui/
│       ├── Badge.tsx             # Risk-level badge (critical/high/medium/low)
│       ├── Card.tsx
│       ├── ProgressBar.tsx       # Gradient progress bar
│       └── SearchInput.tsx
│
├── data/
│   ├── professions.ts            # 26 professions — single source of truth
│   ├── industries.ts             # 10 industries with risk data
│   ├── timeline.ts               # 15 AI disruption milestones
│   └── skills.ts                 # 12 future-proof skills
│
├── lib/
│   ├── utils.ts                  # cn, getRiskLevel, formatNumber, slugify…
│   └── constants.ts              # SITE_NAME, NAV_LINKS, STATS
│
└── providers/
    └── ThemeProvider.tsx
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/bedro95/senku.git
cd senku

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Home — Hero, top at-risk, industry overview, radar |
| `/professions` | Searchable & filterable profession directory |
| `/profession/[slug]` | Detailed view for each profession |
| `/industries` | Industry-level automation risk breakdown |
| `/timeline` | Chronological AI disruption events |
| `/survival-guide` | Future-proof skills by category |

---

## Data Sources

All risk scores and trend data are synthesized from peer-reviewed research and industry reports:

- **Oxford University** — *The Future of Employment* (Frey & Osborne)
- **McKinsey Global Institute** — *Jobs Lost, Jobs Gained*
- **Goldman Sachs** — *The Potentially Large Effects of AI on Economic Growth*
- **World Economic Forum** — *Future of Jobs Report*

> Data is curated and updated manually. Scores reflect current research consensus as of 2026.

---

## Risk Level System

| Score | Level | Meaning |
|---|---|---|
| 80–100% | Critical | Highly automatable in the near term |
| 60–79% | High | Significant automation exposure |
| 40–59% | Medium | Partial automation, role evolving |
| 0–39% | Low | Strong human irreplaceability |

---

## Design System

- **Icons** — [Phosphor Icons](https://phosphoricons.com) with `duotone` weight for decorative elements
- **Colors** — CSS custom properties (`var(--background)`, `var(--card)`, `var(--border)`) for full light/dark theming
- **Typography** — System font stack, `font-extrabold` for key metrics
- **Animations** — Framer Motion entrance animations, 150ms transitions for interactivity

---

## Developer

- **Lead Developer:** Bader Alkorgli
- **GitHub:** [@bedro95](https://github.com/bedro95)

---

## License

MIT © 2026 Senku. Built for the AGI era.
