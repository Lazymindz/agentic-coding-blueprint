# Project: Agentic Coding Blueprint

An educational React TypeScript slide deck application presenting "A Developer's Guide to Agentic Coding" - comprehensive guidance for developers transitioning to AI-assisted software development workflows. Features 11 interactive slides covering fundamentals through production-ready principles for working with AI coding assistants.

## Features
- Interactive web-based slide deck with 11 comprehensive slides
- Mobile-responsive design with dark theme optimized for developers
- SEO-optimized with structured data and meta tags
- Grid overview and individual slide navigation
- Progressive learning path from fundamentals to production principles
- Live deployment at https://aiproof.me

## Tech Stack
- **Framework**: React 18.3.1 with TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1 with React SWC plugin
- **Styling**: Tailwind CSS 3.4.11 with shadcn/ui components
- **Routing**: React Router DOM 6.26.2
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Cloudflare Workers with Wrangler

## Structure
- `/src/components/` - React components including UI library
- `/src/pages/` - Route components and slide pages
- `/src/data/` - Slide content and SEO metadata
- `/src/lib/` - Utility functions
- `/todos/` - Project todos and planning documents
- `/api/` - Backend API (planned)
- `/baml/` - BAML definitions (planned)

## Architecture
- Component-based React architecture with TypeScript
- Client-side routing with dedicated slide components
- Static content management through TypeScript data files
- CSS variables for theming with Tailwind utility classes
- Path aliases (@/* → ./src/*) for clean imports

## Commands
- Build: `npm run build`
- Test: No test framework configured yet
- Lint: `npm run lint`
- Dev/Run: `npm run dev` (runs on port 8080)
- Preview: `npm run preview`
- Deploy: `npx wrangler deploy`

## Testing
No testing framework currently configured. Tests will be added as part of future enhancements.

## Editor
- Open folder: `cursor`