# Phase 0: BAML Foundation Setup
**Status:** Refining
**Agent PID:** 36885

## Original Todo
## Phase 0: BAML Foundation Setup

* **Goal:** Establish BAML (Boundary AI Markup Language) as the foundation for all AI/LLM interactions
* **Action:**
    1. **Install BAML Dependencies:**
        - Add `@boundaryml/baml` for runtime functionality
        - Add `@boundaryml/baml-cli` as dev dependency for code generation
        - Update package.json scripts with BAML commands (`baml generate`, `baml validate`)
    2. **Create BAML Project Structure:**
        - Create `/baml` directory for all BAML definitions
        - Create `/baml/baml_src` for source files
        - Set up `/baml_client` directory for generated TypeScript clients
        - Create `baml.yaml` configuration file with provider settings
    3. **Configure Environment:**
        - Set up `.env` file structure for API keys (OpenAI, Anthropic, etc.)
        - Configure BAML providers and model selection
        - Set up environment-specific configurations (dev, staging, prod)
    4. **Define Base Templates:**
        - Create shared type definitions in `/baml/baml_src/shared/types.baml`
        - Define common error handling patterns
        - Build reusable prompt components

## Description
[what we're building]

## Implementation Plan
[how we are building it]
- [ ] Code change with location(s) if applicable (src/file.ts:45-93)
- [ ] Automated test: ...
- [ ] User test: ...

## Notes
[Implementation notes]