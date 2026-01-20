import { Link } from 'react-router-dom';
import homePic from '../assets/home-page.jpg';

function Home() {
  return (
    /* 使用 fixed 定位直接锁定全屏，彻底摆脱父元素的干扰 */
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',    // 强力水平居中
      justifyContent: 'center', // 强力垂直居中
      backgroundColor: '#fff5f6', // 统一背景色
      margin: 0,
      padding: 0,
      zIndex: 9999            // 确保显示在最上层
    }}>
      
      <div style={{ 
        width: '90%', 
        maxWidth: '380px', 
        textAlign: 'center'
      }}>
        
        {/* 1. 心形 */}
        <div style={{ fontSize: '60px', marginBottom: '10px' }}>❤️</div>
        
        {/* 2. 标题 */}
        <h1 style={{ color: '#333', fontSize: '26px', margin: '10px 0', fontWeight: 'bold' }}>
          CP's LOVE Story
        </h1>
        
        {/* 3. 合照 */}
        <div style={{ margin: '20px auto', width: '100%' }}>
          <img 
            src={homePic} 
            alt="Our Story" 
            style={{ 
              width: '100%', 
              borderRadius: '20px', 
              boxShadow: '0 8px 30px rgba(255, 107, 129, 0.2)',
              display: 'block'
            }} 
          />
        </div>

        {/* 4. 文案 */}
        <p style={{ color: '#666', fontSize: '15px', marginBottom: '30px' }}>
          这是独属于我们的回忆!!
        </p>

        {/* 5. 按钮 */}
        <Link to="/timeline" style={{ textDecoration: 'none' }}>
          <button style={{ 
            padding: '12px 50px', 
            fontSize: '16px', 
            borderRadius: '30px', 
            border: 'none', 
            backgroundColor: '#ff6b81', 
            color: 'white', 
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(255, 107, 129, 0.4)',
            cursor: 'pointer'
          }}>
            开启回忆之旅
          </button>
        </Link>
        
      </div>
    </div>
  );
}

export default Home;