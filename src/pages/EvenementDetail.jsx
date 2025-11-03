import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import SeatMap from "../components/SeatMap";

const EVENTS = {
  "symphonie-lyon": {
    title: "Symphonie au cœur de Lyon",
    description: "Un voyage musical unique au cœur de la capitale des Gaules.",
    date: "2026-03-12",
    city: "Lyon",
    type: "Classique",
    capacity: 1200,
    remaining: 450,
    artists: ["Orchestre National de Lyon", "Soliste invité : Clara Dupont"],
    sellingText:
      "Plongez dans l’émotion d’une soirée symphonique exceptionnelle...",
    hasSeatingPlan: true // ✅ plan de salle nécessaire
  },
  "rocknfest-2026": {
    title: "Rock'N Fest 2026",
    description: "Trois jours de rock, têtes d’affiche et talents émergents.",
    date: "2026-09-24",
    city: "Lyon",
    type: "Festival",
    capacity: 5000,
    remaining: 3200,
    artists: ["The Electric Wolves", "Stone Hearts", "DJ Rocka"],
    sellingText: "Préparez-vous à vibrer ! Rock’N Fest revient plus fort...",
    hasSeatingPlan: false // ❌ pas de plan de salle
  },
  "funk-night-fever": {
    title: "Funk Night Fever",
    description: "Soirée funk et groove — DJ et live band.",
    date: "2026-06-05",
    city: "Lyon",
    type: "Club",
    capacity: 800,
    remaining: 200,
    artists: ["DJ Funky Fresh", "Groove Machine Band"],
    sellingText: "Entrez dans la danse ! Funk Night Fever, c’est la promesse...",
    hasSeatingPlan: false // ❌ pas de plan de salle
  }
};

export default function EvenementDetail() {
  const { id } = useParams();
  const event = EVENTS[id];
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatCategories, setSeatCategories] = useState({});

  if (!event) {
    return <div className="p-6">Événement introuvable.</div>;
  }

  const handleReservation = () => {
    if (event.hasSeatingPlan) {
      if (selectedSeats.length === 0) {
        alert("Veuillez sélectionner au moins une place avant de réserver.");
        return;
      }
      navigate("/reservation", {
        state: { selectedSeats, seatCategories, event }
      });
    } else {
      // ✅ Cas placement libre (Pass Général)
      const genericSeat = { id: "PASS", category: "GEN", available: true };
      const genericCategories = {
        GEN: { name: "Pass Général", price: 50, color: "bg-purple-500" }
      };
      navigate("/reservation", {
        state: { selectedSeats: [genericSeat], seatCategories: genericCategories, event }
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* En-tête */}
      <header className="bg-indigo-600 text-white p-6 rounded-lg shadow">
        <h2 className="text-4xl font-bold mb-2">{event.title}</h2>
        <p className="text-lg">{event.description}</p>
        <p className="mt-2 text-sm">
          📅 {event.date} — 📍 {event.city} | {event.type}
        </p>
      </header>

      {/* Infos pratiques */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Capacité & Disponibilités</h3>
          <p className="font-semibold">
            Capacité totale : {event.capacity} places
          </p>
          <p className="font-semibold text-green-600">
            Places restantes : {event.remaining}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Artistes</h3>
          <ul className="list-disc list-inside text-gray-700">
            {event.artists.map((artist, i) => (
              <li key={i}>{artist}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Texte vendeur */}
      <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
        <h3 className="text-xl font-bold mb-2">Pourquoi venir ?</h3>
        <p className="text-gray-700 leading-relaxed">{event.sellingText}</p>
      </section>

      {/* ✅ Plan de salle uniquement si nécessaire */}
      {event.hasSeatingPlan && (
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Plan de salle</h3>
          <SeatMap
            rows={12}
            cols={20}
            onSelectionChange={setSelectedSeats}
            onCategoriesInit={setSeatCategories}
          />
        </section>
      )}

      {/* Bouton réserver */}
      <div className="text-center">
        <button
          onClick={handleReservation}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow"
        >
          Réserver maintenant
        </button>
      </div>
    </div>
  );
}
