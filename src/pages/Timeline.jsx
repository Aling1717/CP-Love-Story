import { Link } from 'react-router-dom';

function Timeline() {
  // 这里以后可以不断添加新的目的地
  const memories = [
    { id: 'shanghai', date: '2026-01-13', title: '上海：外滩的晚风', icon: '🌆' },
    { id: 'wuzhen', date: '2025-09-19', title: '乌镇：烟雨江南', icon: '🛶' },
  ];

  return (
    <div className="container">
      <h2>我们的足迹时间轴</h2>
      <div className="timeline-container">
        {memories.map(m => (
          <Link to={`/detail/${m.id}`} key={m.id} className="timeline-card">
            <span className="timeline-icon">{m.icon}</span>
            <div className="timeline-info">
              <span className="timeline-date">{m.date}</span>
              <h3>{m.title}</h3>
            </div>
            <span className="arrow">❯</span>
          </Link>
        ))}
      </div>
      <Link to="/"><p className="back-link">返回首页</p></Link>
    </div>
  );
}
export default Timeline;  