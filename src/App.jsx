import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Detail from './pages/Detail';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/detail/:id" element={<Route element={<Detail />} />} />
        {/* 上面这一行如果报错，请改成下面这样更简洁的： */}
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}
export default App;