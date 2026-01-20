import { Link } from 'react-router-dom';

function Timeline() {
  /**
   * 【添加时间的方法】
   * 以后每增加一个日期，就在下面的 [ ] 中间增加一个 { ... } 块。
   * 注意：每个块之间要用逗号 (,) 隔开。
   */
  const memories = [
    { 
      id: '1',               // 唯一标识（用于跳转详情页）
      date: '2023-10-02',        // 显示的日期
      title: '杭州亚运会',   // 这一天的标题
      //icon: '❤️'                 // 显示的小图标
    },
    // 以后想加新的，就从这里开始粘贴...
    { 
      id: '2',               // 唯一标识（用于跳转详情页）
      date: '2023-1-15',        // 显示的日期
      title: '上海的第一次迪士尼',   // 这一天的标题
      //icon: '❤️'                 // 显示的小图标
    },
  ];

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>我们的足迹时间轴</h2>
      
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

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/" className="back-link">← 返回首页</Link>
      </div>
    </div>
  );
}

export default Timeline;