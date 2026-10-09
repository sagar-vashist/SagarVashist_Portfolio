import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sagar Vashist — Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#060708",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient Gradient Glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(92,242,196,0.18) 0%, rgba(124,140,255,0.08) 50%, transparent 70%)",
          }}
        />

        {/* Top Header Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#5CF2C4",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "#5CF2C4",
              textTransform: "uppercase",
            }}
          >
            PORTFOLIO // 2026–2027
          </span>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              fontSize: "76px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#F4F5F7",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Sagar Vashist
          </h1>
          <p
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "#9AA1AB",
              lineHeight: 1.4,
              maxWidth: "900px",
              margin: 0,
            }}
          >
            Full-Stack Developer • Next.js, React, Node.js, TypeScript & PostgreSQL
          </p>
        </div>

        {/* Bottom Metadata */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "32px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              color: "#646B77",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            DELHI, INDIA • B.TECH &apos;27
          </span>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#5CF2C4",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            SAGARVASHIST.VERCEL.APP
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
