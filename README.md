# A Developer's Guide to Agentic Coding

A comprehensive slide deck application presenting best practices and principles for AI-powered software development workflows.

## About This Project

This educational presentation covers 11 key topics for developers starting their journey with AI coding assistants like Claude Code. The content focuses on practical strategies for effective collaboration with AI agents, context engineering, and building production-ready AI systems.

## Topics Covered

1. **Welcome to the Future of Software** - Introduction to agentic coding as Software 3.0
2. **The New Mindset: You're the Architect** - Shifting from solo coding to AI collaboration  
3. **The Core Workflow: The Iterative Loop** - Prompt, review, refine, repeat cycle
4. **The Most Critical Concept: Context** - Understanding context as LLM's short-term memory
5. **The #1 Pitfall: How Context Fails** - Common context window issues and solutions
6. **Best Practices: Context Engineering** - Techniques for effective context management
7. **Architectural Patterns for AI Systems** - Workflows vs agents, common patterns
8. **12-Factor-Agents: Production Principles (Part 1)** - First 6 principles for robust agents
9. **12-Factor-Agents: Production Principles (Part 2)** - Remaining 6 principles
10. **Key Takeaways & The Golden Rule** - Essential do's and don'ts
11. **Your Journey Starts Here** - Additional resources and next steps

## Development

### Prerequisites
- Node.js & npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Setup
```sh
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Commands
- `npm run dev` - Start development server on localhost:8080
- `npm run build` - Build for production
- `npm run build:dev` - Build for development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Technology Stack

- **Build Tool**: Vite with React SWC plugin
- **Framework**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Tailwind CSS animations + custom keyframes
- **Development**: ESLint, PostCSS, Autoprefixer

## Deployment

This project is optimized for deployment to Cloudflare Workers. Build the project and deploy the `dist/` folder to your Cloudflare Workers site.

```sh
npm run build
```

The build output will be in the `dist/` directory, ready for static hosting on Cloudflare Workers.

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
