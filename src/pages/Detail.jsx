import { useParams, Link } from 'react-router-dom';

// 1. 严格检查 assets 文件夹中的文件名和后缀（必须与本地完全一致）
import yyh1 from '../assets/yyh1.jpg';
import yyh2 from '../assets/yyh2.jpg';
import yyh3 from '../assets/yyh3.jpg';
import yyh4 from '../assets/yyh4.jpg';

import disney1 from '../assets/disney1.jpg';
import disney2 from '../assets/disney2.jpg';
import disney3 from '../assets/disney3.jpg';
import disney4 from '../assets/disney4.jpg';

import sh24_2_1 from '../assets/sh24_2_1.jpg';
import sh24_2_2 from '../assets/sh24_2_2.jpg';
import sh24_2_3 from '../assets/sh24_2_3.jpg';
import sh24_2_4 from '../assets/sh24_2_4.jpg';

function Detail() {
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

    'disney': {
      title: '第一次上海迪士尼',
      date: '2024-01-15',
      content: '我们第一次去迪士尼！',
      imagesWithNote: [
        { url: disney1, note: '排队前的超大唐老鸭'},
        { url: disney2, note: '尼克狐尼克！'},
        { url: disney3, note: '小兔子朱迪！'},
        { url: disney4, note: '呜呜呜呜呜大猪猪吃完晚饭困困睡着了~'}
      ] 
    },
    
    'sh24_2': {
      title: '和朋友上海+杭州',
      date: '2024-02',
      content: '逛逛逛！',
      imagesWithNote: [
        { url: sh24_2_1, note: '给小猪拍了广角大片！'},
        { url: sh24_2_2, note: '迷雾飘散的上海夜景'},
        { url: sh24_2_3, note: '超大泡泡玛特'},
        { url: sh24_2_4, note: '小猪和网红合照~'}
      ] 
    }
  };

  const item = detailData[id];

  // 错误处理：如果 ID 不匹配则显示提示
  if (!item) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <div className="detail-card" style={{ textAlign: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '20px', width: '100%', maxWidth: '500px' }}>
          <h3>找不到这段回忆...</h3>
          <Link to="/timeline" style={{ color: '#ff6b81' }}>返回时间轴</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#fff5f6', // 统一粉色背景
      padding: '20px 0'
    }}>
      <div className="detail-card" style={{ 
        width: '90%',               // 移动端宽度
        maxWidth: '500px',          // 桌面端最大宽度
        minWidth: '320px',          // 核心修复：即使内容少，也强制保持最小宽度
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '20px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        boxSizing: 'border-box'
      }}>
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
                  width: '100%',        // 图片撑满卡片
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
      
      {/* 底部留白 */}
      <div style={{ height: '40px' }}></div>
    </div>
  );
}

export default Detail;