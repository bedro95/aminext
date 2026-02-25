export interface Industry {
  id: string;
  name: string;
  slug: string;
  icon: string;
  automationScore: number;
  workersAffected: number;
  totalWorkers: number;
  trend: "rising" | "stable" | "falling";
  description: string;
  keyDrivers: string[];
  color: string;
}

export const industries: Industry[] = [
  {
    id: "finance",
    name: "Finance & Banking",
    slug: "finance",
    icon: "💳",
    automationScore: 85,
    workersAffected: 6_400_000,
    totalWorkers: 8_000_000,
    trend: "rising",
    description:
      "Finance was among the first industries disrupted by AI. Algorithmic trading, automated underwriting, AI fraud detection, and robo-advisors have already transformed the sector.",
    keyDrivers: ["LLM financial analysis", "Algorithmic trading", "Automated underwriting", "AI fraud detection"],
    color: "#EF4444",
  },
  {
    id: "retail",
    name: "Retail",
    slug: "retail",
    icon: "🛒",
    automationScore: 82,
    workersAffected: 12_000_000,
    totalWorkers: 15_500_000,
    trend: "rising",
    description:
      "Cashierless stores, AI inventory management, demand forecasting, and robotic warehouses are reshaping retail at scale. Amazon's robotics division alone has displaced hundreds of thousands of warehouse roles.",
    keyDrivers: ["Cashierless checkout", "Robotic warehouses", "AI demand forecasting", "Personalization engines"],
    color: "#F59E0B",
  },
  {
    id: "transportation",
    name: "Transportation & Logistics",
    slug: "transportation",
    icon: "🚚",
    automationScore: 78,
    workersAffected: 5_200_000,
    totalWorkers: 7_000_000,
    trend: "rising",
    description:
      "Autonomous vehicles, AI route optimization, and drone delivery threaten transportation's largest workforce segments. Long-haul trucking is projected to see the most dramatic displacement.",
    keyDrivers: ["Autonomous trucking", "Drone delivery", "AI route optimization", "Port automation"],
    color: "#F59E0B",
  },
  {
    id: "administrative",
    name: "Administrative",
    slug: "administrative",
    icon: "📋",
    automationScore: 90,
    workersAffected: 18_000_000,
    totalWorkers: 20_000_000,
    trend: "rising",
    description:
      "Administrative and clerical work is among the highest-risk categories. AI handles scheduling, document processing, email management, data entry, and basic coordination at superhuman speed.",
    keyDrivers: ["RPA bots", "LLM document processing", "AI scheduling", "Intelligent document recognition"],
    color: "#EF4444",
  },
  {
    id: "legal",
    name: "Legal",
    slug: "legal",
    icon: "⚖️",
    automationScore: 72,
    workersAffected: 1_100_000,
    totalWorkers: 1_500_000,
    trend: "rising",
    description:
      "AI legal research, contract analysis, and document review are compressing the time lawyers need for routine work. Tools like Harvey AI, Casetext, and Westlaw AI are widely adopted by top firms.",
    keyDrivers: ["LLM legal research", "Contract AI", "E-discovery automation", "Predictive litigation analytics"],
    color: "#F59E0B",
  },
  {
    id: "media",
    name: "Media & Publishing",
    slug: "media",
    icon: "📰",
    automationScore: 69,
    workersAffected: 850_000,
    totalWorkers: 1_300_000,
    trend: "rising",
    description:
      "AI generates articles, creates images, edits video, and composes music. Major publishers use AI for routine content at scale, fundamentally changing what human journalists and creators do.",
    keyDrivers: ["LLM content generation", "AI image/video creation", "Automated reporting", "AI music composition"],
    color: "#F59E0B",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    slug: "healthcare",
    icon: "🏥",
    automationScore: 42,
    workersAffected: 6_500_000,
    totalWorkers: 18_000_000,
    trend: "stable",
    description:
      "Healthcare faces a dual reality: AI excels at diagnostics, imaging, and administrative tasks while the hands-on, empathetic core of care remains stubbornly human. The net effect is augmentation more than replacement.",
    keyDrivers: ["AI medical imaging", "Predictive diagnostics", "Administrative automation", "Drug discovery AI"],
    color: "#EAB308",
  },
  {
    id: "education",
    name: "Education",
    slug: "education",
    icon: "🎓",
    automationScore: 38,
    workersAffected: 2_400_000,
    totalWorkers: 7_000_000,
    trend: "stable",
    description:
      "AI tutoring and personalized learning are supplementing rather than replacing teachers. The social-emotional dimension of education—mentorship, motivation, and community—anchors human relevance.",
    keyDrivers: ["AI tutoring systems", "Automated grading", "Personalized learning", "Administrative AI"],
    color: "#10B981",
  },
  {
    id: "technology",
    name: "Technology",
    slug: "technology",
    icon: "💻",
    automationScore: 48,
    workersAffected: 2_100_000,
    totalWorkers: 5_000_000,
    trend: "rising",
    description:
      "AI coding tools are accelerating software development while simultaneously automating routine development tasks. The tech industry is the primary producer and consumer of automation simultaneously.",
    keyDrivers: ["AI code generation", "Automated testing", "AI system design tools", "No-code platforms"],
    color: "#EAB308",
  },
  {
    id: "skilled-trades",
    name: "Skilled Trades",
    slug: "skilled-trades",
    icon: "🔧",
    automationScore: 22,
    workersAffected: 800_000,
    totalWorkers: 4_500_000,
    trend: "stable",
    description:
      "Electricians, plumbers, HVAC technicians, and carpenters operate in unpredictable physical environments that robots still cannot navigate reliably. Skilled trades represent some of the safest careers in the AGI era.",
    keyDrivers: ["Robotic assistants (limited)", "AI scheduling tools", "Smart building systems"],
    color: "#10B981",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getTopAtRiskIndustries(limit = 5): Industry[] {
  return [...industries].sort((a, b) => b.automationScore - a.automationScore).slice(0, limit);
}
