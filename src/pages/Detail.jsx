import { useParams, Link } from 'react-router-dom';

// 引入四张亚运会照片
import yyh1 from '../assets/yyh1.jpg';
import yyh2 from '../assets/yyh2.jpg';
import yyh3 from '../assets/yyh3.jpg';
import yyh4 from '../assets/yyh4.jpg';

function Detail() {
  const { id } = useParams();

  const detailData = {
    'yyh': {
      title: '杭州亚运会',
      date: '2023-10-02',
      content: '第一次和小猪宝贝出去玩 去看了亚运会 晚上还在市内city walk ',
      images: [yyh1, yyh2, yyh3, yyh4] 
    },
    '2': {
      title: '第一次上海迪士尼',
      date: '2024-01-15',
      content: '在童话世界里的一天。',
      images: [] 
    }
  };

  const item = detailData[id];
  if (!item) return <div className="container">找不到这段回忆...</div>;

  return (
    <div className="container">
      <div className="detail-card">
        <Link to="/timeline" style={{ textDecoration: 'none', color: '#ff6b81', fontSize: '14px' }}>
          ← 返回时间轴
        </Link>
        
        <h2 style={{ marginTop: '15px', color: '#333' }}>{item.title}</h2>
        <p style={{ color: '#999', fontSize: '13px' }}>{item.date}</p>
        
        <div style={{ marginTop: '20px' }}>
          {item.images && item.images.map((pic, index) => (
            <img 
              key={index}
              src={pic} 
              alt="memory" 
              style={{ 
                width: '100%', 
                height: 'auto',     /* 👈 确保图片等比例显示 */
                display: 'block', 
                borderRadius: '12px', 
                marginBottom: '15px' 
              }} 
            />
          ))}
        </div>

        <p style={{ marginTop: '15px', lineHeight: '1.6', color: '#555', whiteSpace: 'pre-wrap' }}>
          {item.content}
        </p>
      </div>
    </div>
  );
}

export default Detail;