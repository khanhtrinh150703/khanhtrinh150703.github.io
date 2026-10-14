import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  theme: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates for interactive connection
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Determine particle colors based on theme
    const isLight = theme === 'light';
    const isCyber = theme === 'cyber';

    const colors = isLight
      ? ['rgba(99, 102, 241, 0.35)', 'rgba(14, 165, 233, 0.35)', 'rgba(168, 85, 247, 0.3)']
      : isCyber
      ? ['rgba(16, 185, 129, 0.45)', 'rgba(56, 189, 248, 0.45)', 'rgba(236, 72, 153, 0.4)']
      : ['rgba(99, 102, 241, 0.4)', 'rgba(56, 189, 248, 0.4)', 'rgba(168, 85, 247, 0.35)'];

    const lineColor = isLight
      ? 'rgba(99, 102, 241, 0.08)'
      : isCyber
      ? 'rgba(16, 185, 129, 0.12)'
      : 'rgba(99, 102, 241, 0.12)';

    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - dist / 130;
            ctx.stroke();
          }
        }

        // Connect with mouse cursor
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isLight ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.3)';
          ctx.lineWidth = 1.2 * (1 - mdist / mouse.radius);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Animated Blobs / Orbs */}
      <div
        className={`absolute top-[-10%] left-[-5%] w-[550px] h-[550px] rounded-full blur-[130px] opacity-40 animate-float-slow transition-colors duration-700 ${
          isLight
            ? 'bg-blue-300/40'
            : isCyber
            ? 'bg-emerald-500/25'
            : 'bg-indigo-600/25'
        }`}
      />
      <div
        className={`absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-40 animate-float-reverse transition-colors duration-700 ${
          isLight
            ? 'bg-indigo-200/50'
            : isCyber
            ? 'bg-fuchsia-600/20'
            : 'bg-purple-600/20'
        }`}
      />
      <div
        className={`absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-35 animate-float-fast transition-colors duration-700 ${
          isLight
            ? 'bg-teal-200/50'
            : isCyber
            ? 'bg-cyan-500/25'
            : 'bg-blue-500/20'
        }`}
      />

      {/* Interactive Particle Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default AnimatedBackground;
