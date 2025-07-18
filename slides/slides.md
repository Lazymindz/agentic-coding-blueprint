---
tags: [AI, LLM, AgenticCoding, SoftwareEngineering, BestPractices, PromptEngineering, ContextEngineering, Summary, Presentation, Guide]
---

# A Developer's Guide to Agentic Coding

**A presentation for developers starting their journey with AI-powered software development.**

---

## Slide 1: Welcome to the Future of Software

**What is Agentic Coding?**

It's a new paradigm where developers collaborate with AI agents to build software. Think of it as moving from a solo activity to a partnership.

-   **From Code Completion to Collaboration:** Agents aren't just for finishing lines; they can write code, fix bugs, and build entire features.
-   **Focus on the "What," Not the "How":** Your job is to define the goal; the AI handles the implementation details.
-   **The Next Evolution:** This is as significant as the shift from assembly to high-level languages. Welcome to **Software 3.0**.

---

## Slide 2: The New Mindset: You're the Architect

**The AI is your new co-worker. Treat it like one.**

It's a brilliant, fast, but junior developer. It needs your guidance and expertise.

**Your New Role:**

-   **Senior Architect:** You design the system and break down complex problems into smaller, manageable tasks.
-   **Project Manager:** You provide the AI with the right context, resources, and instructions.
-   **Quality Assurance:** You review the AI's work, provide feedback, and ensure the final output meets the required standards.

**Your most important job is to be the human-in-the-loop.**

---

## Slide 3: The Core Workflow: The Iterative Loop

Agentic coding is a continuous cycle of collaboration.

1.  **Prompt:** Give the AI a clear, specific, and context-rich task.
2.  **Review:** Carefully examine the AI's output. Does it meet the requirements? Is it correct? Is it well-written?
3.  **Refine:** Provide clear, concise feedback. Ask for changes, corrections, or improvements.
4.  **Repeat:** Continue this loop until you achieve the desired outcome.

> **Pro-Tip:** Encourage the model to "think step by step" before writing code. This forces it to break down the problem and show its work, making it easier to debug its reasoning.

---

## Slide 4: The Most Critical Concept: Context

**Context is the LLM's "short-term memory." The quality of your context determines the quality of the output.**

**What is Context?**

-   **System Prompt:** The initial instructions, role, and tool definitions.
-   **Retrieved Information (RAG):** Documents, code snippets, or other data you provide.
-   **Conversation History:** The ongoing dialogue between you and the agent.

**Everything is Context Engineering.** Mastering it is the key to success.

---

## Slide 5: The #1 Pitfall: How Context Fails (The "Don'ts")

Large context windows are powerful, but they can be treacherous. Here's how they fail:

-   **DON'T let the context get poisoned:** An early error or hallucination can be referenced repeatedly, leading the agent down a rabbit hole.
-   **DON'T let the context cause distraction:** Too much information can cause the agent to over-focus on the history and ignore its core instructions.
-   **DON'T let the context cause confusion:** Irrelevant information can lead to low-quality or incorrect responses.
-   **DON'T let the context clash:** Conflicting information can cause the agent to make incorrect assumptions.

**A common symptom of these failures is the "lost in the middle" problem, where the LLM ignores information in the middle of a long context.**

---

## Slide 6: Best Practices: Context Engineering (The "Do's")

How to manage context effectively:

-   **DO be deliberate:** Carefully select what you include in the context. Provide the full file structure and relevant library documentation.
-   **DO re-rank your documents:** Move the most relevant information to the beginning or end of the context window to combat the "lost in the middle" problem.
-   **DO use small-to-large chunking:** Retrieve small, specific chunks of information first, then expand the context as needed.
-   **DO provide examples:** Give the model a clear example of the desired output format. This is often more effective than describing it in words.
-   **DO use query transformations:** Instead of using the user's raw query, transform it to be more effective for retrieval (e.g., HyDE, Multi-Query).

> **Pro-Tip:** Treat context as the primary subject of debugging. When an agent fails, inspect the *exact* context it received at that moment. Was the right information missing, unclear, or buried?

---

## Slide 7: Architectural Patterns for AI Systems

Now that you understand context, let's look at how to structure AI systems. Favor simple, composable patterns over complex, monolithic agents.

-   **Workflows vs. Agents:**
    -   **Workflows:** Use for predictable tasks. Orchestrate LLMs and tools with predefined code.
    -   **Agents:** Use for unpredictable tasks. Let the LLM dynamically decide the steps and tools.

-   **Common Workflow Patterns:**
    -   **Prompt Chaining:** Decompose a task into a sequence of steps.
    -   **Routing:** Classify an input and direct it to a specialized tool or prompt.
    -   **Orchestrator-Workers:** A central "orchestrator" LLM delegates tasks to specialized "worker" LLMs.

**With these high-level patterns in mind, let's look at the specific principles for building production-ready agents.**

---

## Slide 8: The 12-Factor Agent: Production Principles (Part 1)

Inspired by the 12-Factor App, these principles apply within the patterns above to create robust agents.

-   **1. Natural Language to Tool Calls:** Translate requests into structured JSON your application can execute.
-   **2. Own Your Prompts:** Treat prompts as first-class code. Version and test them.
-   **3. Own Your Context Window:** You are the context engineer. Control what goes in and out.
-   **4. Tools Are Just Structured Outputs:** Think of tools as a way for the LLM to give you structured JSON.
-   **5. Own Your Control Flow:** Implement your own loops, error handling, and state management.
-   **6. Small, Focused Agents:** Decompose complex tasks into smaller, single-purpose agents.

---

## Slide 9: The 12-Factor Agent: Production Principles (Part 2)

-   **7. Unify Execution State and Business State:** Use a single, append-only log of events for the agent's state.
-   **8. Make Your Agent a Stateless Reducer:** Think of your agent as a function: `(state, event) -> new_state`.
-   **9. Compact Errors into Context Window:** Add errors to the context and let the LLM try to self-heal.
-   **10. Contact Humans with Tool Calls:** Use a dedicated tool to request human input.
-   **11. Launch/Pause/Resume with Simple APIs:** Design simple APIs to control the agent's lifecycle.
-   **12. Trigger from Anywhere:** Decouple your agents from the UI so they can be triggered from anywhere.

---

## Slide 10: Key Takeaways & The Golden Rule

**The Do's:**

-   **DO** be the architect and the reviewer.
-   **DO** start simple and only add complexity when needed.
-   **DO** iterate and refine.
-   **DO** obsess over context.
-   **DO** own your prompts and control flow.
-   **DO** build small, focused, and stateless agents.

**The Don'ts:**

-   **DON'T** blindly trust the AI's output.
-   **DON'T** let your context get polluted.
-   **DON'T** let a framework hide the important details from you.

**The Golden Rule: Fundamentals Still Matter.**
AI is a powerful tool, but it's not a replacement for strong software engineering skills. You still need to understand the code.

---

## Slide 11: Your Journey Starts Here

This presentation is just the beginning. To dive deeper, explore the source materials:

-   [Essential Reading for Agentic Engineers](https://steipete.me/posts/2025/essential-reading)
-   [12-Factor Agents GitHub](https://github.com/humanlayer/12-factor-agents)
-   [Context Engineering: What it is, and techniques to consider](https://www.llamaindex.ai/blog/context-engineering-what-it-is-and-techniques-to-consider)
-   [Context Engineering for Agents](https://blog.langchain.com/context-engineering-for-agents/)
-   [How Long Contexts Fail and How to Fix Them](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html)
-   [Anthropic's Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
-   [Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents)
