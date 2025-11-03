import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SeatMap from "../components/SeatMap"; // ✅ Plan de salle

export default function Reservation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    selectedSeats = [],
    seatCategories = {},
    event = null
  } = state || {};

  // 🔹 Nouveaux états
  const [extraSeats, setExtraSeats] = useState(0);
  const [newSeats, setNewSeats] = useState([]);
  const [categories, setCategories] = useState(seatCategories);

  // Hébergement (panachage)
  const [hotelCount, setHotelCount] = useState(0);
  const [aubergeCount, setAubergeCount] = useState(0);

  const handleContinue = () => {
    const finalSeats = [...selectedSeats, ...newSeats];

    // Vérification : ne pas dépasser le nombre total de places
    if (hotelCount + aubergeCount > finalSeats.length) {
      alert("Le nombre de personnes en hébergement dépasse le nombre total de places.");
      return;
    }

    navigate("/reservationrecap", {
      state: {
        selectedSeats: finalSeats,
        seatCategories: categories,
        event,
        accommodation: {
          hotel: hotelCount,
          auberge: aubergeCount
        }
      }
    });
  };

  // Cas où aucune donnée n'a été transmise
  if (!event) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Aucune réservation en cours</h2>
        <button
          onClick={() => navigate("/evenements")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Retour aux événements
        </button>
      </div>
    );
  }

  const totalSeats = selectedSeats.length + newSeats.length;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-6">Réservation pour {event.title}</h2>

      {/* 🔹 Cas avec plan de salle */}
      {event.hasSeatingPlan ? (
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <p className="text-gray-700">
            Vous avez sélectionné {selectedSeats.length} place(s).
          </p>

          {/* Menu pour ajouter des places */}
          <div className="flex items-center gap-4">
            <label className="font-semibold">Ajouter des places :</label>
            <select
              className="border rounded px-2 py-1"
              value={extraSeats}
              onChange={(e) => setExtraSeats(parseInt(e.target.value, 10))}
            >
              {[...Array(11).keys()].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Affichage du plan de salle uniquement si extraSeats > 0 */}
          {extraSeats > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">
                Sélectionnez vos {extraSeats} nouvelle(s) place(s) :
              </h3>
              <SeatMap
                rows={12}
                cols={20}
                onSelectionChange={setNewSeats}
                onCategoriesInit={setCategories}
                preselectedSeats={selectedSeats} // ✅ on passe les sièges déjà pris
              />
            </div>
          )}
        </div>
      ) : (
        /* 🔹 Cas sans plan de salle */
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <p className="text-gray-700">
            Cet événement est en placement libre. Vous allez réserver un{" "}
            <strong>Pass Général</strong>.
          </p>

          <div className="flex items-center gap-4">
            <label className="font-semibold">Nombre de pass :</label>
            <select
              className="border rounded px-2 py-1"
              value={selectedSeats.length}
              onChange={(e) => {
                const count = parseInt(e.target.value, 10);
                const genericSeat = { id: "PASS", category: "GEN", available: true };
                const newSeats = Array(count).fill(genericSeat);
                navigate("/reservationrecap", {
                  state: {
                    selectedSeats: newSeats,
                    seatCategories: {
                      GEN: { name: "Pass Général", price: 50, color: "bg-purple-500" }
                    },
                    event
                  }
                });
              }}
            >
              {[...Array(21).keys()].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* 🔹 Card Hébergement */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Options d’hébergement</h3>
        <p className="text-gray-700">
          Vous avez {totalSeats} place(s). Répartissez-les entre hôtel et auberge si vous le souhaitez.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Hôtel */}
          <div className="flex-1">
            <h4 className="font-bold">Hôtel partenaire</h4>
            <p className="text-gray-600 mb-2">+100 € / personne</p>
            <select
              className="border rounded px-2 py-1 w-full"
              value={hotelCount}
              onChange={(e) => setHotelCount(parseInt(e.target.value, 10))}
            >
              {[...Array(totalSeats + 1).keys()].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Auberge */}
          <div className="flex-1">
            <h4 className="font-bold">Auberge de jeunesse</h4>
            <p className="text-gray-600 mb-2">+30 € / personne</p>
            <select
              className="border rounded px-2 py-1 w-full"
              value={aubergeCount}
              onChange={(e) => setAubergeCount(parseInt(e.target.value, 10))}
            >
              {[...Array(totalSeats + 1).keys()].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vérification */}
        {hotelCount + aubergeCount > totalSeats && (
          <p className="text-red-600 font-semibold mt-2">
            ⚠️ Vous ne pouvez pas dépasser {totalSeats} personnes au total.
          </p>
        )}
      </div>

      {/* Bouton continuer */}
      <div className="text-center">
        <button
          onClick={handleContinue}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
