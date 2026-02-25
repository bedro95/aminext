import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Users, Clock, CheckCircle, XCircle, BookOpen } from "lucide-react";
import { getProfessionBySlug, professions } from "@/data/professions";
import { AutomationGauge } from "@/components/charts/AutomationGauge";
import { TrendLine } from "@/components/charts/TrendLine";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getRiskLevel, getRiskLabel, getRiskGradient, getRiskIconBg, formatNumber } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return professions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const profession = getProfessionBySlug(slug);
  if (!profession) return { title: "Not Found" };
  return {
    title: `${profession.title} ${profession.icon} — Automation Risk ${profession.automationScore}%`,
    description: profession.description,
  };
}

export default async function ProfessionDetailPage({ params }: Props) {
  const { slug } = await params;
  const profession = getProfessionBySlug(slug);

  if (!profession) notFound();

  const riskLevel = getRiskLevel(profession.automationScore);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Back */}
      <Link
        href="/professions"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        All Professions
      </Link>

      {/* Hero */}
      <div className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] mb-8">
        {/* Gradient stripe */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${getRiskGradient(profession.automationScore)}`} />

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Icon + meta */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 ${getRiskIconBg(profession.automationScore)} flex-shrink-0`}>
                  {profession.icon}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={riskLevel}>{getRiskLabel(profession.automationScore)}</Badge>
                  <span className="text-xs text-[var(--muted-foreground)] bg-[var(--accent)] px-2 py-0.5 rounded-md">
                    {profession.industry}
                  </span>
                  {profession.trend === "rising" && (
                    <div className="inline-flex items-center gap-1 text-xs text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-md font-medium">
                      <TrendingUp size={11} />
                      Accelerating
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] mb-3">
                {profession.title}
              </h1>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-6 text-sm sm:text-base">
                {profession.description}
              </p>

              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                    <Users size={13} className="text-[var(--muted-foreground)]" />
                  </div>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    <strong className="text-[var(--foreground)]">{formatNumber(profession.currentWorkers)}</strong> current workers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                    <Clock size={13} className="text-[var(--muted-foreground)]" />
                  </div>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    Major disruption: <strong className="text-[var(--foreground)]">{profession.timeline}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Gauge */}
            <div className="flex justify-center lg:justify-end">
              <AutomationGauge score={profession.automationScore} />
            </div>
          </div>
        </div>
      </div>

      {/* Trend chart */}
      <Card className="mb-6">
        <h2 className="text-base font-semibold text-[var(--foreground)] mb-1">Automation Risk Trajectory</h2>
        <p className="text-xs text-[var(--muted-foreground)] mb-4">
          Historical progression and projected automation risk through 2030
        </p>
        <TrendLine currentScore={profession.automationScore} title={profession.title} />
      </Card>

      {/* What AI replaces vs what humans keep */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-500/15 flex items-center justify-center flex-shrink-0">
              <XCircle size={16} className="text-red-500" />
            </div>
            <h2 className="text-sm font-bold text-[var(--foreground)]">What AI Is Replacing</h2>
          </div>
          <ul className="space-y-2.5">
            {profession.whatAIReplaces.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                <span className="text-sm text-[var(--muted-foreground)]">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={16} className="text-emerald-500" />
            </div>
            <h2 className="text-sm font-bold text-[var(--foreground)]">What Humans Still Own</h2>
          </div>
          <ul className="space-y-2.5">
            {profession.whatHumansKeep.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span className="text-sm text-[var(--muted-foreground)]">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Skills to learn */}
      <Card className="mb-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-500/15 flex items-center justify-center">
            <BookOpen size={16} className="text-sky-500" />
          </div>
          <h2 className="text-sm font-bold text-[var(--foreground)]">Top Skills to Develop Now</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {profession.topSkillsToLearn.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 text-xs font-semibold border border-sky-100 dark:border-sky-500/20"
            >
              <span className="w-1 h-1 rounded-full bg-sky-400" />
              {skill}
            </span>
          ))}
        </div>
      </Card>

      {/* Sources */}
      <p className="text-xs text-[var(--muted-foreground)] mb-8">
        <strong>Sources:</strong> {profession.sources.join(" · ")}
      </p>

      {/* Related roles */}
      <div className="pt-6 border-t border-[var(--border)]">
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">Related Professions</h2>
        <div className="flex flex-wrap gap-2">
          {profession.relatedRoles.map((role) => {
            const found = professions.find((p) => p.title === role);
            return found ? (
              <Link
                key={role}
                href={`/profession/${found.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-sky-300 dark:hover:border-sky-600 hover:bg-[var(--accent)] transition-all"
              >
                {found.icon} {role}
              </Link>
            ) : (
              <span
                key={role}
                className="inline-flex items-center px-3 py-1.5 rounded-xl border border-[var(--border)] text-xs font-medium text-[var(--muted-foreground)]"
              >
                {role}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
