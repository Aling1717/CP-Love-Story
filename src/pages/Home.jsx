import { Link } from 'react-router-dom';
// 1. 确保 assets 文件夹里有 home-page.jpg
import homePic from '../assets/home-page.jpg';

function Home() {
  return (
    <div className="container">
      {/* 使用 home-content 包裹，配合 App.css 的 align-items: center 实现水平居中 */}
      <div className="home-content" style={{ display: 'flex', flexDirection: 'column', alignItems: center }}>
        
        <div className="heart" style={{ fontSize: '50px', marginBottom: '10px' }}>❤️</div>
        
        <h1 style={{ margin: '10px 0' }}>CP's LOVE Story</h1>
        
        <p className="subtitle" style={{ color: '#666', marginBottom: '20px' }}>
          这是独属于我们的回忆!!
        </p>

        {/* 2. 插入你的首页照片 */}
        <div style={{ width: '85%', maxWidth: '320px', margin: '0 auto 30px auto' }}>
          <img 
            src={homePic} 
            alt="Our Story" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '20px', 
              boxShadow: '0 10px 25px rgba(255, 107, 129, 0.2)' /* 粉色系的阴影 */
            }} 
          />
        </div>

        <Link to="/timeline">
          <button className="main-btn" style={{ 
            padding: '12px 30px', 
            fontSize: '16px', 
            borderRadius: '25px', 
            border: 'none', 
            backgroundColor: '#ff6b81', 
            color: 'white', 
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 107, 129, 0.3)'
          }}>
            开启回忆之旅
          </button>
        </Link>
        
      </div>
    </div>
  );
}

export default Home;