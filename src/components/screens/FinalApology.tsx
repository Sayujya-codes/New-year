"use client";
import { useState, useEffect } from "react";

const lines = [
  { text: "I'm really sorry, dear", size: "big", color: "rose" },
  { text: "Not just for what I did…", size: "med", color: "cream" },
  {
    text: "but for most importantly, how it made you feel.",
    size: "med",
    color: "cream",
  },
  { text: "I can't undo it… dear", size: "small", color: "muted" },
  {
    text: "but I will be better — for you, for us, for our future",
    size: "med",
    color: "cream",
  },
  {
    text: "If you give me chance dear,",
    size: "med",
    color: "soft",
  },
  {
    text: "I will learn from my mistakes, and I won't take it for granted, dear!",
    size: "med",
    color: "rose",
  },
];

interface Props {
  onNext: () => void;
}

export default function FinalApology({ onNext }: Props) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const delays = [400, 1900, 3000, 4400, 5400, 7000, 8600];
    const timers = delays.map((d, i) => setTimeout(() => setVisible(i + 1), d));
    return () => timers.forEach(clearTimeout);
  }, []);

  const colorMap: Record<string, string> = {
    rose: "rgba(232,160,160,0.95)",
    cream: "rgba(255,240,225,0.88)",
    muted: "rgba(255,220,195,0.55)",
    soft: "rgba(255,230,210,0.75)",
  };

  const sizeMap: Record<string, string> = {
    big: "clamp(1.5rem, 5vw, 2rem)",
    med: "clamp(1.05rem, 3.2vw, 1.3rem)",
    small: "clamp(0.95rem, 2.8vw, 1.1rem)",
  };

  return (
    <div className="screen">
      <div className="content">
        <p
          className="caption"
          style={{
            opacity: visible >= 1 ? 0.55 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          ✦ &nbsp; from the bottom of my heart &nbsp; ✦
        </p>

        <div
          className="glass-card"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
          }}
        >
          {lines.map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: sizeMap[line.size],
                fontStyle: i === 0 || i === 6 ? "normal" : "italic",
                fontWeight: i === 0 ? 400 : 300,
                color: colorMap[line.color],
                lineHeight: 1.75,
                opacity: visible > i ? 1 : 0,
                transform: visible > i ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 1.3s ease, transform 1.3s ease",
                borderTop:
                  i === 4 ? "1px solid rgba(232,160,160,0.1)" : undefined,
                paddingTop: i === 4 ? "1rem" : undefined,
              }}
            >
              {line.text}
            </p>
          ))}
        </div>

        <div
          style={{
            opacity: visible >= lines.length ? 1 : 0,
            transition: "opacity 1.8s ease",
          }}
        >
          <button className="btn" onClick={onNext}>
            one last thing… →
          </button>
        </div>
      </div>
    </div>
  );
}
