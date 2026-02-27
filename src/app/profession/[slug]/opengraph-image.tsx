import { ImageResponse } from "next/og";
import { getProfessionBySlug } from "@/data/professions";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function getRiskColor(score: number) {
  if (score >= 80) return "#ef4444";
  if (score >= 60) return "#f97316";
  if (score >= 40) return "#eab308";
  return "#10b981";
}

function getRiskLabel(score: number) {
  if (score >= 80) return "CRITICAL RISK";
  if (score >= 60) return "HIGH RISK";
  if (score >= 40) return "MEDIUM RISK";
  return "LOW RISK";
}

function formatWorkers(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  return `${Math.round(n / 1_000)}K`;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profession = getProfessionBySlug(slug);

  if (!profession) return new Response("Not found", { status: 404 });

  const riskColor = getRiskColor(profession.automationScore);
  const riskLabel = getRiskLabel(profession.automationScore);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0f1e",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "56px 64px",
          gap: 48,
          alignItems: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blob based on risk color */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-10%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${riskColor}22 0%, transparent 65%)`,
            display: "flex",
          }}
        />

        {/* Left side — profession info */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 20, zIndex: 1 }}>
          {/* Brand + industry */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#38bdf8", fontSize: 15, fontWeight: 800, letterSpacing: "0.08em" }}>
              AM I NEXT?
            </span>
            <span style={{ color: "#1e293b", fontSize: 15 }}>·</span>
            <span style={{ color: "#475569", fontSize: 15, fontWeight: 500 }}>{profession.industry}</span>
          </div>

          {/* Icon + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                fontSize: 64,
                width: 100,
                height: 100,
                borderRadius: 22,
                background: "#111827",
                border: `2px solid ${riskColor}35`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {profession.icon}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    padding: "5px 14px",
                    borderRadius: 8,
                    background: `${riskColor}20`,
                    color: riskColor,
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                  }}
                >
                  {riskLabel}
                </div>
              </div>
              <h1
                style={{
                  color: "#f8fafc",
                  fontSize: 52,
                  fontWeight: 900,
                  margin: 0,
                  letterSpacing: "-1.5px",
                  lineHeight: 1.05,
                }}
              >
                {profession.title}
              </h1>
            </div>
          </div>

          {/* Description */}
          <p style={{ color: "#94a3b8", fontSize: 19, margin: 0, lineHeight: 1.5, maxWidth: 560 }}>
            {profession.description.length > 110
              ? profession.description.slice(0, 110) + "..."
              : profession.description}
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                padding: "12px 20px",
                borderRadius: 12,
                background: "#111827",
                border: "1px solid #1e293b",
              }}
            >
              <span style={{ color: "#475569", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>
                DISRUPTION
              </span>
              <span style={{ color: "#f8fafc", fontSize: 18, fontWeight: 800 }}>{profession.timeline}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                padding: "12px 20px",
                borderRadius: 12,
                background: "#111827",
                border: "1px solid #1e293b",
              }}
            >
              <span style={{ color: "#475569", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>
                WORKERS AT RISK
              </span>
              <span style={{ color: "#f8fafc", fontSize: 18, fontWeight: 800 }}>
                {formatWorkers(profession.currentWorkers)}
              </span>
            </div>
          </div>
        </div>

        {/* Right side — big score */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            width: 220,
            height: 220,
            borderRadius: 28,
            border: `2px solid ${riskColor}35`,
            background: `${riskColor}0d`,
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          <span style={{ color: "#475569", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em" }}>
            AUTOMATION
          </span>
          <span
            style={{
              color: riskColor,
              fontSize: 94,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-4px",
            }}
          >
            {profession.automationScore}
          </span>
          <span style={{ color: riskColor, fontSize: 26, fontWeight: 800, marginTop: -8 }}>%</span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${riskColor}, #818cf8)`,
            display: "flex",
          }}
        />

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 48,
            color: "#1e293b",
            fontSize: 14,
            fontWeight: 700,
            display: "flex",
          }}
        >
          aminext.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
