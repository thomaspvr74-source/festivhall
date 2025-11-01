import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header id="site-header" className="fixed top-0 left-0 w-full z-50 bg-black/70 text-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo + Burger */}
        <div className="flex items-center gap-4">
          {/* Burger */}
          <div
            className="w-8 h-8 flex flex-col justify-center gap-1 cursor-pointer"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <span className="block h-1 bg-white rounded"></span>
            <span className="block h-1 bg-white rounded"></span>
            <span className="block h-1 bg-white rounded"></span>
          </div>

          {/* Nom du projet */}
          <span className="font-bold text-lg">Festiv'Hall</span>
        </div>

        {/* Navigation classique à droite */}
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-indigo-400">Accueil</Link>
          <Link to="/evenements" className="hover:text-indigo-400">Événements</Link>
          <Link to="/artistes" className="hover:text-indigo-400">Artistes</Link>
          <Link to="/privatisation" className="hover:text-indigo-400">Privatiser</Link>
        </nav>
      </div>

      {/* Sidebar latéral */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/90 text-white transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="p-6 flex flex-col gap-6">
          <Link to="/" className="hover:text-indigo-400">Accueil</Link>
          <Link to="/evenements" className="hover:text-indigo-400">Événements</Link>
          <Link to="/artistes" className="hover:text-indigo-400">Artistes</Link>
          <Link to="/privatisation" className="hover:text-indigo-400">Privatiser</Link>
        </div>
      </div>
    </header>
  );
}
