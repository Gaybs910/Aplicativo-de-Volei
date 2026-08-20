import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `font-display text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-md transition-colors ${
    isActive ? 'bg-ball-blue text-chalk' : 'text-chalk/70 hover:bg-arena-800 hover:text-chalk'
  }`;

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-arena-700 bg-arena-950/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-3 md:px-10">
        <span className="mr-6 font-display text-xl font-bold tracking-wide text-ball-yellow">5×1</span>
        <NavLink to="/tactical" className={linkClass}>
          Prancheta Tática
        </NavLink>
        <NavLink to="/aprender" className={linkClass}>
          Aprender
        </NavLink>
        <NavLink to="/jogadas" className={linkClass}>
          Jogadas
        </NavLink>
      </nav>
    </header>
  );
}
