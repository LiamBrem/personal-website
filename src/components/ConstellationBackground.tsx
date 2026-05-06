import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const INITIAL_COUNT = 35;
const MAX_PARTICLES = 130;
const CONNECTION_DIST = 180;
const REPULSION_RADIUS = 110;
const SPAWN_ON_CLICK = 6;

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const makeParticle = (x?: number, y?: number): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 0.5;
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 1.5,
      };
    };

    particlesRef.current = Array.from({ length: INITIAL_COUNT }, () => makeParticle());

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onClick = (e: MouseEvent) => {
      const ps = particlesRef.current;
      for (let i = 0; i < SPAWN_ON_CLICK && ps.length < MAX_PARTICLES; i++) {
        ps.push(makeParticle(
          e.clientX + (Math.random() - 0.5) * 60,
          e.clientY + (Math.random() - 0.5) * 60,
        ));
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particlesRef.current;
      const { x: mx, y: my } = mouseRef.current;

      for (const p of ps) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSION_RADIUS && dist > 1) {
          // Override velocity: flee directly away, faster the closer they are
          const escapeSpeed = ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) * 5;
          p.vx = (dx / dist) * escapeSpeed;
          p.vy = (dy / dist) * escapeSpeed;
        } else {
          // Gentle organic drift — tiny random nudge each frame
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;

          // Maintain near-constant natural speed
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          const target = p.radius * 0.15;
          if (speed > 0) {
            p.vx = (p.vx / speed) * target;
            p.vy = (p.vy / speed) * target;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        else if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        else if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(160, 160, 160, 0.5)';
        ctx.fill();
      }

      // Connections
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(160, 160, 160, ${(1 - d / CONNECTION_DIST) * 0.78})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
