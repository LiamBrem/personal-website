import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
