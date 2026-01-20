import { useParams, Link } from 'react-router-dom';

// 引入 assets 文件夹中的四张亚运会照片
import yyh1 from '../assets/yyh1.jpg';
import yyh2 from '../assets/yyh2.jpg';
import yyh3 from '../assets/yyh3.jpg';
import yyh4 from '../assets/yyh4.jpg';
// 迪士尼照片暂时不引入
// import disneyPic from '../assets/disney.jpg'; 

function Detail() {
  const { id } = useParams();

  const detailData = {
    'yyh': {
      title: '杭州亚运会',
      date: '2023-10-02',
      content: '第一次和小猪宝贝出去玩 去看了亚运会 晚上还在市内city walk ',
      images: [yyh3, yyh4] 
    },
    '2': {
      title: '第一次上海迪士尼',
      date: '2024-01-15',
      content: '在童话世界里的一天。',
      images: [] 
    }
  };

  const item = detailData[id];

  // 安全检查：如果 id 不匹配则返回提示
  if (!item) return <div className="container">找不到这段回忆...</div>;

  return (
    <div className="container">
      <div className="detail-card">
        <Link to="/timeline" className="back-btn" style={{ textDecoration: 'none', color: '#ff6b81' }}>← 返回</Link>
        <h2 style={{ marginTop: '10px' }}>{item.title}</h2>
        <p style={{ color: '#999', fontSize: '14px' }}>{item.date}</p>
        
        <div style={{ marginTop: '20px' }}>
          {/* 自动循环显示所有照片 */}
          {item.images.map((pic, index) => (
            <img 
              key={index}
              src={pic} 
              alt={`memory-${index}`} 
              loading="lazy" /* 优化加载，防止卡顿 */
              style={{ 
                width: '100%', 
                minHeight: '200px',
                height: 'auto',      /* 👈 强制高度自适应，防止图片被切断 */
                display: 'block',    /* 👈 消除图片底部间隙 */
                borderRadius: '15px', 
                marginBottom: '15px', 
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                backgroundColor: '#f0f0f0'
              }} 
            />
          ))}
        </div>

        <p style={{ marginTop: '10px', lineHeight: '1.8', color: '#555' }}>
          {item.content}
        </p>
      </div>
    </div>
  );
}

export default Detail;