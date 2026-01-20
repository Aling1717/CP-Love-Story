import { useParams, Link } from 'react-router-dom';

// 引入你的四张照片
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
    /* 这里的 container 在你的 App.css 中应该设置了 min-height: 100vh */
    <div className="container" style={{ overflowY: 'auto', display: 'block' }}>
      <div className="detail-card" style={{ 
        width: '90%', 
        maxWidth: '500px', 
        margin: '20px auto', 
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <Link to="/timeline" className="back-btn" style={{ textDecoration: 'none', color: '#ff6b81', display: 'block', marginBottom: '15px' }}>
          ← 返回时间轴
        </Link>
        
        <h2 style={{ fontSize: '24px', color: '#333' }}>{item.title}</h2>
        <p style={{ color: '#999', fontSize: '14px', marginBottom: '20px' }}>{item.date}</p>
        
        <div className="image-list" style={{ width: '100%' }}>
          {item.images && item.images.map((pic, index) => (
            <div key={index} style={{ width: '100%', marginBottom: '15px' }}>
              <img 
                src={pic} 
                alt={`memory-${index}`} 
                style={{ 
                  width: '100%', 
                  height: 'auto',      /* 👈 关键：确保高度随宽度自适应 */
                  display: 'block',    /* 👈 关键：防止行内间隙 */
                  borderRadius: '15px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }} 
              />
            </div>
          ))}
        </div>

        <p style={{ 
          marginTop: '20px', 
          lineHeight: '1.8', 
          color: '#555', 
          fontSize: '16px',
          wordWrap: 'break-word' /* 👈 关键：防止长文字撑破布局 */
        }}>
          {item.content}
        </p>
      </div>
      
      {/* 底部垫高，防止最后一张图被手机底栏遮挡 */}
      <div style={{ height: '50px' }}></div>
    </div>
  );
}

export default Detail;