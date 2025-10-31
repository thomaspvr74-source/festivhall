import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative">
        <div
          className="h-[64vh] lg:h-screen bg-cover bg-center hero-image"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506152983158-3f84b6b3b9c4?q=80&auto=format&fit=crop&w=1600&h=900')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-16 lg:py-32 text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Festiv'Hall — La halle modulable de Lyon
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-100 max-w-2xl">
              17 000 m² sans pilier, 11 000 m² exploitables. Capacité modulable de 3 000 à 17 000 personnes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/evenements"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-semibold transition"
              >
                Voir les événements
              </Link>
              <Link
                to="/privatisation"
                className="inline-block border border-white/40 hover:bg-white/10 text-white px-6 py-3 rounded-md transition"
              >
                Privatiser la salle
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-200 max-w-md">
              <div>
                <div className="font-bold text-xl">17 000 m²</div>
                <div className="text-gray-300">Surface totale</div>
              </div>
              <div>
                <div className="font-bold text-xl">11 000 m²</div>
                <div className="text-gray-300">Exploitables</div>
              </div>
              <div>
                <div className="font-bold text-xl">3 000–17 000</div>
                <div className="text-gray-300">Capacité modulable</div>
              </div>
              <div>
                <div className="font-bold text-xl">Sans pilier</div>
                <div className="text-gray-300">Grande visibilité</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg">Événements</h3>
            <p className="mt-2 text-sm text-gray-600">Programmation variée toute l'année.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg">Privatisations</h3>
            <p className="mt-2 text-sm text-gray-600">Formules sur-mesure pour entreprises et soirées privées.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg">Artistes</h3>
            <p className="mt-2 text-sm text-gray-600">Accueillons talents locaux et têtes d’affiche.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
