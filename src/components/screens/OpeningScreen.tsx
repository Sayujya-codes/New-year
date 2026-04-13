"use client";
import { useEffect, useState } from "react";
import CountdownTimer from "../CountdownTimer";
import { HER_NAME } from "@/lib/constants";

interface Props {
  onNext: () => void;
}

export default function OpeningScreen({ onNext }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 1600);
    const t3 = setTimeout(() => setStep(3), 2800);
    const t4 = setTimeout(() => setStep(4), 4200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  const show = (n: number): React.CSSProperties => ({
    opacity: step >= n ? 1 : 0,
    transform: step >= n ? "translateY(0)" : "translateY(14px)",
    transition: "opacity 1.4s ease, transform 1.4s ease",
  });

  return (
    <div className="screen">
      <div className="content">
        {/* Decorative top flourish */}
        <div
          style={{
            ...show(1),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div style={{ fontSize: "1.4rem", opacity: 0.5 }}>✦</div>
          {HER_NAME ? (
            <p className="name-tag">Dear, {HER_NAME}…</p>
          ) : (
            <p className="caption">for you</p>
          )}
        </div>

        <div style={show(2)}>
          <h1 className="display">
            Before 2083
            <br />
            Begins…
          </h1>
        </div>

        <div style={show(3)} className="glass-card">
          <p
            className="headline"
            style={{ fontStyle: "italic", color: "rgba(255,240,225,0.75)" }}
          >
            I wanted to say somethings, please!
          </p>
        </div>

        <div style={show(3)}>
          <CountdownTimer />
        </div>

        <div style={show(4)}>
          <button className="btn btn-large" onClick={onNext}>
            please give me one minute ·&nbsp;&nbsp;→
          </button>
        </div>
      </div>
    </div>
  );
}
