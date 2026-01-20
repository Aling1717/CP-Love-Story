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
      imagesWithNote: [
        { url: yyh1, note: '在场馆看比赛！有一个跳高的特别厉害！' },
        { url: yyh2, note: '我们刮刮乐刮到了180' },
        { url: yyh3, note: '' },
        { url: yyh4, note: 'city walk~' }
      ]
    },
    '2': {
      title: '第一次上海迪士尼',
      date: '2024-01-15',
      content: '嘿嘿宝贝我还没做这个嘻嘻嘻嘻嘻',
       imagesWithNote: [
        
       ] 
    }
  };

  const item = detailData[id];
  if (!item) return <div className="container">找不到这段回忆...</div>;

  return (
    <div className="container">
      <div className="detail-card">
        {/* --- 顶部的返回按钮 --- */}
        <Link to="/timeline" style={{ textDecoration: 'none', color: '#ff6b81', fontSize: '14px', display: 'inline-block' }}>
          ← 返回时间轴
        </Link>
        
        <h2 style={{ marginTop: '15px', color: '#333' }}>{item.title}</h2>
        <p style={{ color: '#999', fontSize: '13px', marginBottom: '10px' }}>{item.date}</p>
        
        {/* 1. 先显示文字内容 */}
        <p style={{ 
          marginTop: '15px', 
          marginBottom: '20px', 
          lineHeight: '1.6', 
          color: '#555', 
          whiteSpace: 'pre-wrap',
          textAlign: 'left' 
        }}>
          {item.content}
        </p>

        {/* 2. 中间显示图片列表 */}
        <div style={{ marginTop: '10px' }}>
          {item.images && item.images.map((pic, index) => (
            <img 
              key={index}
              src={pic} 
              alt="memory" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'block', 
                borderRadius: '12px', 
                marginBottom: '15px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }} 
            />
          ))}
        </div>

        {/* --- 底部的返回按钮 --- */}
        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
          <Link to="/timeline" style={{ textDecoration: 'none', color: '#ff6b81', fontSize: '14px', fontWeight: 'bold' }}>
            ← 返回时间轴
          </Link>
        </div>
      </div>
      
      {/* 底部额外留白，防止手机底栏遮挡 */}
      <div style={{ height: '40px' }}></div>
    </div>
  );
}

export default Detail;