import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

// === 图片导入 ===
import yyh1 from '../assets/yyh1.jpg';
import yyh2 from '../assets/yyh2.jpg';
import yyh3 from '../assets/yyh3.jpg';
import yyh4 from '../assets/yyh4.jpg';

import disney1 from '../assets/disney1.jpg';
import disney2 from '../assets/disney2.jpg';
import disney3 from '../assets/disney3.jpg';
import disney4 from '../assets/disney4.jpg';

import sh24_2_1 from '../assets/sh24_2_1.jpg';
import sh24_2_2 from '../assets/sh24_2_2.jpg';
import sh24_2_3 from '../assets/sh24_2_3.jpg';
import sh24_2_4 from '../assets/sh24_2_4.jpg';

import bj1 from '../assets/bj1.jpg';
import bj2 from '../assets/bj2.jpg';
import bj3 from '../assets/bj3.jpg';
import bj4 from '../assets/bj4.jpg';
import bj5 from '../assets/bj5.jpg';
import bj6 from '../assets/bj6.jpg';
import bj7 from '../assets/bj7.jpg';

import tj1 from '../assets/tj1.jpg';
import tj2 from '../assets/tj2.jpg';
import tj3 from '../assets/tj3.jpg';
import tj4 from '../assets/tj4.jpg';
import tj5 from '../assets/tj5.jpg';
import tj6 from '../assets/tj6.jpg';
import tj7 from '../assets/tj7.jpg';
import tj8 from '../assets/tj8.jpg';

// === 随机旋转角度（-6deg ~ 6deg） ===
const randomRotate = () => (Math.random() - 0.5) * 12;

// ===== PolaroidCard：拍立得卡片组件 =====
function PolaroidCard({ src, note, index }) {
  // 鼠标追踪实现磁吸效果
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / 20;
    const deltaY = (e.clientY - centerY) / 20;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: randomRotate() }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.08,
      }}
      whileHover={{
        scale: 1.04,
        rotate: 0.5,
        boxShadow: '0 20px 60px rgba(255, 107, 129, 0.25), 0 8px 24px rgba(0,0,0,0.08)',
        zIndex: 20,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
        perspective: 600,
      }}
      className="polaroid-card"
    >
      {/* 拍立得白色底板 */}
      <div style={{
        backgroundColor: '#fefcf8',
        borderRadius: '4px',
        padding: '10px 10px 28px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)',
        position: 'relative',
        transform: 'rotate(var(--rot))',
        transition: 'transform 0.3s ease',
      }}>
        {/* 图片 */}
        <img
          src={src}
          alt={`memory-${index}`}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '2px',
            aspectRatio: '4/3',
            objectFit: 'cover',
          }}
        />
        {/* 批注文字（拍立得底部手写感） */}
        {note && (
          <p style={{
            margin: '8px 4px 0',
            fontSize: '12px',
            color: '#8a7a7a',
            fontFamily: "'KaiTi', 'STKaiti', 'PingFang SC', cursive",
            textAlign: 'center',
            lineHeight: '1.4',
            letterSpacing: '0.5px',
            minHeight: '18px',
          }}>
            {note}
          </p>
        )}
        {!note && (
          <div style={{ height: '18px' }} />
        )}
      </div>
    </motion.div>
  );
}

