import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col page-bg">
      {/* HERO SECTION */}
      <section className="relative h-[64vh] lg:h-screen overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>

        <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
          <div className="max-w-4xl text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight animate-slideDown">
              Festiv'Hall — La halle modulable de Lyon
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto animate-fadeInSlow">
              17 000 m² sans pilier, 11 000 m² exploitables. Capacité modulable de 3 000 à 17 000 personnes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/evenements"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-semibold transition transform hover:scale-105"
              >
                Voir les événements
              </Link>
              <Link
                to="/privatisation"
                className="inline-block border border-white/40 hover:bg-white/10 text-white px-6 py-3 rounded-md transition transform hover:scale-105"
              >
                Privatiser la salle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION INFOS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex-shrink-0">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg">Événements</h3>
            <p className="mt-2 text-sm text-gray-800">Programmation variée toute l'année.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg">Privatisations</h3>
            <p className="mt-2 text-sm text-gray-800">Formules sur-mesure pour entreprises et soirées privées.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg">Artistes</h3>
            <p className="mt-2 text-sm text-gray-800">Accueillons talents locaux et têtes d’affiche.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
