"use client";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "heart" | "petal" | "sparkle";
  rot: number;
  rotSpeed: number;
  life: number;
  maxLife: number;
};

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  /* ── Star field ── */
  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    const stars: HTMLDivElement[] = [];
    for (let i = 0; i < 90; i++) {
      const s = document.createElement("div");
      s.className = "star-dot";
      const sz = Math.random() * 1.8 + 0.4;
      s.style.cssText = `
        width:${sz}px; height:${sz}px;
        top:${Math.random() * 100}%;
        left:${Math.random() * 100}%;
        opacity:${Math.random() * 0.5 + 0.05};
        animation: twinkle ${Math.random() * 5 + 3}s ease-in-out infinite;
        animation-delay: ${Math.random() * 6}s;
      `;
      container.appendChild(s);
      stars.push(s);
    }
    return () => stars.forEach((s) => s.remove());
  }, []);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawn() {
      const types: Particle["type"][] = ["heart", "heart", "petal", "sparkle"];
      const type = types[Math.floor(Math.random() * types.length)];
      particles.push({
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 0.7 + 0.35),
        size:
          type === "sparkle"
            ? Math.random() * 3 + 1.5
            : type === "petal"
              ? Math.random() * 7 + 5
              : Math.random() * 9 + 6,
        opacity: Math.random() * 0.45 + 0.15,
        type,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        life: 0,
        maxLife: Math.random() * 280 + 200,
      });
    }

    function drawHeart(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
    ) {
      ctx.save();
      ctx.translate(x, y);
      const s = size * 0.055;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.35);
      ctx.bezierCurveTo(
        size * 0.55,
        -size * 0.9,
        size * 1.1,
        size * 0.1,
        0,
        size * 0.75,
      );
      ctx.bezierCurveTo(
        -size * 1.1,
        size * 0.1,
        -size * 0.55,
        -size * 0.9,
        0,
        -size * 0.35,
      );
      ctx.fill();
      ctx.restore();
      void s;
    }

    function drawPetal(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.38, size * 0.75, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawSparkle(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
    ) {
      ctx.save();
      ctx.translate(x, y);
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.moveTo(0, -size * 2.2);
        ctx.lineTo(0, size * 2.2);
        ctx.strokeStyle = ctx.fillStyle as string;
        ctx.lineWidth = size * 0.35;
        ctx.stroke();
      }
      ctx.restore();
    }

    let frameCount = 0;
    function loop() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;
      if (frameCount % 55 === 0) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(p.life * 0.018) * 0.35;
        p.y += p.vy;
        p.rot += p.rotSpeed;
        p.life++;

        const progress = p.life / p.maxLife;
        const fade =
          progress < 0.08
            ? progress / 0.08
            : progress > 0.85
              ? 1 - (progress - 0.85) / 0.15
              : 1;
        const alpha = p.opacity * fade;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.rotate(p.rot);

        if (p.type === "heart") {
          ctx.fillStyle = `rgba(220, 140, 140, ${alpha})`;
          drawHeart(ctx, p.x, p.y, p.size);
        } else if (p.type === "petal") {
          ctx.fillStyle = `rgba(240, 180, 180, ${alpha * 0.7})`;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          drawPetal(ctx, 0, 0, p.size);
          ctx.restore();
        } else {
          ctx.fillStyle = `rgba(255, 230, 210, ${alpha})`;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          drawSparkle(ctx, 0, 0, p.size);
          ctx.restore();
        }

        ctx.restore();
        if (p.life >= p.maxLife || p.y < -30) particles.splice(i, 1);
      }

      raf = requestAnimationFrame(loop);
    }

    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 20%, #1a0a18 0%, #0c0810 50%, #08060f 100%)",
          zIndex: 0,
        }}
      />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="star-field" ref={starsRef} />
      <div className="vignette" />
      <canvas id="particle-canvas" ref={canvasRef} />
    </>
  );
}