// ===== 主组件 =====
function Detail() {
  const { id } = useParams();

  const detailData = {
    'yyh': {
      title: '杭州亚运会',
      date: '2023-10-02',
      content: '和小猪宝贝去看了亚运会，晚上还在市内 city walk 🚶',
      imagesWithNote: [
        { url: yyh1, note: '在场馆看比赛！有一个跳高的特别厉害！' },
        { url: yyh2, note: '我们刮刮乐刮到了 180 🎉' },
        { url: yyh3, note: '' },
        { url: yyh4, note: 'City walk ~' },
      ]
    },
    'disney': {
      title: '第一次上海迪士尼',
      date: '2024-01-15',
      content: '我们第一次去迪士尼！🎠',
      imagesWithNote: [
        { url: disney1, note: '排队前的超大唐老鸭'},
        { url: disney2, note: '尼克狐尼克！'},
        { url: disney3, note: '小兔子朱迪！'},
        { url: disney4, note: '呜呜呜大猪猪吃完晚饭困困睡着了~'},
      ]
    },
    'sh24_2': {
      title: '和朋友上海 + 杭州',
      date: '2024-02',
      content: '逛逛逛！',
      imagesWithNote: [
        { url: sh24_2_1, note: '给小猪拍了广角大片！'},
        { url: sh24_2_2, note: '迷雾飘散的上海夜景'},
        { url: sh24_2_3, note: '超大泡泡玛特'},
        { url: sh24_2_4, note: '小猪和网红合照~'},
      ]
    },
    '24-5-1': {
      title: '我们的北京之旅',
      date: '2024-05-01',
      content: '',
      imagesWithNote: [
        { url: bj1, note: '' },
        { url: bj2, note: '' },
        { url: bj3, note: '' },
        { url: bj4, note: '' },
        { url: bj5, note: '' },
        { url: bj6, note: '' },
        { url: bj7, note: '' },
      ]
    },
    '24-5-3': {
      title: '我们到天津啦',
      date: '2024-05-03',
      content: '',
      imagesWithNote: [
        { url: tj1, note: '' },
        { url: tj2, note: '' },
        { url: tj3, note: '' },
        { url: tj4, note: '' },
        { url: tj5, note: '' },
        { url: tj6, note: '' },
        { url: tj7, note: '' },
        { url: tj8, note: '' },
      ]
    },
  };

  const item = detailData[id];

  if (!item) {
    return (
      <div style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #fce4ec, #f3e5f5)',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            textAlign: 'center',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            padding: '40px',
            borderRadius: '24px',
            maxWidth: '360px',
          }}
        >
          <h3 style={{ color: '#4a2a4a', margin: '0 0 12px' }}>找不到这段回忆...</h3>
          <Link to="/timeline" style={{
            color: '#ff6b81',
            fontSize: '15px',
            textDecoration: 'none',
            fontWeight: 600,
          }}>
            ← 返回时间轴
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 30%, #e1bee7 60%, #f3e5f5 100%)',
      backgroundSize: '200% 200%',
      animation: 'bgShift 15s ease-in-out infinite alternate',
      padding: '30px 16px 80px',
    }}>
      <style>{`
        @keyframes bgShift {
          0%   { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .polaroid-card {
          transform-style: preserve-3d;
        }
      `}</style>

      {/* 返回按钮 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '600px', margin: '0 auto 20px' }}
      >
        <Link to="/timeline" style={{ textDecoration: 'none' }}>
          <motion.span
            whileHover={{ x: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '15px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            ← 返回时间轴
          </motion.span>
        </Link>
      </motion.div>

      {/* 标题区域 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: 'center',
          marginBottom: '36px',
        }}
      >
        <h2 style={{
          color: '#fff',
          fontSize: '26px',
          fontWeight: 800,
          margin: '0 0 6px',
          textShadow: '0 2px 12px rgba(0,0,0,0.12)',
          letterSpacing: '1px',
        }}>
          {item.title}
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '13px',
          margin: 0,
          fontWeight: 500,
        }}>
          {item.date}
        </p>
        {item.content && (
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '14px',
            margin: '12px 0 0',
            lineHeight: 1.6,
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {item.content}
          </p>
        )}
      </motion.div>

      {/* ====== 拍立得照片墙 ====== */}
      <div style={{
        maxWidth: '620px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
      }}>
        {item.imagesWithNote && item.imagesWithNote.map((imgObj, index) => (
          <div
            key={index}
            style={{
              width: '90%',
              maxWidth: '340px',
            }}
          >
            <PolaroidCard
              src={imgObj.url}
              note={imgObj.note}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* 底部空白 */}
      <div style={{ height: '40px' }} />
    </div>
  );
}

export default Detail;