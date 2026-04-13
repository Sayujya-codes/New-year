"use client";
import { useState, useEffect } from "react";

const lines = [
  { text: "I know that, I have hurt you.", italic: false },
  { text: "And I hate that I'm the reason, you felt that way,", italic: true },
  { text: "We are in this situation.", italic: false },
  { text: "Things turned so complicated,", italic: false },
  { text: "when we were seeing Ray of Hope", italic: false, muted: true },
];

interface Props {
  onNext: () => void;
}

export default function RealizationScreen({ onNext }: Props) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const delays = [500, 2000, 3200, 4800, 5800];
    const timers = delays.map((d, i) => setTimeout(() => setVisible(i + 1), d));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="screen">
      <div className="content">
        <p
          className="caption"
          style={{
            opacity: visible >= 1 ? 0.6 : 0,
            transition: "opacity 1s ease",
          }}
        >
          ✦ &nbsp; a confession &nbsp; ✦
        </p>

        <div className="glass-card" style={{ width: "100%" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            {lines.map((line, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.15rem, 3.5vw, 1.45rem)",
                  fontStyle: line.italic ? "italic" : "normal",
                  fontWeight: 300,
                  color: line.muted
                    ? "rgba(232,160,160,0.55)"
                    : i === 0
                      ? "rgba(255, 240, 225, 0.95)"
                      : "rgba(255,238,218,0.78)",
                  lineHeight: 1.75,
                  opacity: visible > i ? 1 : 0,
                  transform: visible > i ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 1.3s ease, transform 1.3s ease",
                }}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>

        <div
          style={{
            opacity: visible >= lines.length ? 1 : 0,
            transition: "opacity 1.6s ease",
          }}
        >
          <button className="btn" onClick={onNext}>
            please keep going… →
          </button>
        </div>
      </div>
    </div>
  );
}
