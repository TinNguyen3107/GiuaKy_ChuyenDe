import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', backgroundColor: '#eee', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Trang chủ</Link>
        <Link to="/about">Thông tin cá nhân</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;