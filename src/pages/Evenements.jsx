import { Link } from 'react-router-dom';
import './Evenements.css';

const EVENTS = [
  { 
    id: 'symphonie-lyon', 
    title: 'Symphonie au cœur de Lyon', 
    date: '2026-03-12', 
    city: 'Lyon', 
    type: 'Classique', 
    description: 'Orchestre symphonique & solistes — une soirée inoubliable.',
    image: import.meta.env.BASE_URL + 'symphonie-lyon.png'
  },
  { 
    id: 'rocknfest-2026', 
    title: "Rock'N Fest 2026", 
    date: '2026-09-24', 
    city: 'Lyon', 
    type: 'Festival', 
    description: 'Trois jours de rock, têtes d’affiche et talents émergents.',
    image: import.meta.env.BASE_URL + 'rocknfest.png'
  },
  { 
    id: 'funk-night-fever', 
    title: 'Funk Night Fever', 
    date: '2026-06-05', 
    city: 'Lyon', 
    type: 'Club', 
    description: 'Soirée funk et groove — DJ et live band.',
    image: import.meta.env.BASE_URL + 'funk-night.png'
  },
];

export default function Evenements() {
  return (
    <div className="evenements-page">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-white">Événements à venir</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {EVENTS.map((ev) => (
            <article 
              key={ev.id} 
              className="event-card bg-white rounded-lg shadow overflow-hidden flex flex-col"
            >
              <div className="image-wrapper">
                <img src={ev.image} alt={ev.title} className="event-image" />
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold">{ev.title}</h3>
                <p className="text-sm text-gray-600">{ev.date} — {ev.city}</p>
                <p className="mt-2 text-gray-700 text-sm flex-grow">{ev.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Link 
                    to={`/evenements/${ev.id}`} 
                    className="text-indigo-600 font-medium"
                  >
                    Voir plus
                  </Link>
                  <span className="text-xs px-2 py-1 rounded">
                    {ev.type}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
