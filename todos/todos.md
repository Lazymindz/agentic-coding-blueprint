# Full Migration Plan: BAML Foundation to Cloudflare Workers

## Overview
This plan outlines the complete migration of the BAML Foundation Setup (currently in worktree) to be compatible with Cloudflare Workers deployment while maintaining all AI-powered functionality.

---

## Phase 1: Core Infrastructure Migration

### 1.1 Worker Script Overhaul
* **Goal:** Integrate API functionality directly into Cloudflare Worker
* **Action:**
    1. **Merge API Routes into Worker:**
        - Rewrite `src/worker.ts` to handle both static assets and API routes
        - Integrate Hono routing directly in the worker context
        - Remove dependency on `@hono/node-server`
        - Implement route handling for `/api/health`, `/api/humanize/*` endpoints
    2. **Environment Variable Configuration:**
        - Add API keys to `wrangler.toml` environment variables:
          ```toml
          [env.production.vars]
          OPENAI_API_KEY = "your-openai-key"
          ANTHROPIC_API_KEY = "your-anthropic-key" 
          GOOGLE_API_KEY = "your-google-key"
          ```
        - Update BAML client configuration to use Workers environment
        - Test environment variable access in Workers runtime
    3. **Request/Response Handling:**
        - Adapt error handling for Workers environment
        - Implement proper CORS headers for API endpoints
        - Add request validation and rate limiting compatible with Workers

### 1.2 BAML Client Compatibility
* **Goal:** Ensure BAML client works in Cloudflare Workers runtime
* **Action:**
    1. **Runtime Compatibility Testing:**
        - Verify BAML client works with Workers V8 runtime (no Node.js APIs)
        - Test BAML client initialization in Workers context
        - Identify and replace any Node.js-specific dependencies
    2. **Client Configuration:**
        - Move BAML client initialization to worker context
        - Update import paths for Workers environment
        - Test all BAML functions (HumanizeText, QuickHumanize, etc.)
    3. **Fallback Mechanisms:**
        - Implement error handling for BAML client failures
        - Add backup providers for high availability
        - Test retry logic in Workers environment

---

## Phase 2: Frontend Integration

### 2.1 Merge Frontend Components
* **Goal:** Integrate new pages and routing from worktree to main branch
* **Action:**
    1. **Page Components:**
        - Merge `src/pages/ApiTest.tsx` for API testing interface
        - Merge `src/pages/BlueprintHome.tsx` and `src/pages/ToolsHome.tsx`
        - Merge `src/pages/tools/TextHumanizer.tsx` for text humanization UI
        - Update routing in `src/App.tsx` to include new pages
    2. **Component Updates:**
        - Merge `src/components/LegacySlideRedirect.tsx` and `src/components/SlideWrapper.tsx`
        - Update navigation to include Tools section
        - Ensure consistent styling with existing components
    3. **Library Integration:**
        - Add BAML client integration in `src/lib/baml-client.ts`
        - Update API calling logic for Workers environment
        - Test frontend-to-API communication

### 2.2 Build Process Updates
* **Goal:** Update build process for Workers deployment
* **Action:**
    1. **Package.json Updates:**
        - Remove Node.js-specific scripts (`dev:api`, Bun references)
        - Update build process to include BAML generation
        - Add Workers-compatible development workflow
    2. **Vite Configuration:**
        - Remove API proxy configuration (no longer needed)
        - Ensure build output is compatible with Workers
        - Test production build process
    3. **Dependencies:**
        - Remove `@hono/node-server` and `concurrently`
        - Keep `hono` and `@boundaryml/baml` for Workers usage
        - Verify all dependencies work in Workers environment

---

## Phase 3: Testing & Validation

### 3.1 Local Development Setup
* **Goal:** Create seamless local development experience
* **Action:**
    1. **Wrangler Development:**
        - Set up local Workers development with `wrangler dev`
        - Configure local environment variables for testing
        - Test API endpoints locally before deployment
    2. **Integration Testing:**
        - Test all BAML functions in Workers environment
        - Verify text humanization works end-to-end
        - Test error handling and fallback mechanisms
    3. **Frontend Testing:**
        - Test all new pages and components
        - Verify API integration works correctly
        - Test responsive design and user experience

