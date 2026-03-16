import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-center gap-8 pt-10">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors duration-150 ${
            isActive ? 'text-slate-100' : 'text-slate-500 hover:text-slate-100'
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/blog"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors duration-150 ${
            isActive ? 'text-slate-100' : 'text-slate-500 hover:text-slate-100'
          }`
        }
      >
        Blog
      </NavLink>
    </nav>
  );
}
