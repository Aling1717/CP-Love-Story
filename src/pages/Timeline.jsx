import { Link } from 'react-router-dom';

function Timeline() {

  const memories = [
    { 
      id: 'yyh', 
      date: '2023-10-02', 
      title: '杭州亚运会', 
      icon: '🏟️' 
    },
    {
        id:'dsn',
        date:'2024-1-15',
        title:'第一次上海迪士尼',
        icon:'🎡'
    },

  ];

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>我们的足迹时间轴</h2>
      
      <div className="timeline-container">
        {/* 这里会直接循环显示你的回忆卡片 */}
        {memories.map(m => (
          <Link to={`/detail/${m.id}`} key={m.id} className="timeline-card">
            <span className="timeline-icon" style={{ fontSize: '24px' }}>{m.icon}</span>
            <div className="timeline-info">
              <span className="timeline-date">{m.date}</span>
              <h3 style={{ margin: '5px 0' }}>{m.title}</h3>
            </div>
            <span className="arrow">❯</span>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/" className="back-link">← 返回首页</Link>
      </div>
    </div>
  );
}

export default Timeline;