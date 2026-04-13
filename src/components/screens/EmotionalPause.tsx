"use client";
import { useState, useEffect } from "react";

interface Props {
  onNext: () => void;
}

export default function EmotionalPause({ onNext }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 2400);
    const t3 = setTimeout(() => setStep(3), 4400);
    const t4 = setTimeout(() => setStep(4), 6000);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  const s = (n: number): React.CSSProperties => ({
    opacity: step >= n ? 1 : 0,
    transform: step >= n ? "translateY(0)" : "translateY(10px)",
    transition: "opacity 1.5s ease, transform 1.5s ease",
  });

  return (
    <div className="screen">
      <div className="content">
        {/* Slow rotating soft circle */}
        <div
          style={{
            ...s(1),
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            border: "1px solid rgba(232,160,160,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            animation: "glowPulse 4s ease-in-out infinite",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232,160,160,0.15) 0%, transparent 70%)",
              border: "1px solid rgba(232,160,160,0.15)",
            }}
          />
          <span
            style={{
              position: "absolute",
              fontSize: "0.9rem",
              color: "rgba(232,160,160,0.6)",
            }}
          >
            ♡
          </span>
        </div>

        <p
          style={{
            ...s(2),
            ...{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(255,240,225,0.85)",
              lineHeight: 1.8,
            },
          }}
        >
          I've been thinking about it dear,&nbsp;
          <br />a lot.
        </p>

        <div className="divider" style={s(2)}>
          <div className="divider-icon">✦</div>
        </div>

        <p
          style={{
            ...s(3),
            ...{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              fontWeight: 300,
              color: "rgba(255,220,195,0.7)",
              lineHeight: 1.85,
            },
          }}
        >
          Not just what happened…{" "}
          <span style={{ color: "rgba(232,160,160,0.8)", fontStyle: "italic" }}>
            but how it made you feel, and how much of headache i was.
          </span>
        </p>

        <div style={s(4)}>
          <button className="btn" onClick={onNext}>
            continue →
          </button>
        </div>
      </div>
    </div>
  );
}
