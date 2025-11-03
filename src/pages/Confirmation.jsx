import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // ✅ recommandé
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

export default function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    buyer = {},
    holders = [],
    selectedSeats = [],
    seatCategories = {},
    event = null,
    accommodation = {},
    total = 0
  } = state || {};

  const ticketsRef = useRef([]);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Aucune confirmation disponible</h2>
        <button
          onClick={() => navigate("/evenements")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Retour aux événements
        </button>
      </div>
    );
  }

  // ✅ Génération PDF global
  const handleDownloadAllPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    for (let i = 0; i < ticketsRef.current.length; i++) {
      const ticketElement = ticketsRef.current[i];
      if (!ticketElement) continue;

      const canvas = await html2canvas(ticketElement);
      const imgData = canvas.toDataURL("image/png");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save(`billets-${event.title}.pdf`);
  };

  // ✅ Génération PDF individuel
  const handleDownloadSinglePDF = async (index, holderName) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const ticketElement = ticketsRef.current[index];
    if (!ticketElement) return;

    const canvas = await html2canvas(ticketElement);
    const imgData = canvas.toDataURL("image/png");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`billet-${holderName || "festivalier"}-${event.title}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold text-green-600 mb-6">
        🎉 Réservation confirmée !
      </h2>

      {/* 🔹 Infos événement */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-700">
          📅 {event.date} — 📍 {event.city}
        </p>
      </div>

      {/* 🔹 Billets stylisés */}
      <div className="bg-white p-6 rounded shadow space-y-6">
        <h3 className="text-xl font-bold mb-4">Vos billets</h3>
        {selectedSeats.map((seat, i) => {
          const holder = holders[i] || {};
          const category = seatCategories[seat.category];
          const qrValue = JSON.stringify({
            event: event.title,
            date: event.date,
            seat: seat.id,
            category: category?.name,
            holder: `${holder.firstName} ${holder.lastName}`,
            accommodation
          });

          return (
            <div
              key={i}
              ref={(el) => (ticketsRef.current[i] = el)}
              className="ticket border-2 border-indigo-600 rounded-lg bg-white shadow-lg p-6 flex flex-col md:flex-row justify-between items-center relative overflow-hidden"
            >
              {/* Bandeau logo */}
              <div className="absolute top-0 left-0 w-full bg-indigo-600 text-white text-center py-2 font-bold text-lg">
                🎶 {event.title} — Billet Officiel
              </div>

              {/* Infos billet */}
              <div className="mt-10 flex-1">
                <p className="text-sm text-gray-500">Billet #{i + 1}</p>
                <h3 className="text-xl font-bold text-indigo-700 mb-2">
                  {holder.firstName} {holder.lastName}
                </h3>
                <p><strong>Date :</strong> {event.date}</p>
                <p><strong>Lieu :</strong> {event.city}</p>
                <p>
                  <strong>Catégorie :</strong> {category?.name} ({category?.price} €)
                </p>
                <p>
                  <strong>Siège :</strong>{" "}
                  {seat.id !== "PASS" ? seat.id : "Pass Général"}
                </p>
                {accommodation.hotel > 0 || accommodation.auberge > 0 ? (
                  <p>
                    <strong>Hébergement :</strong>{" "}
                    {accommodation.hotel > 0 && `${accommodation.hotel} en hôtel `}
                    {accommodation.auberge > 0 && `${accommodation.auberge} en auberge`}
                  </p>
                ) : (
                  <p><strong>Hébergement :</strong> Aucun</p>
                )}
              </div>

              {/* QR Code + bouton individuel */}
              <div className="flex flex-col items-center gap-2">
                <QRCodeCanvas value={qrValue} size={120} />
                <p className="text-xs text-gray-500">Scannez-moi</p>
                <button
                  onClick={() =>
                    handleDownloadSinglePDF(i, `${holder.firstName}-${holder.lastName}`)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  📄 Télécharger ce billet
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔹 Acheteur */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Coordonnées de l’acheteur</h3>
        <p><strong>Nom :</strong> {buyer.name}</p>
        <p><strong>Email :</strong> {buyer.email}</p>
        <p><strong>Téléphone :</strong> {buyer.phone}</p>
      </div>

      {/* 🔹 Total */}
      <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded">
        <h3 className="text-xl font-bold">Total payé : {total} €</h3>
      </div>

      {/* 🔹 Boutons globaux */}
      <div className="text-center space-x-4">
        <button
          onClick={handleDownloadAllPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          📄 Télécharger tous les billets en PDF
        </button>
        <button
          onClick={() => navigate("/evenements")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Voir d’autres événements
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Retour à l’accueil
        </button>
      </div>
    </div>
  );
}
