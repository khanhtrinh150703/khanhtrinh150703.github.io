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

interface CloudItem {
  x: number;
  baseY: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  opacity: number;
  floatPhase: number;
  floatSpeed: number;
  flip: boolean;
}

interface WindItem {
  x: number;
  baseY: number;
  y: number;
  speed: number;
  scale: number;
  opacity: number;
  wavePhase: number;
  waveSpeed: number;
}

interface SunParticle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  swaySpeed: number;
  swayPhase: number;
  opacity: number;
  sparklePhase: number;
  isStar?: boolean;
  rotation?: number;
  rotationSpeed?: number;
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

    // High quality cloud assets
    const cloudLightImg = new Image();
    cloudLightImg.src = '/cloud.png';

    const cloudDarkImg = new Image();
    cloudDarkImg.src = '/cloud-dark.png';

    // Fallback Vector SVG Path for the cloud shape
    const cloudSvgPath = new Path2D(
      'M 255 7 L 287 8 L 302 12 L 316 18 L 334 30 L 348 44 L 355 53 L 363 69 L 366 72 L 377 72 L 387 74 L 401 79 L 417 88 L 437 107 L 449 126 L 478 126 L 492 130 L 508 139 L 514 144 L 525 158 L 531 174 L 532 186 L 530 199 L 524 213 L 519 220 L 503 234 L 485 242 L 460 245 L 445 243 L 441 241 L 429 255 L 414 267 L 396 276 L 381 280 L 348 280 L 331 275 L 310 263 L 293 273 L 279 277 L 254 277 L 240 273 L 228 266 L 225 266 L 209 274 L 188 280 L 153 282 L 129 278 L 104 268 L 90 259 L 79 249 L 70 237 L 62 221 L 49 221 L 41 219 L 22 209 L 15 202 L 8 191 L 5 182 L 4 169 L 6 159 L 11 148 L 24 134 L 34 128 L 50 123 L 69 123 L 81 126 L 89 113 L 101 101 L 108 96 L 127 88 L 150 86 L 164 89 L 175 61 L 185 46 L 196 34 L 203 28 L 223 16 L 243 9 L 255 7 Z'
    );

    // Vector Wind Swirl Paths (Replicating user wind reference with hairline precision)
    const windPaths = [
      new Path2D(
        'M 80 82 C 160 50, 260 48, 360 72 C 390 79, 410 75, 424 55 C 440 32, 436 12, 418 12 C 402 12, 396 28, 410 38 C 420 45, 432 38, 428 26'
      ),
      new Path2D('M 65 102 C 150 72, 260 70, 375 95 C 405 101, 420 95, 432 80'),
      new Path2D(
        'M 155 135 C 230 120, 310 126, 390 152 C 418 161, 430 156, 438 142 C 445 128, 438 118, 426 120 C 416 122, 416 134, 426 138 C 432 140, 438 135, 435 128'
      ),
      new Path2D('M 30 178 C 160 135, 290 142, 410 182 C 440 192, 470 190, 495 175'),
      new Path2D('M 365 158 C 390 170, 420 175, 445 168'),
    ];

    // --- POETIC CLOUDS: 8 Evenly Distributed Altitude Lanes across the full sky height ---
    // Smoothly paced, noticeably drifting, layered depth for an ethereal Studio Ghibli sky
    const cloudLanes = [
      { yRatio: 0.05, startRatio: 0.06, speed: 0.42, baseW: 130, depthOpacity: 0.88 }, // High sky left
      { yRatio: 0.15, startRatio: 0.52, speed: 0.50, baseW: 155, depthOpacity: 0.92 }, // Mid-high center
      { yRatio: 0.25, startRatio: 0.90, speed: 0.38, baseW: 115, depthOpacity: 0.70 }, // Distant altocumulus right
      { yRatio: 0.36, startRatio: 0.26, speed: 0.46, baseW: 145, depthOpacity: 0.88 }, // Mid sky left
      { yRatio: 0.48, startRatio: 0.72, speed: 0.54, baseW: 165, depthOpacity: 0.94 }, // Mid sky fluffy right
      { yRatio: 0.59, startRatio: 0.12, speed: 0.40, baseW: 120, depthOpacity: 0.72 }, // Distant lower-mid left
      { yRatio: 0.70, startRatio: 0.48, speed: 0.45, baseW: 140, depthOpacity: 0.86 }, // Low center
      { yRatio: 0.82, startRatio: 0.86, speed: 0.42, baseW: 130, depthOpacity: 0.80 }, // Low right
    ];

    const activeLanes =
      theme === 'sunny'
        ? [cloudLanes[0], cloudLanes[1], cloudLanes[3], cloudLanes[6]]
        : theme === 'moonlit'
        ? [cloudLanes[0], cloudLanes[2], cloudLanes[4], cloudLanes[7]]
        : theme === 'snowy'
        ? [cloudLanes[0], cloudLanes[2], cloudLanes[4], cloudLanes[6]]
        : theme === 'rainy'
        ? [cloudLanes[0], cloudLanes[1], cloudLanes[3], cloudLanes[4], cloudLanes[5], cloudLanes[7]]
        : cloudLanes; // All 8 clouds for 'cloudy' mode!

    const clouds: CloudItem[] = activeLanes.map((lane, idx) => {
      const baseW = Math.min(lane.baseW, width * 0.28);
      const baseH = baseW / 1.864;
      const themeFactor = theme === 'moonlit' ? 0.48 : theme === 'rainy' ? 0.78 : 1.0;
      const opacity = (lane.depthOpacity ?? 0.88) * themeFactor;
      return {
        x: lane.startRatio * width,
        baseY: lane.yRatio * height,
        y: lane.yRatio * height,
        width: baseW,
        height: baseH,
        speed: lane.speed,
        opacity,
        floatPhase: idx * 1.4,
        floatSpeed: 0.008 + (idx % 3) * 0.002,
        flip: idx % 2 === 1,
      };
    });

    // --- DELICATE WIND SWIRLS: Only 1-2 subtle, slender breezes ---
    const windConfigs = [
      { yRatio: 0.16, startRatio: 0.25, speed: 0.95, scale: 0.34 },
      { yRatio: 0.42, startRatio: 0.72, speed: 1.15, scale: 0.3 },
    ];

    const activeWindConfigs =
      theme === 'sunny' ? [windConfigs[0]] : windConfigs;

    const winds: WindItem[] = activeWindConfigs.map((cfg, idx) => ({
      x: cfg.startRatio * width,
      baseY: cfg.yRatio * height,
      y: cfg.yRatio * height,
      speed: cfg.speed,
      scale: cfg.scale,
      opacity: theme === 'moonlit' ? 0.4 : theme === 'rainy' ? 0.55 : 0.4,
      wavePhase: idx * 1.5,
      waveSpeed: 0.012,
    }));

    // RAIN ENGINE
    const raindrops: Raindrop[] = [];
    const ripples: Ripple[] = [];
    const rainCount = Math.min(Math.floor(width / 8), 120);

    for (let i = 0; i < rainCount; i++) {
      raindrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 12 + Math.random() * 16,
        speed: 12 + Math.random() * 14,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    // STARS ENGINE (for moonlit night)
    const stars: Star[] = [];
    const starCount = Math.min(Math.floor(width / 14), 90);
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.85),
        radius: 0.6 + Math.random() * 1.5,
        alpha: 0.2 + Math.random() * 0.7,
        alphaChange: (Math.random() - 0.5) * 0.02,
      });
    }

    // SUN ENGINE (for sunny theme)
    const sunParticles: SunParticle[] = [];
    const particleCount = 28;
    for (let i = 0; i < particleCount; i++) {
      sunParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 2.2,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -0.2 - Math.random() * 0.4,
        opacity: 0.2 + Math.random() * 0.45,
      });
    }

    // SNOW ENGINE (for snowy theme: 6-pointed ice crystals + snow flurries)
    const snowflakes: Snowflake[] = [];
    const snowflakeCount = Math.min(Math.floor(width / 14), 70);
    for (let i = 0; i < snowflakeCount; i++) {
      const isStar = i % 4 === 0;
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isStar ? 5 + Math.random() * 5.5 : 1.6 + Math.random() * 2.8,
        speedY: isStar ? 0.65 + Math.random() * 0.9 : 0.8 + Math.random() * 1.3,
        speedX: (Math.random() - 0.5) * 0.35,
        swaySpeed: 0.012 + Math.random() * 0.018,
        swayPhase: Math.random() * Math.PI * 2,
        opacity: isStar ? 0.7 + Math.random() * 0.3 : 0.5 + Math.random() * 0.45,
        sparklePhase: Math.random() * Math.PI * 2,
        isStar,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    let sunPulse = 0;

    // Helper: Draw compact cloud item
    const drawCloudItem = (
      c: CloudItem,
      img: HTMLImageElement,
      isDarkTheme: boolean
    ) => {
      ctx.save();
      ctx.globalAlpha = c.opacity;
      ctx.translate(c.x + c.width / 2, c.y + c.height / 2);
      if (c.flip) {
        ctx.scale(-1, 1);
      }

      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, -c.width / 2, -c.height / 2, c.width, c.height);
      } else {
        // High fidelity vector fallback
        ctx.save();
        const scaleX = c.width / 537;
        const scaleY = c.height / 288;
        ctx.scale(scaleX, scaleY);
        ctx.translate(-268, -144);
        ctx.fillStyle = isDarkTheme ? '#1e293b' : '#ffffff';
        ctx.strokeStyle = isDarkTheme ? '#94a3b8' : '#64748b';
        ctx.lineWidth = 1.2 / scaleX;
        ctx.fill(cloudSvgPath);
        ctx.stroke(cloudSvgPath);
        ctx.restore();
      }
      ctx.restore();
    };

    // Helper: Draw hairline slender wind swirl
    const drawWindItem = (w: WindItem, isDarkTheme: boolean) => {
      ctx.save();
      // Soft edge fading at screen borders
      const wPx = 520 * w.scale;
      const edgeFade = Math.min(
        Math.max((w.x + wPx * 0.4) / 90, 0),
        Math.max((width - w.x) / 90, 0),
        1
      );
      ctx.globalAlpha = w.opacity * edgeFade;
      ctx.translate(w.x, w.y);
      ctx.scale(w.scale, w.scale);

      // Delicate slender hairline stroke (1.4px visual stroke width)
      ctx.strokeStyle = isDarkTheme
        ? 'rgba(186, 230, 253, 0.55)'
        : 'rgba(100, 116, 139, 0.42)';
      ctx.lineWidth = 1.4 / w.scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (const p of windPaths) {
        ctx.stroke(p);
      }
      ctx.restore();
    };

    // Helper: Draw intricate 6-pointed star crystalline snowflake
    const drawStarSnowflake = (
      x: number,
      y: number,
      r: number,
      rot: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.shadowColor = 'rgba(56, 189, 248, 0.55)';
      ctx.shadowBlur = 5;
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.lineWidth = Math.max(1, r * 0.18);
      ctx.lineCap = 'round';
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        const branchY = -r * 0.55;
        const branchW = r * 0.32;
        ctx.moveTo(-branchW, branchY + branchW * 0.5);
        ctx.lineTo(0, branchY);
        ctx.lineTo(branchW, branchY + branchW * 0.5);
        ctx.stroke();
        ctx.rotate(Math.PI / 3);
      }
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(1.2, r * 0.2), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // ANIMATION LOOP
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDarkTheme = theme === 'rainy' || theme === 'moonlit';
      const activeCloudImg = isDarkTheme ? cloudDarkImg : cloudLightImg;

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

        // Slender Wind Swirl
        for (const w of winds) {
          w.x += w.speed;
          w.wavePhase += w.waveSpeed;
          w.y = w.baseY + Math.sin(w.wavePhase) * 6;
          if (w.x > width + 40) {
            w.x = -520 * w.scale - 40;
          }
          drawWindItem(w, isDarkTheme);
        }

        // Clouds
        for (const cloud of clouds) {
          cloud.x += cloud.speed;
          cloud.floatPhase += cloud.floatSpeed;
          cloud.y = cloud.baseY + Math.sin(cloud.floatPhase) * 4.5;
          if (cloud.x > width + 50) {
            cloud.x = -cloud.width - 50;
          }
          drawCloudItem(cloud, activeCloudImg, isDarkTheme);
        }
      } else if (theme === 'cloudy') {
        // --- CLOUDY WEATHER ENGINE ---
        // Slender Wind Swirls
        for (const w of winds) {
          w.x += w.speed;
          w.wavePhase += w.waveSpeed;
          w.y = w.baseY + Math.sin(w.wavePhase) * 8;
          if (w.x > width + 40) {
            w.x = -520 * w.scale - 40;
          }
          drawWindItem(w, isDarkTheme);
        }

        // Poetic, well-spaced clouds drifting gracefully across the sky
        for (const cloud of clouds) {
          cloud.x += cloud.speed;
          cloud.floatPhase += cloud.floatSpeed;
          cloud.y = cloud.baseY + Math.sin(cloud.floatPhase) * 5.5;
          if (cloud.x > width + 50) {
            cloud.x = -cloud.width - 50;
          }
          drawCloudItem(cloud, activeCloudImg, isDarkTheme);
        }
      } else if (theme === 'rainy') {
        // --- RAIN ENGINE ---
        // Storm Wind Swirls
        for (const w of winds) {
          w.x += w.speed * 1.3;
          w.wavePhase += w.waveSpeed * 1.3;
          w.y = w.baseY + Math.sin(w.wavePhase) * 8;
          if (w.x > width + 40) {
            w.x = -520 * w.scale - 40;
          }
          drawWindItem(w, isDarkTheme);
        }

        // Storm Clouds
        for (const cloud of clouds) {
          cloud.x += cloud.speed * 1.15;
          cloud.floatPhase += cloud.floatSpeed;
          cloud.y = cloud.baseY + Math.sin(cloud.floatPhase) * 4;
          if (cloud.x > width + 50) {
            cloud.x = -cloud.width - 50;
          }
          drawCloudItem(cloud, activeCloudImg, isDarkTheme);
        }

        // Raindrops
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.65)';
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';

        for (const drop of raindrops) {
          drop.x += 1.8;
          drop.y += drop.speed;

          if (drop.y > height - 15) {
            if (Math.random() < 0.22) {
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

        // Puddle ripples
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
      } else if (theme === 'snowy') {
        // --- SNOWY FROST WINTER DAY ENGINE ---
        // Subtle icy winter breeze
        for (const w of winds) {
          w.x += w.speed * 0.8;
          w.wavePhase += w.waveSpeed;
          w.y = w.baseY + Math.sin(w.wavePhase) * 4;
          if (w.x > width + 40) {
            w.x = -520 * w.scale - 40;
          }
          drawWindItem(w, false);
        }

        // Soft winter clouds drifting gently in the background
        for (const cloud of clouds) {
          cloud.x += cloud.speed * 0.85;
          cloud.floatPhase += cloud.floatSpeed;
          cloud.y = cloud.baseY + Math.sin(cloud.floatPhase) * 4;
          if (cloud.x > width + 50) {
            cloud.x = -cloud.width - 50;
          }
          drawCloudItem(cloud, activeCloudImg, false);
        }

        // Falling Dancing Snowflakes: Mixture of intricate 6-point ice crystals and soft snow flurries
        for (const s of snowflakes) {
          s.swayPhase += s.swaySpeed;
          s.sparklePhase += 0.025;
          s.y += s.speedY;
          s.x += Math.sin(s.swayPhase) * 0.85 + s.speedX;
          if (s.rotation !== undefined && s.rotationSpeed !== undefined) {
            s.rotation += s.rotationSpeed;
          }

          if (s.y > height + 15) {
            s.y = -15;
            s.x = Math.random() * width;
          }
          if (s.x > width + 15) s.x = -15;
          if (s.x < -15) s.x = width + 15;

          const sparkle = (Math.sin(s.sparklePhase) + 1) * 0.12;
          const currentOpacity = Math.min(s.opacity + sparkle, 1);

          if (s.isStar) {
            drawStarSnowflake(s.x, s.y, s.radius, s.rotation || 0, currentOpacity);
          } else {
            ctx.save();
            ctx.shadowColor = 'rgba(56, 189, 248, 0.45)';
            ctx.shadowBlur = 5;

            // Soft outer crystal glow
            const snowGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 2);
            snowGlow.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.95})`);
            snowGlow.addColorStop(0.5, `rgba(224, 242, 254, ${currentOpacity * 0.7})`);
            snowGlow.addColorStop(1, 'rgba(186, 230, 253, 0)');

            ctx.fillStyle = snowGlow;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius * 2, 0, Math.PI * 2);
            ctx.fill();

            // Crisp pure white core
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius * 0.85, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
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

        // Moon Craters
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

        // Night Breeze Wind Swirl
        for (const w of winds) {
          w.x += w.speed * 0.9;
          w.wavePhase += w.waveSpeed;
          w.y = w.baseY + Math.sin(w.wavePhase) * 6;
          if (w.x > width + 40) {
            w.x = -520 * w.scale - 40;
          }
          drawWindItem(w, isDarkTheme);
        }

        // Night Clouds
        for (const cloud of clouds) {
          cloud.x += cloud.speed * 0.85;
          cloud.floatPhase += cloud.floatSpeed;
          cloud.y = cloud.baseY + Math.sin(cloud.floatPhase) * 4;
          if (cloud.x > width + 50) {
            cloud.x = -cloud.width - 50;
          }
          drawCloudItem(cloud, activeCloudImg, isDarkTheme);
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
            : theme === 'snowy'
            ? 'bg-gradient-to-b from-[#d5e8fb] via-[#ebf4fd] via-40% to-[#f7fbff]'
            : 'bg-gradient-to-b from-[#050b1a] via-[#071126] to-[#02050e]'
        }`}
      />

      {/* Atmospheric Ambient Sunlight / Cloud / Rain / Snow / Moon Glow */}
      {theme === 'sunny' && (
        <div className="absolute -top-24 right-10 w-[550px] h-[550px] rounded-full bg-amber-200/40 blur-[130px] pointer-events-none transition-opacity duration-1000" />
      )}
      {theme === 'cloudy' && (
        <div className="absolute -top-32 left-1/4 w-[600px] h-[400px] rounded-full bg-sky-200/50 blur-[140px] pointer-events-none transition-opacity duration-1000" />
      )}
      {theme === 'rainy' && (
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[500px] rounded-full bg-sky-900/25 blur-[160px] pointer-events-none transition-opacity duration-1000" />
      )}
      {theme === 'snowy' && (
        <div className="absolute -top-24 left-1/3 w-[650px] h-[500px] rounded-full bg-cyan-200/50 blur-[140px] pointer-events-none transition-opacity duration-1000" />
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