### 3.2 Production Deployment Testing
* **Goal:** Ensure production deployment works flawlessly
* **Action:**
    1. **Staging Deployment:**
        - Deploy to Cloudflare Workers staging environment
        - Test all API endpoints with real API keys
        - Monitor performance and error rates
    2. **Load Testing:**
        - Test API endpoints under load
        - Verify rate limiting and error handling
        - Monitor Workers resource usage and limits
    3. **Security Validation:**
        - Ensure API keys are properly secured in Workers
        - Test CORS policies and security headers
        - Validate no sensitive data in logs or responses

---

## Phase 4: Production Deployment

### 4.1 Environment Configuration
* **Goal:** Set up production environment securely
* **Action:**
    1. **Secret Management:**
        - Add production API keys to Cloudflare Workers secrets
        - Configure proper access controls and rotation policies
        - Set up monitoring for API key usage and costs
    2. **Domain & Routing:**
        - Configure custom domain if needed
        - Set up proper routing for both static assets and API
        - Test SSL certificates and HTTPS enforcement
    3. **Performance Optimization:**
        - Configure Workers KV for caching if needed
        - Optimize bundle size for Workers deployment
        - Set up CDN caching for static assets

### 4.2 Monitoring & Observability
* **Goal:** Implement production monitoring
* **Action:**
    1. **Workers Analytics:**
        - Enable Cloudflare Workers analytics
        - Monitor request/response patterns and errors
        - Track API usage and performance metrics
    2. **BAML Observability:**
        - Enable BAML tracing and logging
        - Monitor AI model usage and costs
        - Track success/failure rates for AI operations
    3. **Alerting:**
        - Set up alerts for API failures or high costs
        - Monitor Workers resource limits and quotas
        - Create dashboard for key metrics

---

## Phase 5: Documentation & Cleanup

### 5.1 Documentation Updates
* **Goal:** Document new architecture and deployment process
* **Action:**
    1. **CLAUDE.md Updates:**
        - Document new Workers-based architecture
        - Add API endpoint documentation
        - Update development and deployment instructions
    2. **README Updates:**
        - Add information about AI-powered tools
        - Document environment variable requirements
        - Add troubleshooting guide for common issues
    3. **Code Documentation:**
        - Add JSDoc comments to new API functions
        - Document BAML schema and functions
        - Create architecture decision records (ADRs)

### 5.2 Cleanup & Maintenance
* **Goal:** Clean up deprecated code and establish maintenance processes
* **Action:**
    1. **Code Cleanup:**
        - Remove unused dependencies and files
        - Clean up worktree after successful migration
        - Archive old development artifacts
    2. **Maintenance Processes:**
        - Set up automated dependency updates
        - Create process for API key rotation
        - Establish monitoring and alerting procedures
    3. **Performance Optimization:**
        - Profile and optimize Workers performance
        - Implement caching strategies where appropriate
        - Monitor and optimize AI model usage costs

---

## Success Criteria

### Technical Requirements
- [ ] All API endpoints work in Cloudflare Workers environment
- [ ] BAML client functions correctly with all configured providers
- [ ] Frontend successfully communicates with Workers API
- [ ] No sensitive data exposed in client-side code or logs
- [ ] Production deployment completes without errors

### Performance Requirements
- [ ] API response times under 2 seconds for typical requests
- [ ] Workers stay within resource limits under normal load
- [ ] AI model costs stay within acceptable budgets
- [ ] No significant impact on static site performance

### User Experience Requirements
- [ ] All existing slide deck functionality preserved
- [ ] Text Humanizer tool works smoothly end-to-end
- [ ] Error handling provides clear, actionable feedback
- [ ] Loading states and progress indicators work correctly
- [ ] Responsive design works across devices

---

## Estimated Timeline

- **Phase 1 (Infrastructure):** 3-5 days
- **Phase 2 (Frontend Integration):** 2-3 days  
- **Phase 3 (Testing):** 2-3 days
- **Phase 4 (Production Deployment):** 1-2 days
- **Phase 5 (Documentation):** 1-2 days

**Total Estimated Time:** 9-15 days

---

## Risk Mitigation

### High Risk Items
1. **BAML Client Workers Compatibility:** If BAML doesn't work in Workers, may need to find alternative AI client or use external API
2. **Performance Constraints:** Workers have CPU/memory limits that may affect AI processing
3. **Cost Management:** AI API costs could become significant without proper controls

### Mitigation Strategies  
1. **Early Compatibility Testing:** Test BAML in Workers environment before full migration
2. **Progressive Migration:** Migrate one component at a time to identify issues early
3. **Rollback Plan:** Keep worktree available for quick rollback if major issues arise
4. **Cost Controls:** Implement rate limiting and monitoring from day one