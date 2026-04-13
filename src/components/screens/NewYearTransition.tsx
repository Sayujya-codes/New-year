"use client";
import { useState, useEffect } from "react";
import { NEW_YEAR } from "@/lib/constants";

interface Props {
  onNext: () => void;
}

export default function NewYearTransition({ onNext }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 2000);
    const t3 = setTimeout(() => setStep(3), 3800);
    const t4 = setTimeout(() => setStep(4), 5500);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  const s = (n: number): React.CSSProperties => ({
    opacity: step >= n ? 1 : 0,
    transform: step >= n ? "translateY(0)" : "translateY(12px)",
    transition: "opacity 1.4s ease, transform 1.4s ease",
  });

  return (
    <div
      className="screen"
      style={{
        background:
          step >= 2
            ? "radial-gradient(ellipse at 50% 60%, rgba(180,90,50,0.06) 0%, transparent 60%)"
            : undefined,
        transition: "background 2s ease",
      }}
    >
      <div className="content">
        <p
          className="caption"
          style={{ ...s(1), opacity: step >= 1 ? 0.55 : 0 }}
        >
          ✦ &nbsp; the turning &nbsp; ✦
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.4rem",
            width: "100%",
          }}
        >
          <p
            style={{
              ...s(2),
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 6vw, 3rem)",
              color: "rgba(255,230,200,0.7)",
              lineHeight: 1.2,
            }}
          >
            {NEW_YEAR - 1} is ending…, dear
          </p>

          <div className="glass-card" style={{ ...s(3) }}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(255,240,225,0.85)",
                lineHeight: 1.85,
              }}
            >
              And I don't want <em>us</em> to end with it.
              <br />
              <br />
              <span
                style={{ color: "rgba(232,160,160,0.8)", fontStyle: "normal" }}
              >
                I don't want to carry this distance
                <br />
                into {NEW_YEAR}.
              </span>
            </p>
          </div>
        </div>

        <div style={s(4)}>
          <button className="btn" onClick={onNext}>
            keep reading →
          </button>
        </div>
      </div>
    </div>
  );
}
