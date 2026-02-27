import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Am I Next? — Will AI Replace You?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0f1e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blobs */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            padding: "0 80px",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              borderRadius: 100,
              border: "1px solid rgba(56,189,248,0.3)",
              background: "rgba(56,189,248,0.08)",
              marginBottom: 32,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#38bdf8", display: "flex" }} />
            <span style={{ color: "#38bdf8", fontSize: 14, fontWeight: 700, letterSpacing: "0.12em" }}>
              LIVE TRACKING · AGI ERA 2026
            </span>
          </div>

          {/* Brand name */}
          <h1
            style={{
              color: "#f8fafc",
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1,
              margin: "0 0 16px",
              letterSpacing: "-3px",
            }}
          >
            Am I{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Next?
            </span>
          </h1>

          {/* Tagline */}
          <p style={{ color: "#94a3b8", fontSize: 28, margin: "0 0 52px", fontWeight: 500 }}>
            Will AI Replace You? — Track your automation risk.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { value: "47%", label: "Oxford Study: Jobs at Risk" },
              { value: "375M", label: "Workers Affected" },
              { value: "27+", label: "Professions Tracked" },
              { value: "2030", label: "Disruption Horizon" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  padding: "20px 28px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.04)",
                  minWidth: 180,
                }}
              >
                <span style={{ color: "#38bdf8", fontSize: 40, fontWeight: 900, lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span style={{ color: "#64748b", fontSize: 13, fontWeight: 500, textAlign: "center" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)",
            display: "flex",
          }}
        />

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 22,
            right: 52,
            color: "#334155",
            fontSize: 15,
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
