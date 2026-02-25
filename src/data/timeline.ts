export interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "model" | "deployment" | "policy" | "research" | "economic";
  jobsAffected?: number;
  source?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "chatgpt-launch",
    date: "November 2022",
    year: 2022,
    title: "ChatGPT launches — 100M users in 60 days",
    description:
      "OpenAI releases ChatGPT, triggering the fastest consumer adoption of any technology in history. Millions of knowledge workers immediately begin using AI for writing, coding, analysis, and research.",
    impact: "high",
    category: "model",
    jobsAffected: 50_000_000,
    source: "OpenAI",
  },
  {
    id: "copilot-launch",
    date: "March 2022",
    year: 2022,
    title: "GitHub Copilot exits beta — AI pair programming goes mainstream",
    description:
      "GitHub Copilot launches publicly, completing 40% of developer code on average. The first major AI tool to demonstrably augment and partially replace human labor in a high-skill profession.",
    impact: "high",
    category: "deployment",
    jobsAffected: 4_400_000,
    source: "GitHub",
  },
  {
    id: "gpt4-launch",
    date: "March 2023",
    year: 2023,
    title: "GPT-4 surpasses human performance on professional exams",
    description:
      "OpenAI's GPT-4 scores in the top 10% on the Bar Exam, top 13% on the SAT, and passes the USMLE medical exam. The first model demonstrably capable across professional-level knowledge tasks.",
    impact: "high",
    category: "model",
    jobsAffected: 80_000_000,
    source: "OpenAI (2023)",
  },
  {
    id: "goldman-report",
    date: "March 2023",
    year: 2023,
    title: "Goldman Sachs: AI could replace 300M full-time jobs",
    description:
      "Goldman Sachs publishes landmark report estimating AI could automate 25-50% of current work tasks in advanced economies, equivalent to 300 million full-time jobs globally.",
    impact: "high",
    category: "research",
    jobsAffected: 300_000_000,
    source: "Goldman Sachs (2023)",
  },
  {
    id: "writers-strike",
    date: "May 2023",
    year: 2023,
    title: "Hollywood writers strike — AI replaces listed as central demand",
    description:
      "WGA and SAG-AFTRA strike over AI rights, becoming the first major labor action explicitly targeting AI replacement. Establishes a precedent for AI workplace negotiations.",
    impact: "medium",
    category: "policy",
    jobsAffected: 160_000,
    source: "WGA (2023)",
  },
  {
    id: "claude2-launch",
    date: "July 2023",
    year: 2023,
    title: "Claude 2 — 100K context window enables document-level AI work",
    description:
      "Anthropic releases Claude 2 with 100,000 token context window, enabling AI to process entire books, codebases, and legal documents in a single pass. Legal and financial research automation accelerates.",
    impact: "high",
    category: "model",
    jobsAffected: 2_000_000,
    source: "Anthropic",
  },
  {
    id: "gemini-launch",
    date: "December 2023",
    year: 2023,
    title: "Google Gemini — multimodal AI enters the enterprise",
    description:
      "Google releases Gemini, its most capable multimodal AI model, deeply integrated into Workspace products. Millions of enterprise workers gain AI writing, analysis, and coding tools overnight.",
    impact: "high",
    category: "deployment",
    jobsAffected: 60_000_000,
    source: "Google",
  },
  {
    id: "devin-launch",
    date: "March 2024",
    year: 2024,
    title: "Devin — the first 'AI software engineer' completes real tasks autonomously",
    description:
      "Cognition AI releases Devin, an autonomous AI agent that can complete end-to-end software engineering tasks including debugging, deployment, and documentation. The software developer role faces new pressure.",
    impact: "high",
    category: "model",
    jobsAffected: 4_400_000,
    source: "Cognition AI (2024)",
  },
  {
    id: "sora-launch",
    date: "February 2024",
    year: 2024,
    title: "OpenAI Sora — AI generates professional-grade video",
    description:
      "OpenAI releases Sora, generating up to 1-minute photorealistic videos from text. Film production, advertising, and media industries face immediate disruption.",
    impact: "high",
    category: "model",
    jobsAffected: 700_000,
    source: "OpenAI (2024)",
  },
  {
    id: "eu-ai-act",
    date: "March 2024",
    year: 2024,
    title: "EU AI Act becomes law — world's first comprehensive AI regulation",
    description:
      "The European Union's AI Act is formally adopted, creating risk-based regulations for AI systems. High-risk AI in healthcare, law enforcement, and employment faces strict requirements.",
    impact: "medium",
    category: "policy",
    source: "European Parliament (2024)",
  },
  {
    id: "claude3-opus",
    date: "March 2024",
    year: 2024,
    title: "Claude 3 Opus outperforms GPT-4 on most benchmarks",
    description:
      "Anthropic's Claude 3 family demonstrates that frontier AI capability is accelerating rapidly. Multiple models now exceed human expert performance on professional knowledge tests.",
    impact: "medium",
    category: "model",
    source: "Anthropic (2024)",
  },
  {
    id: "gpt4o-launch",
    date: "May 2024",
    year: 2024,
    title: "GPT-4o — real-time voice and vision AI goes live",
    description:
      "OpenAI releases GPT-4o with real-time voice conversation and vision capabilities. Customer service, sales calls, and voice-based roles face immediate disruption.",
    impact: "high",
    category: "model",
    jobsAffected: 3_000_000,
    source: "OpenAI (2024)",
  },
  {
    id: "o1-reasoning",
    date: "September 2024",
    year: 2024,
    title: "OpenAI o1 — AI achieves PhD-level reasoning in science",
    description:
      "OpenAI's o1 model performs at the 89th percentile on competitive programming, scores 83% on AIME math tests, and reaches PhD-level reasoning in physics, chemistry, and biology.",
    impact: "high",
    category: "model",
    jobsAffected: 5_000_000,
    source: "OpenAI (2024)",
  },
  {
    id: "wef-jobs-2025",
    date: "January 2025",
    year: 2025,
    title: "WEF: 85M jobs displaced, 97M new roles created by 2025",
    description:
      "World Economic Forum's Future of Jobs Report confirms that while AI displaces clerical and manual roles, new AI-adjacent jobs are emerging. Net employment impact depends heavily on retraining programs.",
    impact: "high",
    category: "research",
    jobsAffected: 85_000_000,
    source: "World Economic Forum (2025)",
  },
  {
    id: "claude-sonnet-4",
    date: "2025",
    year: 2025,
    title: "Claude Sonnet 4 — AI agents complete complex multi-step work autonomously",
    description:
      "Next-generation AI agents can now complete multi-day research projects, write and deploy code, manage projects, and coordinate complex workflows — pushing the automation frontier into knowledge work.",
    impact: "high",
    category: "model",
    jobsAffected: 20_000_000,
    source: "Anthropic (2025)",
  },
];

export function getEventsByYear(year: number): TimelineEvent[] {
  return timelineEvents.filter((e) => e.year === year);
}

export function getHighImpactEvents(): TimelineEvent[] {
  return timelineEvents.filter((e) => e.impact === "high");
}
