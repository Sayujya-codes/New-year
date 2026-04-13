"use client";
import { useState, useEffect } from "react";

const steps = [{ text: "I'm still hurt.", sub: "take your time" }];

interface Props {
  onNext: () => void;
}

export default function InteractiveScreen({ onNext }: Props) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  function handleClick() {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
      setTimeout(onNext, 1400);
    }
  }

  return (
    <div className="screen">
      <div className="content">
        <p
          className="caption"
          style={{
            opacity: mounted ? 0.55 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          ✦ &nbsp; a moment between us &nbsp; ✦
        </p>

        <div
          className="glass-card"
          style={{
            width: "100%",
            opacity: mounted ? 1 : 0,
            transition: "opacity 1.4s ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(255,235,215,0.7)",
              lineHeight: 1.85,
            }}
          >
            One small step of trust in me, dear
            <br />
            <span style={{ color: "rgba(232,160,160,0.85)" }}>
              one giant leap for our love.
            </span>
          </p>
        </div>

        {/* Button */}
        <div
          style={{
            opacity: mounted && !done ? 1 : 0,
            transition: "opacity 0.8s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button className="btn-step" onClick={handleClick} key={step}>
            {steps[step].text}
          </button>
          <span
            className="caption"
            style={{
              opacity: 0.4,
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
            }}
          >
            {steps[step].sub}
          </span>
        </div>

        {/* Progress dots */}
        <div
          className="dots"
          style={{ opacity: mounted ? 0.9 : 0, transition: "opacity 1s ease" }}
        >
          {steps.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === step ? "active" : i < step ? "done" : ""}`}
            />
          ))}
        </div>

        {/* Step counter */}
        <p
          className="caption"
          style={{
            opacity: mounted ? 0.3 : 0,
            fontSize: "0.6rem",
            transition: "opacity 1s ease",
          }}
        >
          {step + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
