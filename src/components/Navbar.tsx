import { NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 py-5 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-8 flex items-center justify-between">
      <NavLink to="/" className="text-white font-bold text-base tracking-widest">
        LB
      </NavLink>
      <div className="flex items-center gap-10">
        <button
          onClick={() => scrollToSection('about')}
          className="text-xs font-medium text-gray-500 hover:text-white transition-colors tracking-widest uppercase cursor-pointer"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          About
        </button>
        <button
          onClick={() => scrollToSection('connect')}
          className="text-xs font-medium text-gray-500 hover:text-white transition-colors tracking-widest uppercase cursor-pointer"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Connect
        </button>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `text-xs font-medium transition-colors tracking-widest uppercase ${
              isActive ? 'text-white' : 'text-gray-500 hover:text-white'
            }`
          }
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Blog
        </NavLink>
        
      </div>
      </div>
    </nav>
  );
}
