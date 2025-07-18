# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React TypeScript slide deck application built with Vite, shadcn/ui, and Tailwind CSS. The application presents "A Developer's Guide to Agentic Coding" - an educational presentation about AI-powered software development workflows and best practices for working with AI coding assistants like Claude Code.

The slide deck covers 11 key topics including the fundamentals of agentic coding, context engineering, architectural patterns, and production-ready agent development principles.

## Technology Stack

- **Build Tool**: Vite with React SWC plugin
- **Framework**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Tailwind CSS animations + custom keyframes
- **Development**: ESLint, PostCSS, Autoprefixer

## Key Commands

### Development
```bash
npm run dev          # Start development server on localhost:8080
npm run build        # Build for production
npm run build:dev    # Build for development mode
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

### Installation & Setup
```bash
npm install          # Install dependencies
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Footer.tsx      # Footer component
│   ├── Header.tsx      # Header component
│   ├── HeroSection.tsx # Landing hero section
│   └── SlideCard.tsx   # Individual slide card component
├── data/               # Static data
│   └── slides.ts       # Slide content data
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
│   └── utils.ts        # Common utilities (cn, etc.)
├── pages/              # Route pages
│   ├── Index.tsx       # Home page
│   ├── NotFound.tsx    # 404 page
│   └── slides/         # Individual slide components (Slide01-11)
├── App.tsx             # Main app component
├── index.css           # Global styles with CSS variables
└── main.tsx            # Application entry point
```

## Key Configuration

### Path Aliases
- `@/*` → `./src/*` (configured in tsconfig.json and vite.config.ts)

### CSS Variables & Themes
Custom CSS variables defined in `src/index.css` support:
- Dark/light mode switching
- Custom color palette with glow effects
- Gradient backgrounds
- Custom animations (fade-in, slide-in, glow-pulse)

### Build Configuration
- **Port**: 8080 (configured in vite.config.ts)
- **Host**: All interfaces ("::")
- **Lovable Tagger**: Enabled in development mode only

## Development Notes

- **Component Library**: Uses shadcn/ui with default styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **TypeScript**: Strict mode enabled with custom compiler options
- **Styling**: CSS variables for theme customization, custom animations
- **Images**: Uses placeholder.svg in public folder for image fallbacks

## Content Overview

The slide deck covers:

1. **Welcome to the Future of Software** - Introduction to agentic coding as Software 3.0
2. **The New Mindset: You're the Architect** - Shifting from solo coding to AI collaboration
3. **The Core Workflow: The Iterative Loop** - Prompt, review, refine, repeat cycle
4. **The Most Critical Concept: Context** - Understanding context as LLM's short-term memory
5. **The #1 Pitfall: How Context Fails** - Common context window issues and solutions
6. **Best Practices: Context Engineering** - Techniques for effective context management
7. **Architectural Patterns for AI Systems** - Workflows vs agents, common patterns
8. **12-Factor Agent: Production Principles (Part 1)** - First 6 principles for robust agents
9. **12-Factor Agent: Production Principles (Part 2)** - Remaining 6 principles
10. **Key Takeaways & The Golden Rule** - Essential do's and don'ts
11. **Your Journey Starts Here** - Additional resources and next steps

## Deployment

This project is configured for deployment through Lovable.dev. Changes pushed to the repository are automatically reflected in the Lovable project.

## File Naming Conventions

- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Pages: PascalCase with descriptive names (e.g., `Slide01.tsx`)
- CSS: kebab-case for classes, CSS variables use custom properties