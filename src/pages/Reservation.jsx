import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SeatMap from "../components/SeatMap"; // ✅ Plan de salle
import "./Reservation.css";

export default function Reservation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    selectedSeats = [],
    seatCategories = {},
    event = null
  } = state || {};

  // 🔹 États pour plan de salle
  const [extraSeats, setExtraSeats] = useState(0);
  const [newSeats, setNewSeats] = useState([]);
  const [categories, setCategories] = useState(seatCategories);

  // 🔹 Hébergement par catégorie
  const [accommodation, setAccommodation] = useState({});

  // 🔹 États pour placement libre (multi-pass)
  const [generalCount, setGeneralCount] = useState(0);
  const [vipCount, setVipCount] = useState(0);

  const handleContinue = () => {
    let finalSeats = [...selectedSeats, ...newSeats];
    let finalCategories = { ...categories };

    // Cas placement libre
    if (!event.hasSeatingPlan) {
      const genSeat = { id: "GEN", category: "GEN", available: true };
      const vipSeat = { id: "VIP", category: "VIP", available: true };

      finalSeats = [
        ...Array(generalCount).fill(genSeat),
        ...Array(vipCount).fill(vipSeat)
      ];

      finalCategories = {
        GEN: { name: "Pass Général", price: 50, color: "bg-purple-500" },
        VIP: { name: "Pass VIP", price: 80, color: "bg-yellow-500" }
      };
    }

    // Vérification hébergement
    for (const catKey of Object.keys(accommodation)) {
      const totalCatSeats = finalSeats.filter(s => s.category === catKey).length;
      const acc = accommodation[catKey] || { hotel: 0, auberge: 0 };
      if (acc.hotel + acc.auberge > totalCatSeats) {
        alert(
          `Le nombre de personnes en hébergement dépasse le total pour la catégorie ${finalCategories[catKey]?.name}`
        );
        return;
      }
    }

    navigate("/reservationrecap", {
      state: {
        selectedSeats: finalSeats,
        seatCategories: finalCategories,
        event,
        accommodation
      }
    });
  };

  // Cas où aucune donnée n'a été transmise
  if (!event) {
    return (
      <div className="reservation-page min-h-screen flex items-center justify-center p-6">
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Aucune réservation en cours</h2>
          <button
            onClick={() => navigate("/evenements")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Retour aux événements
          </button>
        </div>
      </div>
    );
  }

  const totalSeats = selectedSeats.length + newSeats.length;
  const totalPasses = generalCount + vipCount;

  // Fonction utilitaire pour générer une carte hébergement
  const renderAccommodationCard = (catKey, catName, totalCatSeats) => {
    if (totalCatSeats === 0) return null;
    const current = accommodation[catKey] || { hotel: 0, auberge: 0 };

    return (
      <div key={catKey} className="border rounded p-4 mb-4">
        <h4 className="font-bold mb-2">{catName} ({totalCatSeats} billet(s))</h4>
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
            <label className="block font-semibold">Auberge de jeunesse (+30€/pers)</label>
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
        {current.hotel + current.auberge > totalCatSeats && (
          <p className="text-red-600 font-semibold mt-2">
            ⚠️ Vous ne pouvez pas dépasser {totalCatSeats} personnes pour {catName}.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="reservation-page min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-8 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
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
                  capacity={1500}
                  reservedSeats={event.reservedSeats || []}
                  preselectedSeats={selectedSeats}
                  onSelectionChange={setNewSeats}
                  onCategoriesInit={setCategories}
                />
              </div>
            )}
          </div>
        ) : (
          /* 🔹 Cas sans plan de salle (multi-pass) */
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <p className="text-gray-700">
              Cet événement est en placement libre. Choisissez vos pass :
            </p>

            {/* Choix du nombre de Pass Général */}
            <div className="flex items-center gap-4">
              <label className="font-semibold">Pass Général (50€) :</label>
              <select
                className="border rounded px-2 py-1"
                value={generalCount}
                onChange={(e) => setGeneralCount(parseInt(e.target.value, 10))}
              >
                {[...Array(21).keys()].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Choix du nombre de Pass VIP */}
            <div className="flex items-center gap-4">
              <label className="font-semibold">Pass VIP (80€) :</label>
              <select
                className="border rounded px-2 py-1"
                value={vipCount}
                onChange={(e) => setVipCount(parseInt(e.target.value, 10))}
              >
                {[...Array(21).keys()].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        )}

                {/* 🔹 Hébergement par catégorie */}
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h3 className="text-xl font-semibold mb-4">Options d’hébergement par catégorie</h3>
          <p className="text-gray-700">
            Vous avez {event.hasSeatingPlan ? totalSeats : totalPasses} place(s). Répartissez-les par catégorie entre hôtel et auberge de jeunesse.
          </p>

          {/* Carte Billets OR */}
          {renderAccommodationCard(
            "VIP",
            "Billets OR",
            event.hasSeatingPlan
              ? [...selectedSeats, ...newSeats].filter(s => s.category === "VIP").length
              : vipCount
          )}

          {/* Carte Billets Standard+ */}
          {renderAccommodationCard(
            "STANDARD_PLUS",
            "Billets Standard+",
            event.hasSeatingPlan
              ? [...selectedSeats, ...newSeats].filter(s => s.category === "STANDARD_PLUS").length
              : 0
          )}

          {/* Carte Billets Standard */}
          {renderAccommodationCard(
            "STANDARD",
            "Billets Standard",
            event.hasSeatingPlan
              ? [...selectedSeats, ...newSeats].filter(s => s.category === "STANDARD").length
              : generalCount
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
    </div>
  );
}
