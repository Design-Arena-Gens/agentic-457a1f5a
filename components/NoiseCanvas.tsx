"use client";

import { useEffect, useRef } from "react";

export function NoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame: number;
    const particles = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.001 + Math.random() * 0.002,
      speedX: -0.0002 + Math.random() * 0.0004,
      speedY: -0.0002 + Math.random() * 0.0004,
      hue: 180 + Math.random() * 60
    }));

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
    };

    const render = () => {
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > 1) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > 1) particle.speedY *= -1;

        const px = particle.x * width;
        const py = particle.y * height;
        const radius = particle.radius * Math.min(width, height);

        const gradient = context.createRadialGradient(px, py, 0, px, py, radius * 6);
        gradient.addColorStop(0, `hsla(${particle.hue}, 85%, 68%, 0.25)`);
        gradient.addColorStop(1, "hsla(220, 65%, 8%, 0)");

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(px, py, radius * 6, 0, Math.PI * 2);
        context.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10 opacity-80" />;
}
