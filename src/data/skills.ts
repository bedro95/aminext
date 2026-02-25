export interface Skill {
  id: string;
  name: string;
  category: "technical" | "cognitive" | "social" | "creative";
  demandTrend: "surging" | "growing" | "stable";
  description: string;
  whyItMatters: string;
  timeToLearn: string;
  resources: { name: string; type: "course" | "book" | "platform" }[];
  avgSalaryImpact: string;
  futureProofScore: number; // 0-100
}

export const skills: Skill[] = [
  // ─── Technical ───────────────────────────────────────────────────
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    category: "technical",
    demandTrend: "surging",
    description:
      "The art and science of crafting effective inputs for AI models to get precise, high-quality outputs. Essential for anyone using AI in their workflow.",
    whyItMatters:
      "As AI tools become standard across industries, the ability to direct AI effectively is as fundamental as typing was in the 1990s. Those who master it will exponentially multiply their output.",
    timeToLearn: "2–4 weeks",
    resources: [
      { name: "Prompt Engineering Guide (OpenAI)", type: "course" },
      { name: "DeepLearning.AI Short Courses", type: "platform" },
      { name: "The Art of Prompt Engineering", type: "book" },
    ],
    avgSalaryImpact: "+$15K–40K",
    futureProofScore: 88,
  },
  {
    id: "ai-tool-fluency",
    name: "AI Tool Fluency",
    category: "technical",
    demandTrend: "surging",
    description:
      "Proficiency across the major AI ecosystems: ChatGPT, Claude, Gemini, Midjourney, GitHub Copilot, Perplexity, and domain-specific tools.",
    whyItMatters:
      "Job postings requiring AI tool experience grew 400% in 2023–2024. The question is no longer 'will AI replace me?' but 'will someone who uses AI replace me?'",
    timeToLearn: "4–8 weeks",
    resources: [
      { name: "Google AI Essentials", type: "course" },
      { name: "Microsoft AI Skills Navigator", type: "platform" },
    ],
    avgSalaryImpact: "+$10K–25K",
    futureProofScore: 90,
  },
  {
    id: "data-literacy",
    name: "Data Literacy & Analysis",
    category: "technical",
    demandTrend: "surging",
    description:
      "The ability to read, work with, analyze, and communicate with data. Includes understanding statistics, interpreting charts, and using tools like Python, SQL, or Excel at a data analysis level.",
    whyItMatters:
      "AI generates enormous amounts of data. Professionals who can interpret and act on data will manage AI systems rather than be replaced by them.",
    timeToLearn: "3–6 months",
    resources: [
      { name: "Google Data Analytics Certificate (Coursera)", type: "course" },
      { name: "Kaggle Learn", type: "platform" },
      { name: "Storytelling with Data", type: "book" },
    ],
    avgSalaryImpact: "+$20K–50K",
    futureProofScore: 92,
  },
  {
    id: "ml-engineering",
    name: "Machine Learning Engineering",
    category: "technical",
    demandTrend: "surging",
    description:
      "Building, training, and deploying ML models in production. Goes beyond data science to include MLOps, model serving, monitoring, and optimization.",
    whyItMatters:
      "Every company will need ML engineers to build and maintain their AI systems. Demand far exceeds supply and will continue to do so.",
    timeToLearn: "6–18 months",
    resources: [
      { name: "fast.ai", type: "course" },
      { name: "Hugging Face Courses", type: "platform" },
      { name: "Designing Machine Learning Systems", type: "book" },
    ],
    avgSalaryImpact: "+$50K–120K",
    futureProofScore: 95,
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    category: "technical",
    demandTrend: "growing",
    description:
      "Protecting systems, networks, and data from digital attacks. As AI-powered cyberattacks become more sophisticated, human defenders are more critical than ever.",
    whyItMatters:
      "AI creates new attack vectors and AI systems need human security experts to protect them. The cybersecurity talent gap is projected at 3.5M unfilled positions by 2025.",
    timeToLearn: "6–24 months",
    resources: [
      { name: "CompTIA Security+", type: "course" },
      { name: "TryHackMe", type: "platform" },
      { name: "The Web Application Hacker's Handbook", type: "book" },
    ],
    avgSalaryImpact: "+$30K–80K",
    futureProofScore: 91,
  },

  // ─── Cognitive ────────────────────────────────────────────────────
  {
    id: "critical-thinking",
    name: "Critical Thinking & Judgment",
    category: "cognitive",
    demandTrend: "surging",
    description:
      "The ability to analyze information objectively, question assumptions, identify logical fallacies, and reach sound conclusions. Especially important for evaluating AI outputs.",
    whyItMatters:
      "AI can generate confident-sounding incorrect answers (hallucinations). Humans who can spot errors, challenge assumptions, and verify claims become the quality control layer for AI systems.",
    timeToLearn: "Continuous practice",
    resources: [
      { name: "Thinking, Fast and Slow (Kahneman)", type: "book" },
      { name: "Introduction to Logic (Coursera)", type: "course" },
    ],
    avgSalaryImpact: "Foundational for all roles",
    futureProofScore: 98,
  },
  {
    id: "systems-thinking",
    name: "Systems Thinking",
    category: "cognitive",
    demandTrend: "growing",
    description:
      "Understanding how complex systems work, including feedback loops, emergent behavior, and second-order effects. Essential for designing and managing AI-integrated workflows.",
    whyItMatters:
      "AI automation changes entire systems, not just individual tasks. Leaders who understand systems dynamics can navigate and direct this transformation.",
    timeToLearn: "3–6 months",
    resources: [
      { name: "Thinking in Systems (Meadows)", type: "book" },
      { name: "MIT System Dynamics Course", type: "course" },
    ],
    avgSalaryImpact: "+$15K–40K",
    futureProofScore: 90,
  },

  // ─── Social ──────────────────────────────────────────────────────
  {
    id: "leadership-influence",
    name: "Leadership & Influence",
    category: "social",
    demandTrend: "growing",
    description:
      "Inspiring teams, building trust, driving change, and making decisions that affect people. The most distinctly human skill in the AI era.",
    whyItMatters:
      "As AI handles more execution, the premium on human judgment, vision, and the ability to align people around a direction increases dramatically.",
    timeToLearn: "Years of practice",
    resources: [
      { name: "The Leadership Challenge", type: "book" },
      { name: "Harvard ManageMentor", type: "platform" },
    ],
    avgSalaryImpact: "+$40K–150K+",
    futureProofScore: 96,
  },
  {
    id: "emotional-intelligence",
    name: "Emotional Intelligence",
    category: "social",
    demandTrend: "growing",
    description:
      "Recognizing, understanding, and managing your own emotions and influencing those of others. Core to roles involving relationships, negotiation, care, and leadership.",
    whyItMatters:
      "AI lacks genuine empathy. Roles that require emotional attunement, conflict resolution, and deep human connection will see premiums increase as AI handles more transactional work.",
    timeToLearn: "Continuous practice",
    resources: [
      { name: "Emotional Intelligence 2.0", type: "book" },
      { name: "Yale Science of Well-Being (Coursera)", type: "course" },
    ],
    avgSalaryImpact: "Critical for leadership roles",
    futureProofScore: 97,
  },
  {
    id: "negotiation",
    name: "Negotiation & Persuasion",
    category: "social",
    demandTrend: "stable",
    description:
      "The ability to reach mutually beneficial agreements through structured communication. High-stakes negotiations — M&A deals, labor contracts, diplomatic discussions — require human judgment.",
    whyItMatters:
      "Consequential decisions require human accountability. When outcomes matter deeply to people, they want to negotiate with a human they can trust.",
    timeToLearn: "3–12 months",
    resources: [
      { name: "Never Split the Difference (Voss)", type: "book" },
      { name: "Northwestern Negotiation Certificate", type: "course" },
    ],
    avgSalaryImpact: "+$20K–60K",
    futureProofScore: 88,
  },

  // ─── Creative ────────────────────────────────────────────────────
  {
    id: "creative-direction",
    name: "Creative Direction",
    category: "creative",
    demandTrend: "growing",
    description:
      "Developing the creative vision, aesthetic standards, and conceptual frameworks that guide AI-generated content. Moving from executing to directing.",
    whyItMatters:
      "AI generates content at scale but needs human directors to define what 'great' looks like, maintain brand coherence, and make bold creative choices.",
    timeToLearn: "Years of experience",
    resources: [
      { name: "The Designful Company", type: "book" },
      { name: "School of Visual Arts", type: "platform" },
    ],
    avgSalaryImpact: "+$30K–80K",
    futureProofScore: 85,
  },
  {
    id: "ai-art-direction",
    name: "AI Art Direction",
    category: "creative",
    demandTrend: "surging",
    description:
      "Directing generative AI tools (Midjourney, DALL-E, Sora, Stable Diffusion) to produce specific visual outputs through precise prompting, iteration, and curation.",
    whyItMatters:
      "Companies that use AI for creative content need directors who can consistently produce on-brand, high-quality results from AI tools. This is a new, high-demand creative profession.",
    timeToLearn: "1–3 months",
    resources: [
      { name: "Midjourney Office Hours", type: "platform" },
      { name: "Runway ML Academy", type: "course" },
    ],
    avgSalaryImpact: "+$15K–45K",
    futureProofScore: 82,
  },
];

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
  return skills.filter((s) => s.category === category);
}

export function getSurgingSkills(): Skill[] {
  return skills.filter((s) => s.demandTrend === "surging");
}
