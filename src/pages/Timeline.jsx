import { Link } from 'react-router-dom';

function Timeline() {
  // 暂时清空所有错误时间，等待填入真正的回忆
  const memories = [];

  return (
    <div className="container">
      <h2>我们的足迹时间轴</h2>
      <div className="timeline-container">
        {memories.length > 0 ? (
          memories.map(m => (
            <Link to={`/detail/${m.id}`} key={m.id} className="timeline-card">
              <span className="timeline-icon">{m.icon}</span>
              <div className="timeline-info">
                <span className="timeline-date">{m.date}</span>
                <h3>{m.title}</h3>
              </div>
              <span className="arrow">❯</span>
            </Link>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            <p>这里还没有足迹...</p>
            <p>准备好记录我们的第一站了吗？</p>
          </div>
        )}
      </div>
      <Link to="/"><p className="back-link">返回首页</p></Link>
    </div>
  );
}

export default Timeline;