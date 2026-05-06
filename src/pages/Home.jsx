/**
 * Home.jsx — CP's Love Story 首页
 *
 * 功能：
 *  1. Canvas 极光流体背景（双层噪声场 + 径向渐变，HiDPI 适配，独立 RAF 循环）
 *  2. framer-motion 3D 视差（三层深度：卡片 / 粒子 / 装饰心）
 *  3. 磁吸按钮 Hook（useMagnet）
 *  4. 动态模糊标题（hover 解模糊 + glow）
 *  5. 所有样式对象定义在组件外（模块级常量），will-change 全覆盖
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import homePic from '../assets/home-page.jpg';

// ─────────────────────────────────────────────
//  模块级常量：漂浮粒子数据
// ─────────────────────────────────────────────
const PARTICLES = [
  { emoji: '💕', size: 28, x: '5%',  y: '8%',  delay: 0,   dur: 7.0 },
  { emoji: '💖', size: 24, x: '90%', y: '12%', delay: 1.2, dur: 8.0 },
  { emoji: '✨', size: 18, x: '85%', y: '75%', delay: 0.5, dur: 6.0 },
  { emoji: '🌸', size: 22, x: '10%', y: '82%', delay: 2.0, dur: 7.5 },
  { emoji: '💫', size: 16, x: '95%', y: '45%', delay: 3.0, dur: 9.0 },
  { emoji: '🌙', size: 20, x: '3%',  y: '50%', delay: 1.5, dur: 8.5 },
  { emoji: '🦋', size: 18, x: '50%', y: '5%',  delay: 2.5, dur: 6.5 },
  { emoji: '💗', size: 22, x: '70%', y: '88%', delay: 0.8, dur: 7.2 },
];

// ─────────────────────────────────────────────
//  模块级样式常量
// ─────────────────────────────────────────────
const S = {
  root: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0, padding: 0,
    zIndex: 9999,
    overflow: 'hidden',
    background: '#0d0015',   // 深底色，让极光显色
    fontFamily: "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
  },
  canvas: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    display: 'block',
    willChange: 'transform',
  },
  // 父容器：负责 perspective + 3D 上下文
  perspectiveWrapper: {
    position: 'relative',
    width: '90%',
    maxWidth: '440px',
    perspective: '1200px',
    zIndex: 10,
  },
  // 卡片层（第一视差深度）
  cardMotion: {
    width: '100%',
    willChange: 'transform',
  },
  card: {
    width: '100%',
    padding: '48px 32px 38px',
    textAlign: 'center',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(32px) saturate(200%)',
    WebkitBackdropFilter: 'blur(32px) saturate(200%)',
    borderRadius: '32px',
    border: '1.5px solid rgba(255,255,255,0.18)',
    boxShadow: `
      inset 0 0 40px rgba(255,255,255,0.06),
      0 8px 32px rgba(138,43,226,0.25),
      0 2px 8px rgba(0,0,0,0.3)
    `,
    position: 'relative',
    overflow: 'hidden',
    willChange: 'transform',
  },
  // 卡片内高光膜
  cardHighlight: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.07) 0%, transparent 65%)',
    mixBlendMode: 'screen',
    pointerEvents: 'none',
    borderRadius: '32px',
  },
  // 装饰心（第三视差深度）
  decoHeartWrapper: {
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    willChange: 'transform',
    zIndex: 5,
  },
  decoHeart: {
    fontSize: '40px',
    lineHeight: 1,
    filter: 'drop-shadow(0 4px 12px rgba(255,107,129,0.55))',
    display: 'block',
  },
  // 标题（动态模糊）— 非 hover 态
  titleBase: {
    color: '#f0dcff',
    fontSize: '30px',
    margin: '24px 0 4px',
    fontWeight: 800,
    letterSpacing: '2px',
    display: 'block',
    transition: 'filter 0.55s cubic-bezier(0.25,0.46,0.45,0.94), text-shadow 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
    filter: 'blur(3.5px) brightness(0.85)',
    textShadow: 'none',
    cursor: 'default',
  },
  // 标题 hover 态（通过 useState 动态切换）
  titleHover: {
    color: '#f0dcff',
    fontSize: '30px',
    margin: '24px 0 4px',
    fontWeight: 800,
    letterSpacing: '2px',
    display: 'block',
    transition: 'filter 0.55s cubic-bezier(0.25,0.46,0.45,0.94), text-shadow 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
    filter: 'blur(0px) brightness(1.1)',
    textShadow: `
      0 0 18px rgba(255,160,220,0.55),
      0 0 40px rgba(200,100,255,0.25)
    `,
    cursor: 'default',
  },
  subtitle: {
    color: '#d4a0e8',
    fontSize: '13px',
    margin: '4px 0 20px',
    fontWeight: 600,
    letterSpacing: '3px',
  },
  photoWrapper: {
    margin: '18px auto',
    width: '100%',
    willChange: 'transform',
  },
  photo: {
    width: '100%',
    borderRadius: '18px',
    boxShadow: '0 8px 28px rgba(138,43,226,0.35)',
    display: 'block',
    border: '3px solid rgba(255,255,255,0.20)',
  },
  bodyText: {
    color: '#c8aedd',
    fontSize: '14px',
    margin: '20px 0 26px',
    lineHeight: '1.8',
    fontWeight: 400,
    letterSpacing: '0.5px',
  },
  // 按钮外层 Link 包裹
  linkWrapper: {
    textDecoration: 'none',
    display: 'inline-block',
  },
  // 磁吸按钮本体
  btnInner: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 42px',
    fontSize: '17px',
    fontWeight: 700,
    color: 'white',
    background: 'linear-gradient(135deg, #ff6b81, #c42b6e, #7b2ff7)',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 28px rgba(123,47,247,0.45)',
    position: 'relative',
    overflow: 'hidden',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  },
  // 按钮高光膜
  btnHighlight: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22) 0%, transparent 60%)',
    mixBlendMode: 'screen',
    pointerEvents: 'none',
    borderRadius: '50px',
  },
  footerText: {
    color: 'rgba(200,180,230,0.45)',
    fontSize: '11px',
    margin: '22px 0 0',
    letterSpacing: '1.5px',
  },
  // 粒子层（第二视差深度）—— 绝对定位覆盖全屏
  particleLayer: {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 8,
    willChange: 'transform',
  },
  particle: (el) => ({
    position: 'absolute',
    left: el.x,
    top: el.y,
    fontSize: `${el.size}px`,
    pointerEvents: 'none',
    willChange: 'transform',
  }),
};

// ─────────────────────────────────────────────
//  全局 CSS keyframes（注入一次）
// ─────────────────────────────────────────────
const GLOBAL_CSS = `
@keyframes float {
  0%,100% { transform: translateY(0px) rotate(0deg); }
  25%      { transform: translateY(-14px) rotate(3deg); }
  50%      { transform: translateY(-7px) rotate(-2deg); }
  75%      { transform: translateY(-18px) rotate(1deg); }
}
`;

// ─────────────────────────────────────────────
//  磁吸 Hook
// ─────────────────────────────────────────────
function useMagnet(strength = 0.45, radius = 65) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 280, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 280, damping: 18, mass: 0.6 });

  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= radius) {
        const pull = (1 - dist / radius) * strength;
        rawX.set(dx * pull);
        rawY.set(dy * pull);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [rawX, rawY, strength, radius]);

  return { ref, x, y };
}

// ─────────────────────────────────────────────
//  Canvas 极光流体（纯原生，独立于 React）
// ─────────────────────────────────────────────
function useAuroraCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let rafId;
    let t = 0;
    let W, H;

    // 极简 Simplex-like 噪声（基于 sin/cos 叠加模拟双层噪声场）
    const noise = (x, y, z) =>
      Math.sin(x * 1.3 + z) * Math.cos(y * 0.9 + z * 0.7) * 0.5 +
      Math.sin(x * 0.7 - z * 1.1) * Math.cos(y * 1.5 + z * 0.4) * 0.5;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // ResizeObserver 监听尺寸变化
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, W, H);

      // 基底深色
      ctx.fillStyle = '#0d0015';
      ctx.fillRect(0, 0, W, H);

      // 层 1：噪声驱动的极光带（较低频）
      const cols = 6;
      const rows = 5;
      for (let ci = 0; ci <= cols; ci++) {
        for (let ri = 0; ri <= rows; ri++) {
          const nx = ci / cols;
          const ny = ri / rows;
          const n1 = noise(nx * 3, ny * 3, t);
          const n2 = noise(nx * 5 + 1.7, ny * 5 - 0.9, t * 1.3);

          const cx = (nx + n1 * 0.25) * W;
          const cy = (ny + n2 * 0.25) * H;
          const r = (0.35 + Math.abs(n1) * 0.3) * Math.min(W, H) * 0.55;

          // 三种极光色循环
          const phase = (nx + ny + t * 0.4) % 1;
          let color;
          if (phase < 0.33) {
            // 深邃紫
            color = `rgba(138,43,226,${0.055 + Math.abs(n1) * 0.06})`;
          } else if (phase < 0.66) {
            // 玫瑰粉
            color = `rgba(255,105,180,${0.045 + Math.abs(n2) * 0.05})`;
          } else {
            // 珍珠白薰衣草
            color = `rgba(240,220,255,${0.04 + Math.abs(n1) * 0.04})`;
          }

          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          grad.addColorStop(0, color);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, W, H);
        }
      }

      // 层 2：更高频的呼吸感叠加（较小、偏向中心）
      const centers = [
        { px: 0.25, py: 0.35 },
        { px: 0.70, py: 0.25 },
        { px: 0.50, py: 0.70 },
        { px: 0.15, py: 0.65 },
        { px: 0.80, py: 0.65 },
      ];
      centers.forEach(({ px, py }, i) => {
        const n = noise(px * 4, py * 4, t * 0.8 + i * 0.9);
        const breath = 0.55 + 0.45 * Math.sin(t * 1.2 + i * 1.3);
        const cx2 = (px + n * 0.12) * W;
        const cy2 = (py + n * 0.10) * H;
        const r2 = breath * Math.min(W, H) * 0.38;

        const hue = [
          `rgba(138,43,226,${0.09 * breath})`,
          `rgba(255,105,180,${0.08 * breath})`,
          `rgba(240,220,255,${0.07 * breath})`,
          `rgba(180,60,220,${0.09 * breath})`,
          `rgba(255,130,190,${0.08 * breath})`,
        ][i];

        const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
        g2.addColorStop(0, hue);
        g2.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, W, H);
      });

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [canvasRef]);
}

// ─────────────────────────────────────────────
//  主组件
// ─────────────────────────────────────────────
function Home() {
  const canvasRef = useRef(null);

  // 注入全局 CSS（只执行一次）
  useEffect(() => {
    const id = '__home_global_css__';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);

  // 启动极光 Canvas 动画
  useAuroraCanvas(canvasRef);

  // ── 3D 视差：监听全局 mousemove ──
  const mouseX = useMotionValue(0); // 归一化 [-1, 1]
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // 卡片层：rotateX ±6°, rotateY ±8°, 位移 ±6px
  const cardRotateX  = useTransform(springY, [-1, 1], [6, -6]);
  const cardRotateY  = useTransform(springX, [-1, 1], [-8, 8]);
  const cardX        = useTransform(springX, [-1, 1], [-6, 6]);
  const cardY        = useTransform(springY, [-1, 1], [-6, 6]);

  // 粒子层：位移 ±24px（最大视差）
  const particleX    = useTransform(springX, [-1, 1], [-24, 24]);
  const particleY    = useTransform(springY, [-1, 1], [-24, 24]);

  // 装饰心：位移 ±12px
  const heartX       = useTransform(springX, [-1, 1], [-12, 12]);
  const heartY       = useTransform(springY, [-1, 1], [-12, 12]);

  const handleMouseMove = useCallback((e) => {
    const nx = (e.clientX / window.innerWidth)  * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // ── 磁吸按钮 ──
  const { ref: magnetRef, x: magX, y: magY } = useMagnet(0.45, 65);

  // ── 标题模糊 hover 状态 ──
  const [titleHovered, setTitleHovered] = useState(false);

  return (
    <div style={S.root}>
      {/* ── 极光 Canvas 背景 ── */}
      <canvas ref={canvasRef} style={S.canvas} />

      {/* ── 漂浮粒子层（第二视差深度） ── */}
      <motion.div style={{ ...S.particleLayer, x: particleX, y: particleY }}>
        {PARTICLES.map((el, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: el.delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              ...S.particle(el),
              animation: `float ${el.dur}s ease-in-out infinite`,
              animationDelay: `${el.delay}s`,
            }}
          >
            {el.emoji}
          </motion.div>
        ))}
      </motion.div>

      {/* ── perspective 容器 ── */}
      <div style={S.perspectiveWrapper}>

        {/* ── 卡片层（第一视差深度） ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.90 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...S.cardMotion,
            rotateX: cardRotateX,
            rotateY: cardRotateY,
            x: cardX,
            y: cardY,
          }}
        >
          <div style={S.card}>
            {/* 卡片高光膜 */}
            <div style={S.cardHighlight} />

            {/* 装饰心（第三视差深度）*/}
            <motion.div style={{ ...S.decoHeartWrapper, x: heartX, y: heartY }}>
              <motion.span
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                style={S.decoHeart}
              >💕</motion.span>
            </motion.div>

            {/* ── 动态模糊标题 ── */}
            <span
              style={titleHovered ? S.titleHover : S.titleBase}
              onMouseEnter={() => setTitleHovered(true)}
              onMouseLeave={() => setTitleHovered(false)}
            >
              CP's LOVE Story
            </span>

            {/* 副标题 */}
            <p style={S.subtitle}>✨ 一屋两人，三餐四季 ✨</p>

            {/* 合照 */}
            <motion.div
              whileHover={{ scale: 1.025 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              style={S.photoWrapper}
            >
              <img src={homePic} alt="Our Story" style={S.photo} />
            </motion.div>

            {/* 文案 */}
            <p style={S.bodyText}>
              从相遇的那一刻起<br />
              每一天都是心动的延续 💕
            </p>

            {/* ── 磁吸按钮 ── */}
            <Link to="/timeline" style={S.linkWrapper}>
              <motion.div
                ref={magnetRef}
                style={{ x: magX, y: magY }}
                whileHover={{
                  scale: 1.07,
                  boxShadow: '0 16px 40px rgba(123,47,247,0.55)',
                }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              >
                <div style={S.btnInner}>
                  {/* 按钮高光膜 */}
                  <div style={S.btnHighlight} />
                  <motion.span
                    animate={{ scale: [1, 1.18, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ fontSize: '20px', position: 'relative', zIndex: 1 }}
                  >❤️</motion.span>
                  <span style={{ position: 'relative', zIndex: 1 }}>开启回忆之旅</span>
                </div>
              </motion.div>
            </Link>

            {/* 底部装饰文字 */}
            <p style={S.footerText}>— 我们的故事，从这里开始 —</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
