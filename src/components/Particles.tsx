"use client";
import { useEffect, useRef } from "react";

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stars: HTMLDivElement[] = [];

    for (let i = 0; i < 80; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2.5 + 0.5;
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.6 + 0.1};
        animation: twinkle ${Math.random() * 4 + 2}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      container.appendChild(star);
      stars.push(star);
    }

    return () => {
      stars.forEach((s) => s.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          "radial-gradient(ellipse at center, #0e0e2e 0%, #050510 100%)",
      }}
    />
  );
}
