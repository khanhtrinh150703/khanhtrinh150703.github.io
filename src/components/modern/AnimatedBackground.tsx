import React, { useEffect, useRef } from 'react';
import { WeatherTheme } from './ThemeSwitcher';

interface AnimatedBackgroundProps {
  theme: WeatherTheme;
}

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  alphaChange: number;
}

interface CloudPuff {
  offsetX: number;
  offsetY: number;
  radius: number;
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
  scale: number;
  opacity: number;
  puffs: CloudPuff[];
}

interface SunParticle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
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

    // RAIN ENGINE
    const raindrops: Raindrop[] = [];
    const ripples: Ripple[] = [];
    const rainCount = Math.min(Math.floor(width / 7), 160);

    for (let i = 0; i < rainCount; i++) {
      raindrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 12 + Math.random() * 18,
        speed: 12 + Math.random() * 16,
        opacity: 0.3 + Math.random() * 0.45,
      });
    }

    // CLOUDS ENGINE
    const createCloud = (startX?: number): Cloud => {
      const scale = 0.6 + Math.random() * 0.8;
      const puffCount = 5 + Math.floor(Math.random() * 4);
      const puffs: CloudPuff[] = [];

      for (let i = 0; i < puffCount; i++) {
        puffs.push({
          offsetX: (i - puffCount / 2) * (34 * scale) + (Math.random() - 0.5) * 15,
          offsetY: (Math.random() - 0.5) * (18 * scale),
          radius: (35 + Math.random() * 25) * scale,
        });
      }

      return {
        x: startX !== undefined ? startX : Math.random() * (width + 300) - 150,
        y: 30 + Math.random() * (height * 0.65),
        speed: 0.2 + Math.random() * 0.4,
        scale,
        opacity: 0.55 + Math.random() * 0.35,
        puffs,
      };
    };

    const cloudCount = Math.min(Math.max(Math.floor(width / 160), 6), 12);
    const clouds: Cloud[] = [];
    for (let i = 0; i < cloudCount; i++) {
      clouds.push(createCloud(Math.random() * width));
    }

    // STARS ENGINE (for moonlit night)
    const stars: Star[] = [];
    const starCount = Math.min(Math.floor(width / 12), 120);
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.85),
        radius: 0.6 + Math.random() * 1.6,
        alpha: 0.2 + Math.random() * 0.7,
        alphaChange: (Math.random() - 0.5) * 0.02,
      });
    }

    // SUN ENGINE (for sunny theme)
    const sunParticles: SunParticle[] = [];
    const particleCount = 35;
    for (let i = 0; i < particleCount; i++) {
      sunParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 2.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -0.2 - Math.random() * 0.5,
        opacity: 0.2 + Math.random() * 0.5,
      });
    }

    let sunPulse = 0;

    // ANIMATION LOOP
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (theme === 'sunny') {
        // --- SUNNY DAY ENGINE ---
        sunPulse += 0.02;
        const sunX = width * 0.85;
        const sunY = height * 0.15;
        const baseRadius = 55 + Math.sin(sunPulse) * 4;

        // Radiant Outer Sun Glow
        const sunGlow = ctx.createRadialGradient(
          sunX,
          sunY,
          baseRadius * 0.3,
          sunX,
          sunY,
          baseRadius * 4.5
        );
        sunGlow.addColorStop(0, 'rgba(253, 224, 71, 0.45)');
        sunGlow.addColorStop(0.35, 'rgba(251, 191, 36, 0.25)');
        sunGlow.addColorStop(0.7, 'rgba(56, 189, 248, 0.15)');
        sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = sunGlow;
        ctx.beginPath();
        ctx.arc(sunX, sunY, baseRadius * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Sun Core
        const coreGlow = ctx.createRadialGradient(
          sunX,
          sunY,
          5,
          sunX,
          sunY,
          baseRadius
        );
        coreGlow.addColorStop(0, '#ffffff');
        coreGlow.addColorStop(0.4, '#fef08a');
        coreGlow.addColorStop(1, '#f59e0b');

        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(sunX, sunY, baseRadius, 0, Math.PI * 2);
        ctx.fill();

        // Floating Sunbeam Light Motes
        for (const p of sunParticles) {
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.y < 0) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }

          ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Soft breezy wispy sun clouds
        for (let i = 0; i < Math.min(clouds.length, 4); i++) {
          const cloud = clouds[i];
          cloud.x += cloud.speed * 0.7;
          if (cloud.x - 200 * cloud.scale > width) {
            cloud.x = -250 * cloud.scale;
          }
          ctx.save();
          ctx.translate(cloud.x, cloud.y);
          for (const puff of cloud.puffs) {
            const grad = ctx.createRadialGradient(
              puff.offsetX,
              puff.offsetY - puff.radius * 0.2,
              puff.radius * 0.1,
              puff.offsetX,
              puff.offsetY,
              puff.radius
            );
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
            grad.addColorStop(0.7, 'rgba(254, 240, 138, 0.35)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(puff.offsetX, puff.offsetY, puff.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      } else if (theme === 'cloudy') {
        // --- CLOUDY WEATHER ENGINE ---
        for (let i = 0; i < clouds.length; i++) {
          const cloud = clouds[i];
          cloud.x += cloud.speed;
          if (cloud.x - 220 * cloud.scale > width) {
            cloud.x = -260 * cloud.scale;
            cloud.y = 30 + Math.random() * (height * 0.65);
          }

          ctx.save();
          ctx.translate(cloud.x, cloud.y);

          for (const puff of cloud.puffs) {
            const grad = ctx.createRadialGradient(
              puff.offsetX,
              puff.offsetY - puff.radius * 0.2,
              puff.radius * 0.1,
              puff.offsetX,
              puff.offsetY,
              puff.radius
            );

            // Fluffy white cloud with soft sky-blue ambient shadow
            grad.addColorStop(0, `rgba(255, 255, 255, ${cloud.opacity * 0.95})`);
            grad.addColorStop(0.65, `rgba(240, 249, 255, ${cloud.opacity * 0.85})`);
            grad.addColorStop(0.9, `rgba(224, 242, 254, ${cloud.opacity * 0.6})`);
            grad.addColorStop(1, 'rgba(224, 242, 254, 0)');

            ctx.beginPath();
            ctx.arc(puff.offsetX, puff.offsetY, puff.radius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
          }

          ctx.restore();
        }
      } else if (theme === 'rainy') {
        // --- RAIN ENGINE ---
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.65)';
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';

        for (const drop of raindrops) {
          drop.x += 1.8; // subtle wind drift
          drop.y += drop.speed;

          if (drop.y > height - 15) {
            // Spawn ripple splash
            if (Math.random() < 0.25) {
              ripples.push({
                x: drop.x,
                y: height - 10 + Math.random() * 8,
                radius: 1,
                maxRadius: 10 + Math.random() * 8,
                opacity: 0.6,
              });
            }
            drop.y = -drop.length;
            drop.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x + 2.5, drop.y + drop.length);
          ctx.stroke();
        }

        // Render puddle ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += 0.6;
          r.opacity *= 0.92;

          ctx.strokeStyle = `rgba(186, 230, 253, ${r.opacity})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.4, 0, 0, Math.PI * 2);
          ctx.stroke();

          if (r.opacity < 0.04 || r.radius >= r.maxRadius) {
            ripples.splice(i, 1);
          }
        }
      } else if (theme === 'moonlit') {
        // --- MOONLIT CELESTIAL NIGHT ENGINE ---
        const moonX = width * 0.84;
        const moonY = height * 0.16;
        const moonRadius = 42;

        // Ambient Lunar Halo
        const moonHalo = ctx.createRadialGradient(
          moonX,
          moonY,
          moonRadius * 0.5,
          moonX,
          moonY,
          moonRadius * 4
        );
        moonHalo.addColorStop(0, 'rgba(186, 230, 253, 0.35)');
        moonHalo.addColorStop(0.4, 'rgba(125, 211, 252, 0.15)');
        moonHalo.addColorStop(0.8, 'rgba(30, 58, 138, 0.08)');
        moonHalo.addColorStop(1, 'rgba(3, 7, 18, 0)');

        ctx.fillStyle = moonHalo;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Moon Sphere
        const moonSphere = ctx.createRadialGradient(
          moonX - 10,
          moonY - 10,
          5,
          moonX,
          moonY,
          moonRadius
        );
        moonSphere.addColorStop(0, '#ffffff');
        moonSphere.addColorStop(0.7, '#e0f2fe');
        moonSphere.addColorStop(1, '#bae6fd');

        ctx.fillStyle = moonSphere;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle Moon Craters
        ctx.fillStyle = 'rgba(147, 197, 253, 0.3)';
        ctx.beginPath();
        ctx.arc(moonX - 10, moonY - 8, 7, 0, Math.PI * 2);
        ctx.arc(moonX + 12, moonY + 6, 9, 0, Math.PI * 2);
        ctx.arc(moonX - 4, moonY + 16, 5, 0, Math.PI * 2);
        ctx.fill();

        // Twinkling Stars
        for (const star of stars) {
          star.alpha += star.alphaChange;
          if (star.alpha > 0.95 || star.alpha < 0.15) {
            star.alphaChange = -star.alphaChange;
          }

          ctx.fillStyle = `rgba(240, 249, 255, ${Math.max(0, star.alpha)})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Wispy nocturnal cloud passing by moon
        const nightCloud = clouds[0];
        if (nightCloud) {
          nightCloud.x += nightCloud.speed * 0.4;
          if (nightCloud.x - 200 * nightCloud.scale > width) {
            nightCloud.x = -250 * nightCloud.scale;
          }
          ctx.save();
          ctx.translate(nightCloud.x, height * 0.18);
          for (const puff of nightCloud.puffs) {
            const grad = ctx.createRadialGradient(
              puff.offsetX,
              puff.offsetY,
              puff.radius * 0.1,
              puff.offsetX,
              puff.offsetY,
              puff.radius
            );
            grad.addColorStop(0, 'rgba(186, 230, 253, 0.18)');
            grad.addColorStop(0.7, 'rgba(30, 58, 138, 0.1)');
            grad.addColorStop(1, 'rgba(3, 7, 18, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(puff.offsetX, puff.offsetY, puff.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Atmospheric Sky Background Gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          theme === 'sunny'
            ? 'bg-gradient-to-b from-[#e0f2fe]/75 via-[#fef9c3]/30 via-40% to-white'
            : theme === 'cloudy'
            ? 'bg-gradient-to-b from-[#e0f2fe]/60 via-[#f0f9ff]/50 via-40% to-white'
            : theme === 'rainy'
            ? 'bg-gradient-to-b from-[#0b1329] via-[#0f1d3a] to-[#080d1c]'
            : 'bg-gradient-to-b from-[#050b1a] via-[#071126] to-[#02050e]'
        }`}
      />

      {/* Atmospheric Ambient Sunlight / Cloud / Rain / Moon Glow */}
      {theme === 'sunny' && (
        <div className="absolute -top-24 right-10 w-[550px] h-[550px] rounded-full bg-amber-200/40 blur-[130px] pointer-events-none transition-opacity duration-1000" />
      )}
      {theme === 'cloudy' && (
        <div className="absolute -top-32 left-1/4 w-[600px] h-[400px] rounded-full bg-sky-200/50 blur-[140px] pointer-events-none transition-opacity duration-1000" />
      )}
      {theme === 'rainy' && (
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[500px] rounded-full bg-sky-900/25 blur-[160px] pointer-events-none transition-opacity duration-1000" />
      )}
      {theme === 'moonlit' && (
        <div className="absolute -top-20 right-16 w-[500px] h-[500px] rounded-full bg-indigo-900/30 blur-[150px] pointer-events-none transition-opacity duration-1000" />
      )}

      {/* Weather Canvas Animation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default AnimatedBackground;
