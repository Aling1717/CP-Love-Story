import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// 每个回忆的封面图
import yyhCover from '../assets/yyh1.jpg';
import disneyCover from '../assets/disney1.jpg';
import sh24Cover from '../assets/sh24_2_1.jpg';
import bjCover from '../assets/bj1.jpg';
import tjCover from '../assets/tj1.jpg';

// 随机旋转角度
const randomRot = () => (Math.random() - 0.5) * 4; // -2deg ~ 2deg

const memories = [
  {
    id: 'yyh',
    date: '2023-10-02',
    title: '杭州亚运会',
    subtitle: '和小猪宝贝去看亚运会 🏟️',
    cover: yyhCover,
  },
  {
    id: 'disney',
    date: '2024-01-15',
    title: '第一次上海迪士尼',
    subtitle: '梦幻的一天 🎡',
    cover: disneyCover,
  },
  {
    id: 'sh24_2',
    date: '2024-02',
    title: '和朋友上海+杭州',
    subtitle: '逛吃逛吃 🌁',
    cover: sh24Cover,
  },
  {
    id: '24-5-1',
    date: '2024-05-01',
    title: '北京',
    subtitle: '我们的首都之旅 🦆',
    cover: bjCover,
  },
  {
    id: '24-5-3',
    date: '2024-05-03',
    title: '天津',
    subtitle: '天津卫逛一逛 🍔',
    cover: tjCover,
  },
];

// ===== PolaroidCard：拍立得卡片 =====
function PolaroidCard({ memory, index }) {
  // 交替从左右两侧进入
  const initialX = index % 2 === 0 ? -120 : 120;
  const rotate = randomRot();

  return (
    <Link to={`/detail/${memory.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.div
        initial={{ opacity: 0, x: initialX, rotate, scale: 0.92 }}
        whileInView={{ opacity: 1, x: 0, rotate, scale: 1 }}
        viewport={{ once: false, margin: '-60px' }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 14,
          delay: index * 0.1,
        }}
        whileHover={{
          rotate: 0,
          scale: 1.06,
          boxShadow: '0 28px 64px rgba(255, 107, 129, 0.3), 0 12px 32px rgba(0,0,0,0.08)',
          transition: { type: 'spring', stiffness: 300, damping: 12 },
        }}
        style={{
          perspective: 800,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 拍立得白边底板 */}
        <div
          style={{
            backgroundColor: '#fefcf8',
            borderRadius: '4px',
            padding: '12px 12px 40px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          {/* 封面图 */}
          <img
            src={memory.cover}
            alt={memory.title}
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '2px',
              aspectRatio: '4/3',
              objectFit: 'cover',
            }}
          />

          {/* 日期标记（拍立得底部文字） */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '14px',
              padding: '0 4px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                color: '#d4738a',
                fontWeight: 600,
                letterSpacing: '1px',
                fontFamily: "'PingFang SC', 'Hiragino Sans GB', sans-serif",
              }}
            >
              {memory.date}
            </p>
            <h3
              style={{
                margin: '6px 0 2px',
                fontSize: '18px',
                color: '#3a2a3a',
                fontWeight: 700,
                letterSpacing: '0.5px',
                fontFamily: "'PingFang SC', 'Hiragino Sans GB', sans-serif",
              }}
            >
              {memory.title}
            </h3>
            <p
              style={{
                margin: '2px 0 0',
                fontSize: '12px',
                color: '#8a7a7a',
                fontFamily: "'KaiTi', 'STKaiti', 'PingFang SC', cursive",
                letterSpacing: '0.5px',
              }}
            >
              {memory.subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// ===== 主页面 =====
function Timeline() {
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 20%, #e1bee7 45%, #ce93d8 65%, #e1bee7 80%, #f8bbd0 100%)',
        backgroundSize: '400% 400%',
        animation: 'flowBg 14s ease-in-out infinite alternate',
        padding: '40px 16px 80px',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @keyframes flowBg {
          0%   { background-position: 0% 50%; }
          25%  { background-position: 50% 0%; }
          50%  { background-position: 100% 50%; }
          75%  { background-position: 50% 100%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* 光晕叠加 */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(circle at 15% 25%, rgba(255,182,193,0.2) 0%, transparent 50%),' +
            'radial-gradient(circle at 85% 30%, rgba(206,147,216,0.18) 0%, transparent 50%),' +
            'radial-gradient(circle at 50% 85%, rgba(248,187,208,0.15) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: 'center',
          marginBottom: '44px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            color: '#fff',
            fontSize: '28px',
            fontWeight: 800,
            margin: '0 0 6px',
            textShadow: '0 2px 12px rgba(0,0,0,0.1)',
            letterSpacing: '2px',
            fontFamily: "'PingFang SC', 'Hiragino Sans GB', sans-serif",
          }}
        >
          💕 我们的足迹时间轴
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '13px',
            margin: 0,
            fontWeight: 500,
          }}
        >
          每一张照片，都是一段心动的回忆
        </p>
      </motion.div>

      {/* ====== 拍立得照片墙 ====== */}
      <div
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '44px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {memories.map((memory, index) => (
          <div
            key={memory.id}
            style={{
              width: '92%',
              maxWidth: '360px',
            }}
          >
            <PolaroidCard memory={memory} index={index} />
          </div>
        ))}
      </div>

      {/* 底部返回和装饰 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ textAlign: 'center', marginTop: '48px', position: 'relative', zIndex: 1 }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.span
            whileHover={{ scale: 1.05, x: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '15px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            ← 返回首页
          </motion.span>
        </Link>
      </motion.div>

      {/* 底部留白 */}
      <div style={{ height: '20px' }} />
    </div>
  );
}

export default Timeline;