import { useState, useEffect } from "react";

export default function SeatMap({
  rows = 12,
  cols = 20,
  onSelectionChange,
  onCategoriesInit,
  preselectedSeats = [] // ✅ nouvelles places déjà choisies
}) {
  const seatCategories = {
    A: { name: "Carré Or", price: 80, color: "bg-yellow-400" },
    B: { name: "Catégorie 1", price: 60, color: "bg-green-500" },
    C: { name: "Catégorie 2", price: 40, color: "bg-blue-500" }
  };

  const getCategory = (row) => {
    if (row < 3) return "A";
    if (row < 7) return "B";
    return "C";
  };

  const generateSeats = () => {
    return Array.from({ length: rows }).map((_, row) =>
      Array.from({ length: cols }).map((_, col) => ({
        id: `${row}-${col}`,
        row,
        col,
        category: getCategory(row),
        available: Math.random() > 0.2
      }))
    );
  };

  const [seats] = useState(generateSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    onCategoriesInit?.(seatCategories);
  }, []);

  useEffect(() => {
    onSelectionChange?.(selectedSeats);
  }, [selectedSeats]);

  // Vérifie si un siège est déjà pré‑sélectionné
  const isPreselected = (seatId) =>
    preselectedSeats.some((s) => s.id === seatId);

  const toggleSeat = (seat) => {
    if (!seat.available) return;
    if (isPreselected(seat.id)) return; // ✅ on bloque les pré‑sélectionnés

    setSelectedSeats((prev) =>
      prev.find((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + seatCategories[seat.category].price,
    0
  );

  return (
    <div>
      <div className="w-full bg-gray-800 text-white text-center py-2 mb-4 rounded">
        🎤 Scène
      </div>

      <div
        className="grid gap-1 justify-center"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {seats.flat().map((seat) => {
          const isSelected = selectedSeats.some((s) => s.id === seat.id);
          const preselected = isPreselected(seat.id);

          let color = seatCategories[seat.category].color;
          if (!seat.available) color = "bg-gray-400 cursor-not-allowed";
          if (isSelected) color = "bg-red-500";
          if (preselected) color = "bg-red-700 cursor-not-allowed"; // ✅ rouge foncé pour pré‑sélection

          return (
            <div
              key={seat.id}
              onClick={() => toggleSeat(seat)}
              className={`w-6 h-6 rounded ${color}`}
              title={`Siège ${seat.id} — ${seatCategories[seat.category].name} (${seatCategories[seat.category].price}€)`}
            />
          );
        })}
      </div>

      <div className="flex gap-4 mt-6 flex-wrap">
        {Object.entries(seatCategories).map(([key, cat]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${cat.color}`} />
            <span className="text-sm">
              {cat.name} ({cat.price}€)
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-400" />
          <span className="text-sm">Indisponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span className="text-sm">Sélectionné (nouveau)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-700" />
          <span className="text-sm">Déjà réservé</span>
        </div>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded">
        <p className="font-semibold">
          Nouvelles places sélectionnées : {selectedSeats.length}
        </p>
        {selectedSeats.length > 0 && (
          <>
            <ul className="text-sm text-gray-700 mt-2 list-disc list-inside">
              {selectedSeats.map((s) => (
                <li key={s.id}>
                  Siège {s.id} — {seatCategories[s.category].name} (
                  {seatCategories[s.category].price}€)
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Total : {totalPrice} €</p>
          </>
        )}
      </div>
    </div>
  );
}
