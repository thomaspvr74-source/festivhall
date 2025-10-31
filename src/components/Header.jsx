import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-900 to-purple-700 text-white">
      <div className="container-max flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-md">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 12h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 6h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              <path d="M3 18h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
            </svg>
          </div>
          <span className="font-bold text-lg">Festiv'Hall</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          <Link to="/" className="hover:underline">Accueil</Link>
          <Link to="/evenements" className="hover:underline">Événements</Link>
          <Link to="/artistes" className="hover:underline">Artistes</Link>
          <Link to="/privatisation" className="hover:underline">Privatiser</Link>
        </nav>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <details className="relative">
      <summary className="list-none p-2 rounded-md cursor-pointer">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg z-50 overflow-hidden">
        <ul className="flex flex-col">
          <li><Link to="/" className="block px-4 py-2 hover:bg-gray-100">Accueil</Link></li>
          <li><Link to="/evenements" className="block px-4 py-2 hover:bg-gray-100">Événements</Link></li>
          <li><Link to="/artistes" className="block px-4 py-2 hover:bg-gray-100">Artistes</Link></li>
          <li><Link to="/privatisation" className="block px-4 py-2 hover:bg-gray-100">Privatiser</Link></li>
        </ul>
      </div>
    </details>
  );
}
