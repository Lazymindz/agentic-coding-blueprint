export interface SlideData {
  id: number;
  title: string;
  description: string;
  content: string;
  tags: string[];
  route: string;
}

export const slidesData: SlideData[] = [
  {
    id: 1,
    title: "Welcome to the Future of Software",
    description: "Introduction to agentic coding and the new paradigm of AI-developer collaboration",
    content: "What is Agentic Coding? It's a new paradigm where developers collaborate with AI agents to build software. Think of it as moving from a solo activity to a partnership.\n\n• From Code Completion to Collaboration: Agents aren't just for finishing lines; they can write code, fix bugs, and build entire features.\n• Focus on the \"What,\" Not the \"How\": Your job is to define the goal; the AI handles the implementation details.\n• The Next Evolution: This is as significant as the shift from assembly to high-level languages. Welcome to Software 3.0.",
    tags: ["introduction", "paradigm", "collaboration"],
    route: "/slide/1"
  },
  {
    id: 2,
    title: "The New Mindset: You're the Architect",
    description: "Understanding your role as the senior architect in the AI partnership",
    content: "The AI is your new co-worker. Treat it like one. It's a brilliant, fast, but junior developer. It needs your guidance and expertise.\n\nYour New Role:\n• Senior Architect: You design the system and break down complex problems into smaller, manageable tasks.\n• Project Manager: You provide the AI with the right context, resources, and instructions.\n• Quality Assurance: You review the AI's work, provide feedback, and ensure the final output meets the required standards.",
    tags: ["mindset", "architecture", "leadership"],
    route: "/slide/2"
  },
  {
    id: 3,
    title: "The Core Workflow: The Iterative Loop",
    description: "Master the continuous cycle of prompt, review, refine, and repeat",
    content: "Agentic coding is a continuous cycle of collaboration.\n\n1. Prompt: Give the AI a clear, specific, and context-rich task.\n2. Review: Carefully examine the AI's output. Does it meet the requirements? Is it correct? Is it well-written?\n3. Refine: Provide clear, concise feedback. Ask for changes, corrections, or improvements.\n4. Repeat: Continue this loop until you achieve the desired outcome.\n\nPro-Tip: Encourage the model to \"think step by step\" before writing code. This forces it to break down the problem and show its work, making it easier to debug its reasoning.",
    tags: ["workflow", "iteration", "process"],
    route: "/slide/3"
  },
  {
    id: 4,
    title: "The Most Critical Concept: Context",
    description: "Understanding context as the LLM's short-term memory and quality determinant",
    content: "Context is the LLM's \"short-term memory.\" The quality of your context determines the quality of the output.\n\nWhat is Context?\n• System Prompt: The initial instructions, role, and tool definitions.\n• Retrieved Information (RAG): Documents, code snippets, or other data you provide.\n• Conversation History: The ongoing dialogue between you and the agent.\n\nEverything is Context Engineering. Mastering it is the key to success.",
    tags: ["context", "engineering", "memory"],
    route: "/slide/4"
  },
  {
    id: 5,
    title: "The #1 Pitfall: How Context Fails",
    description: "Common context failures and the treacherous nature of large context windows",
    content: "Large context windows are powerful, but they can be treacherous. Here's how they fail:\n\n• DON'T let the context get poisoned: An early error or hallucination can be referenced repeatedly, leading the agent down a rabbit hole.\n• DON'T let the context cause distraction: Too much information can cause the agent to over-focus on the history and ignore its core instructions.\n• DON'T let the context cause confusion: Irrelevant information can lead to low-quality or incorrect responses.\n• DON'T let the context clash: Conflicting information can cause the agent to make incorrect assumptions.\n\nA common symptom of these failures is the \"lost in the middle\" problem, where the LLM ignores information in the middle of a long context.",
    tags: ["pitfalls", "context", "debugging"],
    route: "/slide/5"
  },
  {
    id: 6,
    title: "Best Practices: Context Engineering",
    description: "Effective strategies for managing context and avoiding common pitfalls",
    content: "How to manage context effectively:\n\n• DO be deliberate: Carefully select what you include in the context. Provide the full file structure and relevant library documentation.\n• DO re-rank your documents: Move the most relevant information to the beginning or end of the context window to combat the \"lost in the middle\" problem.\n• DO use small-to-large chunking: Retrieve small, specific chunks of information first, then expand the context as needed.\n• DO provide examples: Give the model a clear example of the desired output format. This is often more effective than describing it in words.\n• DO use query transformations: Instead of using the user's raw query, transform it to be more effective for retrieval (e.g., HyDE, Multi-Query).\n\nPro-Tip: Treat context as the primary subject of debugging. When an agent fails, inspect the exact context it received at that moment. Was the right information missing, unclear, or buried?",
    tags: ["best-practices", "context", "optimization"],
    route: "/slide/6"
  },
  {
    id: 7,
    title: "Architectural Patterns for AI Systems",
    description: "Choosing between workflows and agents for predictable vs unpredictable tasks",
    content: "Now that you understand context, let's look at how to structure AI systems. Favor simple, composable patterns over complex, monolithic agents.\n\nWorkflows vs. Agents:\n• Workflows: Use for predictable tasks. Orchestrate LLMs and tools with predefined code.\n• Agents: Use for unpredictable tasks. Let the LLM dynamically decide the steps and tools.\n\nCommon Workflow Patterns:\n• Prompt Chaining: Decompose a task into a sequence of steps.\n• Routing: Classify an input and direct it to a specialized tool or prompt.\n• Orchestrator-Workers: A central \"orchestrator\" LLM delegates tasks to specialized \"worker\" LLMs.\n\nWith these high-level patterns in mind, let's look at the specific principles for building production-ready agents.",
    tags: ["architecture", "patterns", "workflows"],
    route: "/slide/7"
  },
  {
    id: 8,
    title: "The 12-Factor Agent: Production Principles (Part 1)",
    description: "First six principles for building robust, production-ready AI agents",
    content: "Inspired by the 12-Factor App, these principles apply within the patterns above to create robust agents.\n\n1. Natural Language to Tool Calls: Translate requests into structured JSON your application can execute.\n2. Own Your Prompts: Treat prompts as first-class code. Version and test them.\n3. Own Your Context Window: You are the context engineer. Control what goes in and out.\n4. Tools Are Just Structured Outputs: Think of tools as a way for the LLM to give you structured JSON.\n5. Own Your Control Flow: Implement your own loops, error handling, and state management.\n6. Small, Focused Agents: Decompose complex tasks into smaller, single-purpose agents.",
    tags: ["12-factor", "production", "principles"],
    route: "/slide/8"
  },
  {
    id: 9,
    title: "The 12-Factor Agent: Production Principles (Part 2)",
    description: "Final six principles covering state management, error handling, and deployment",
    content: "7. Unify Execution State and Business State: Use a single, append-only log of events for the agent's state.\n8. Make Your Agent a Stateless Reducer: Think of your agent as a function: (state, event) -> new_state.\n9. Compact Errors into Context Window: Add errors to the context and let the LLM try to self-heal.\n10. Contact Humans with Tool Calls: Use a dedicated tool to request human input.\n11. Launch/Pause/Resume with Simple APIs: Design simple APIs to control the agent's lifecycle.\n12. Trigger from Anywhere: Decouple your agents from the UI so they can be triggered from anywhere.",
    tags: ["12-factor", "state", "deployment"],
    route: "/slide/9"
  },
  {
    id: 10,
    title: "Key Takeaways & The Golden Rule",
    description: "Essential do's and don'ts with the fundamental principle that still matters",
    content: "The Do's:\n• DO be the architect and the reviewer.\n• DO start simple and only add complexity when needed.\n• DO iterate and refine.\n• DO obsess over context.\n• DO own your prompts and control flow.\n• DO build small, focused, and stateless agents.\n\nThe Don'ts:\n• DON'T blindly trust the AI's output.\n• DON'T let your context get polluted.\n• DON'T let a framework hide the important details from you.\n\nThe Golden Rule: Fundamentals Still Matter.\nAI is a powerful tool, but it's not a replacement for strong software engineering skills. You still need to understand the code.",
    tags: ["takeaways", "best-practices", "fundamentals"],
    route: "/slide/10"
  },
  {
    id: 11,
    title: "Your Journey Starts Here",
    description: "Resources and next steps to dive deeper into agentic development",
    content: "This presentation is just the beginning. To dive deeper, explore the source materials:\n\n• Essential Reading for Agentic Engineers\n• 12-Factor Agents GitHub\n• Context Engineering: What it is, and techniques to consider\n• Context Engineering for Agents\n• How Long Contexts Fail and How to Fix Them\n• Anthropic's Claude Code Best Practices\n• Building Effective AI Agents\n\nStart experimenting, keep learning, and remember: the best way to understand agentic coding is to practice it. Your journey into the future of software development begins now.",
    tags: ["resources", "learning", "next-steps"],
    route: "/slide/11"
  }
];