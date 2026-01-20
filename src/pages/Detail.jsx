import { useParams, Link } from 'react-router-dom';

// 1. 严格检查 assets 文件夹中的文件名和后缀（必须与本地完全一致）
import yyh1 from '../assets/yyh1.jpg';
import yyh2 from '../assets/yyh2.jpg';
import yyh3 from '../assets/yyh3.jpg';
import yyh4 from '../assets/yyh4.jpg';

import dsn1 from '../assets/dsn1.jpg';
import dsn2 from '../assets/dsn2.jpg';
import dsn3 from '../assets/dsn3.jpg';
import dsn4 from '../assets/dsn4.jpg';

function Detail() {
  // useParams 必须在组件函数的最顶部调用
  const { id } = useParams();

  const detailData = {
    'yyh': {
      title: '杭州亚运会',
      date: '2023-10-02',
      content: '和小猪宝贝去看了亚运会 晚上还在市内city walk ',
      imagesWithNote: [
        { url: yyh1, note: '在场馆看比赛！有一个跳高的特别厉害！' },
        { url: yyh2, note: '我们刮刮乐刮到了180' },
        { url: yyh3, note: '' },
        { url: yyh4, note: 'city walk~' }
      ]
    },
    'dsn': {
      title: '第一次上海迪士尼',
      date: '2024-01-15',
      content: '我们第一次去迪士尼！',
      imagesWithNote: [
        { url: dsn1, note: '排队前的超大唐老鸭'},
        { url: dsn2, note: '尼克狐尼克！'},
        { url: dsn3, note: '小兔子朱迪！'},
        { url: dsn4, note: '呜呜呜呜呜大猪猪吃完晚饭困困睡着了~'}
      ] 
    }
  };

  const item = detailData[id];

  // 错误处理：如果 ID 不匹配则显示提示
  if (!item) {
    return (
      <div className="container">
        <div className="detail-card" style={{ textAlign: 'center' }}>
          <h3>找不到这段回忆...</h3>
          <Link to="/timeline" style={{ color: '#ff6b81' }}>返回时间轴</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="detail-card">
        {/* 顶部返回链接 */}
        <Link to="/timeline" style={{ textDecoration: 'none', color: '#ff6b81', fontSize: '14px', display: 'inline-block' }}>
          ← 返回时间轴
        </Link>
        
        <h2 style={{ marginTop: '15px', color: '#333' }}>{item.title}</h2>
        <p style={{ color: '#999', fontSize: '13px', marginBottom: '10px' }}>{item.date}</p>
        
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

        {/* 图片与批注渲染列表 */}
        <div style={{ marginTop: '10px' }}>
          {item.imagesWithNote && item.imagesWithNote.map((imgObj, index) => (
            <div key={index} style={{ marginBottom: '25px', textAlign: 'center' }}>
              <img 
                src={imgObj.url} 
                alt={`memory-${index}`} 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }} 
              />
              {imgObj.note && (
                <p style={{ 
                  marginTop: '10px', 
                  fontSize: '14px', 
                  color: '#888', 
                  fontStyle: 'italic',
                  padding: '0 10px' 
                }}>
                  {imgObj.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* 底部返回链接 */}
        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
          <Link to="/timeline" style={{ textDecoration: 'none', color: '#ff6b81', fontSize: '14px', fontWeight: 'bold' }}>
            ← 返回时间轴
          </Link>
        </div>
      </div>
      
      {/* 底部留白，防止内容被遮挡 */}
      <div style={{ height: '40px' }}></div>
    </div>
  );
}

export default Detail;