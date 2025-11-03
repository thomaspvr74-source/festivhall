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

  // Hébergement par catégorie
  const [accommodation, setAccommodation] = useState({});

  const handleContinue = () => {
    const finalSeats = [...selectedSeats, ...newSeats];

    // Vérification : ne pas dépasser le nombre de places par catégorie
    for (const catKey of Object.keys(accommodation)) {
      const totalCatSeats = finalSeats.filter(s => s.category === catKey).length;
      const acc = accommodation[catKey] || { hotel: 0, auberge: 0 };
      if (acc.hotel + acc.auberge > totalCatSeats) {
        alert(`Le nombre de personnes en hébergement dépasse le total pour la catégorie ${categories[catKey]?.name}`);
        return;
      }
    }

    navigate("/reservationrecap", {
      state: {
        selectedSeats: finalSeats,
        seatCategories: categories,
        event,
        accommodation
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

      {/* 🔹 Card Hébergement par catégorie */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Options d’hébergement par catégorie</h3>
        <p className="text-gray-700">
          Vous avez {totalSeats} place(s). Répartissez-les par catégorie entre hôtel et auberge.
        </p>

        {Object.entries(categories).map(([catKey, cat]) => {
          const totalCatSeats = [...selectedSeats, ...newSeats].filter(s => s.category === catKey).length;
          if (totalCatSeats === 0) return null;

          const current = accommodation[catKey] || { hotel: 0, auberge: 0 };

          return (
            <div key={catKey} className="border rounded p-4 mb-4">
              <h4 className="font-bold mb-2">{cat.name} ({totalCatSeats} billet(s))</h4>

              <div className="flex gap-6">
                {/* Hôtel */}
                <div className="flex-1">
                  <label className="block font-semibold">Hôtel (+100€/pers)</label>
                  <select
                    className="border rounded px-2 py-1 w-full"
                    value={current.hotel}
                    onChange={(e) => {
                      const count = parseInt(e.target.value, 10);
                      setAccommodation(prev => ({
                        ...prev,
                        [catKey]: { ...current, hotel: count }
                      }));
                    }}
                  >
                    {[...Array(totalCatSeats + 1).keys()].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Auberge */}
                <div className="flex-1">
                  <label className="block font-semibold">Auberge (+30€/pers)</label>
                  <select
                    className="border rounded px-2 py-1 w-full"
                    value={current.auberge}
                    onChange={(e) => {
                      const count = parseInt(e.target.value, 10);
                      setAccommodation(prev => ({
                        ...prev,
                        [catKey]: { ...current, auberge: count }
                      }));
                    }}
                  >
                    {[...Array(totalCatSeats + 1).keys()].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vérification */}
              {current.hotel + current.auberge > totalCatSeats && (
                <p className="text-red-600 font-semibold mt-2">
                  ⚠️ Vous ne pouvez pas dépasser {totalCatSeats} personnes pour {cat.name}.
                </p>
              )}
            </div>
          );
        })}
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
