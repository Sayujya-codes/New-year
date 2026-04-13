"use client";
import { useState, useEffect } from "react";
import { NEW_YEAR } from "@/lib/constants";

export default function ClosingScreen() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 1400);
    const t4 = setTimeout(() => setPhase(4), 2000);
    const t5 = setTimeout(() => setPhase(5), 2600);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  const s = (n: number): React.CSSProperties => ({
    opacity: phase >= n ? 1 : 0,
    transform: phase >= n ? "translateY(0)" : "translateY(12px)",
    transition: "opacity 1.8s ease, transform 1.8s ease",
  });

  return (
    <div className="screen">
      <div className="content">
        {/* Subtle flourish */}
        <div
          style={{
            ...s(1),
            display: "flex",
            gap: "16px",
            alignItems: "center",
            color: "rgba(232,160,160,0.3)",
            fontSize: "0.7rem",
          }}
        >
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>

        <p
          style={{
            ...s(2),
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1rem, 3vw, 1.2rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(255,230,210,0.6)",
            lineHeight: 1.9,
          }}
        >
          {/* No pressure… no expectations. */}
        </p>

        <p
          style={{
            ...s(3),
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.05rem, 3.2vw, 1.3rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(255,235,215,0.75)",
            lineHeight: 1.85,
          }}
        >
          {/* Just… I still care about you. */}
        </p>

        <div className="divider" style={s(3)}>
          <div className="divider-icon">✦</div>
        </div>

        {/* The big moment */}
        <div
          style={{
            ...s(4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <p
            className="shimmer-text"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 7vw, 3.8rem)",
              lineHeight: 1.15,
            }}
          >
            Happy New Year {NEW_YEAR}
          </p>
          <span className="heart-final">❤️</span>
        </div>

        {/* Closing signature */}
        <div
          style={{
            ...s(5),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            marginTop: "0.5rem",
          }}
        >
          <div className="divider">
            <div className="divider-icon">✦</div>
          </div>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.88rem",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(232,160,160,0.4)",
              letterSpacing: "0.06em",
            }}
          >
            Your own Sayujya
          </p>
        </div>
      </div>
    </div>
  );
}
