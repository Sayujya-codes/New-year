"use client";
import { useEffect, useState } from "react";

const TARGET = new Date("2083-01-01T00:00:00");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [key, setKey] = useState(0);

  useEffect(() => {
    function tick() {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) return;
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
      setKey((k) => k + 1);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    // { label: "days", val: t.d },
    { label: "hours", val: t.h },
    { label: "minutes", val: t.m },
    { label: "seconds", val: t.s },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <p className="caption" style={{ letterSpacing: "0.22em" }}>
        until 2083
      </p>
      <div className="countdown-wrap">
        {units.map(({ label, val }, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: i < 3 ? "1.5rem" : 0,
            }}
          >
            <div className="countdown-unit">
              <span className="countdown-num" key={`${label}-${val}`}>
                {pad(val)}
              </span>
              <span className="countdown-label">{label}</span>
            </div>
            {i < 3 && (
              <span className="countdown-sep" style={{ marginBottom: "8px" }}>
                ·
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
