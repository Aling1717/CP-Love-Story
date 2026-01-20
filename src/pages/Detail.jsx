import { useParams, Link } from 'react-router-dom';

// 第一步：引入 (名字必须和 assets 里的 yyh1.jpg 等完全对应)
import yyh1 from '../assets/yyh1.jpg';
import yyh2 from '../assets/yyh2.jpg';
import yyh3 from '../assets/yyh3.jpg';
// 注意：如果你还没有上传 disney.jpg，请先注释掉下面这一行，或者确保文件名正确
//import disneyPic from '../assets/disney.jpg'; 

function Detail() {
  const { id } = useParams();

  const detailData = {
    '1': {
      title: '杭州亚运会',
      date: '2023-10-02',
      content: '那是我们第一次一起看这么盛大的比赛，三张照片都是最美的回忆。',
      images: [yyh1, yyh2, yyh3] // 👈 使用上面引入的变量名
    },
    '2': {
      title: '第一次上海迪士尼',
      date: '2024-01-15',
      content: '在童话世界里的一天。',
      images: [disneyPic] 
    }
  };

  const item = detailData[id];
  if (!item) return <div className="container">找不到这段回忆...</div>;

  return (
    <div className="container">
      <div className="detail-card">
        <Link to="/timeline" className="back-btn" style={{ textDecoration: 'none', color: '#ff6b81' }}>← 返回</Link>
        <h2 style={{ marginTop: '10px' }}>{item.title}</h2>
        <p style={{ color: '#999', fontSize: '14px' }}>{item.date}</p>
        
        <div style={{ marginTop: '20px' }}>
          {/* 这里是自动循环显示数组里的所有图片 */}
          {item.images.map((pic, index) => (
            <img 
              key={index}
              src={pic} 
              alt="memory" 
              style={{ width: '100%', borderRadius: '15px', marginBottom: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} 
            />
          ))}
        </div>

        <p style={{ marginTop: '10px', lineHeight: '1.8' }}>{item.content}</p>
      </div>
    </div>
  );
}

export default Detail;