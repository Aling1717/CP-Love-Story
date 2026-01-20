import { Link } from 'react-router-dom';
import homePic from '../assets/home-page.jpg';

function Home() {
  return (
    <div className="container">
      <div className="home-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* 1. 最顶部的爱心 */}
        <div className="heart" style={{ fontSize: '50px', marginBottom: '10px' }}>❤️</div>
        
        {/* 2. 标题 */}
        <h1 style={{ margin: '10px 0', fontSize: '28px' }}>CP's LOVE Story</h1>
        
        {/* 3. 照片：现在挪到了标题下面 */}
        <div style={{ width: '85%', maxWidth: '320px', margin: '15px auto' }}>
          <img 
            src={homePic} 
            alt="Our Story" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '20px', 
              boxShadow: '0 10px 25px rgba(255, 107, 129, 0.2)' 
            }} 
          />
        </div>

        {/* 4. 副标题 */}
        <p className="subtitle" style={{ color: '#666', marginBottom: '25px', fontSize: '16px' }}>
          这是独属于我们的回忆!!
        </p>

        {/* 5. 按钮 */}
        <Link to="/timeline">
          <button className="main-btn" style={{ 
            padding: '12px 35px', 
            fontSize: '16px', 
            borderRadius: '25px', 
            border: 'none', 
            backgroundColor: '#ff6b81', 
            color: 'white', 
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