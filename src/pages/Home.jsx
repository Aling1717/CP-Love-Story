import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <div className="heart" style={{ fontSize: '50px', textAlign: 'center' }}>❤️</div>
      <h1 style={{ textAlign: 'center' }}>CP's LOVE Story</h1>
      <p className="subtitle" style={{ textAlign: 'center' }}>这里记录了我们一起走过的所有时光</p>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/timeline">
          <button className="main-btn">开启回忆之旅</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;