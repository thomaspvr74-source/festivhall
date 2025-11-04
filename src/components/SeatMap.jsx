import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./SeatMap.css";

export default function SeatMap({
  capacity = 1500,
  reservedSeats = [],
  preselectedSeats = [],
  onSelectionChange,
  onCategoriesInit
}) {
  const cols = 50; // sièges par rangée
  const rows = Math.ceil(capacity / cols);
  const seatSize = 22;

  const [selected, setSelected] = useState([]);
  const [initialScale, setInitialScale] = useState(1);
  const containerRef = useRef(null);

  // Calcul du zoom initial
  useLayoutEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      const gridWidth = cols * seatSize;
      const gridHeight = rows * seatSize;

      const scaleX = containerWidth / gridWidth;
      const scaleY = containerHeight / gridHeight;

      const scale = Math.min(scaleX, scaleY) * 0.9;
      setInitialScale(scale);
    }
  }, [cols, rows]);

  // Labels de rangées type Excel
  const getRowLabel = (index) => {
    let label = "";
    let i = index;
    while (i >= 0) {
      label = String.fromCharCode((i % 26) + 65) + label;
      i = Math.floor(i / 26) - 1;
    }
    return label;
  };

  // Répartition catégories
  const vipLimit = Math.floor(rows * 0.2);
  const standardPlusLimit = Math.floor(rows * 0.6);

  // Définition des catégories globales (pour Reservation.jsx)
  const categories = {
    VIP: { name: "Billet OR", price: 120, color: "bg-yellow-500" },
    STANDARD_PLUS: { name: "Billet Standard+", price: 80, color: "bg-green-500" },
    STANDARD: { name: "Billet Standard", price: 50, color: "bg-blue-500" }
  };

  // On envoie les catégories au parent une seule fois
  useEffect(() => {
    if (onCategoriesInit) {
      onCategoriesInit(categories);
    }
  }, []);

  // Génération des sièges
  const seats = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seatId = `${getRowLabel(r)}${c + 1}`;
      let category = "STANDARD";
      if (r < vipLimit) category = "VIP";
      else if (r < standardPlusLimit) category = "STANDARD_PLUS";

      seats.push({ id: seatId, category });
    }
  }

  // Toggle sélection
  const toggleSeat = (seat) => {
    if (reservedSeats.includes(seat.id)) return;
    let updated;
    if (selected.find((s) => s.id === seat.id)) {
      updated = selected.filter((s) => s.id !== seat.id);
    } else {
      updated = [...selected, seat];
    }
    setSelected(updated);
    // ✅ On renvoie des objets complets {id, category}
    onSelectionChange && onSelectionChange(updated);
  };

  return (
    <div className="seatmap-wrapper" ref={containerRef}>
      {/* ✅ Scène */}
      <div className="stage">SCÈNE</div>

      <TransformWrapper initialScale={initialScale} minScale={0.1} maxScale={4} centerOnInit={true}>
        <TransformComponent>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, ${seatSize}px)`,
              gridTemplateRows: `repeat(${rows}, ${seatSize}px)`
            }}
          >
            {seats.map((seat) => {
              const isReserved = reservedSeats.includes(seat.id);
              const isSelected = selected.find((s) => s.id === seat.id);

              return (
                <div
                  key={seat.id}
                  className={`seat ${seat.category.toLowerCase().replace("_", "-")} 
                    ${isReserved ? "reserved" : ""} 
                    ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleSeat(seat)}
                  title={`${seat.id} (${seat.category})`}
                />
              );
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
