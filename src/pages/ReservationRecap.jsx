import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ReservationRecap() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedSeats = [],
    seatCategories = {},
    event = null,
    accommodation = {} // ✅ récupère l’hébergement par catégorie
  } = location.state || {};

  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [holders, setHolders] = useState(
    selectedSeats.map(() => ({ firstName: "", lastName: "" }))
  );

  // ✅ Prix des billets
  const ticketsTotal = selectedSeats.reduce(
    (sum, seat) => sum + (seatCategories[seat.category]?.price || 0),
    0
  );

  // ✅ Prix de l’hébergement (panachage par catégorie)
  let accommodationTotal = 0;
  Object.entries(accommodation).forEach(([catKey, acc]) => {
    if (acc.hotel) accommodationTotal += acc.hotel * 100;
    if (acc.auberge) accommodationTotal += acc.auberge * 30;
  });

  const grandTotal = ticketsTotal + accommodationTotal;

  const handleBuyerChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleHolderChange = (index, field, value) => {
    const updated = [...holders];
    updated[index][field] = value;
    setHolders(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Réservation confirmée :", {
      buyer,
      holders,
      selectedSeats,
      accommodation,
      total: grandTotal,
      event
    });
    alert("Réservation confirmée !");
    navigate("/confirmation", {
      state: {
        buyer,
        holders,
        selectedSeats,
        seatCategories,
        accommodation,
        total: grandTotal,
        event
      }
    });
  };

  if (selectedSeats.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Aucune réservation en cours</h2>
        <p className="mb-4">Veuillez sélectionner vos places avant de réserver.</p>
        <button
          onClick={() => navigate("/evenements")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Retour aux événements
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-4">Récapitulatif de réservation</h2>

      {/* 🔹 Billets détaillés */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-2">Vos billets</h3>
        <ul className="list-disc list-inside text-gray-700">
          {selectedSeats.map((seat, i) => {
            const category = seatCategories[seat.category];
            const catKey = seat.category;

            // Déterminer l’hébergement de ce billet
            let lodging = "Sans hébergement";
            const acc = accommodation[catKey] || { hotel: 0, auberge: 0 };

            // Compter combien de billets de cette catégorie ont déjà été listés
            const alreadyListed = selectedSeats
              .slice(0, i)
              .filter(s => s.category === catKey).length;

            if (alreadyListed < acc.hotel) {
              lodging = "Hôtel partenaire";
            } else if (alreadyListed < acc.hotel + acc.auberge) {
              lodging = "Auberge de jeunesse";
            }

            return (
              <li key={i}>
                🎟️ {category?.name} —{" "}
                {seat.id !== "PASS" ? `Siège ${seat.id}` : "Pass Général"}{" "}
                <span className="ml-2 text-indigo-600 font-semibold">[{lodging}]</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 font-bold">Sous-total billets : {ticketsTotal} €</p>
      </div>

      {/* 🔹 Hébergement résumé */}
      {Object.values(accommodation).some(acc => acc.hotel > 0 || acc.auberge > 0) && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Hébergement</h3>
          {Object.entries(accommodation).map(([catKey, acc]) => {
            if (!acc.hotel && !acc.auberge) return null;
            return (
              <div key={catKey} className="mb-2">
                <h4 className="font-semibold">{seatCategories[catKey]?.name}</h4>
                {acc.hotel > 0 && (
                  <p>{acc.hotel} personne(s) en Hôtel partenaire (+100€/pers)</p>
                )}
                {acc.auberge > 0 && (
                  <p>{acc.auberge} personne(s) en Auberge de jeunesse (+30€/pers)</p>
                )}
              </div>
            );
          })}
          <p className="mt-2 font-bold">Sous-total hébergement : {accommodationTotal} €</p>
        </div>
      )}

      {/* 🔹 Total */}
      <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded">
        <h3 className="text-xl font-bold">Total à payer : {grandTotal} €</h3>
      </div>

      {/* 🔹 Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Vos coordonnées</h3>
          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            value={buyer.name}
            onChange={handleBuyerChange}
            className="border rounded w-full p-2 mb-3"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={buyer.email}
            onChange={handleBuyerChange}
            className="border rounded w-full p-2 mb-3"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            value={buyer.phone}
            onChange={handleBuyerChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Détenteurs des billets</h3>
          {holders.map((holder, i) => {
            const category = seatCategories[selectedSeats[i].category];
            const seat = selectedSeats[i];

            // Déterminer l’hébergement de ce billet
            let lodging = "Sans hébergement";
            const acc = accommodation[seat.category] || { hotel: 0, auberge: 0 };
            const alreadyListed = selectedSeats
              .slice(0, i)
              .filter(s => s.category === seat.category).length;

            if (alreadyListed < acc.hotel) {
              lodging = "Hôtel partenaire";
            } else if (alreadyListed < acc.hotel + acc.auberge) {
              lodging = "Auberge de jeunesse";
            }

            return (
              <div key={i} className="mb-4">
                <p className="font-semibold mb-2">
                  {category?.name} —{" "}
                  {seat.id !== "PASS" ? `Siège ${seat.id}` : "Pass Général"}{" "}
                  <span className="ml-2 text-indigo-600 font-semibold">[{lodging}]</span>
                </p>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={holder.firstName}
                  onChange={(e) =>
                    handleHolderChange(i, "firstName", e.target.value)
                  }
                  className="border rounded w-full p-2 mb-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Nom"
                  value={holder.lastName}
                  onChange={(e) =>
                    handleHolderChange(i, "lastName", e.target.value)
                  }
                  className="border rounded w-full p-2"
                  required
                />
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Confirmer la réservation
        </button>
      </form>
    </div>
  );
}
