import { useState } from "react";
import "./Privatisation.css";

export default function PrivatisationForm() {
  const [form, setForm] = useState({
    entreprise: "",
    email: "",
    date: "",
    personnes: "",
    message: "",
    newEventDate: "",
    newEventName: "",
    newEventType: "event"
  });

  // 🔹 Dates réservées locales
  const [reservedDates, setReservedDates] = useState({
    "2025-11-08": { type: "event", name: "Symphonie" },
    "2025-11-15": { type: "event", name: "Rock’n Fest" },
    "2025-11-22": { type: "event", name: "Funk Night" },
    "2025-11-25": { type: "private", name: "Entreprise Dupont SA" },
    "2025-11-28": { type: "private", name: "Startup InnovX" }
  });

  // 🔹 Ajouter un nouvel évènement (local au calendrier)
  function addEvent(dateStr, type, name) {
    setReservedDates(prev => ({
      ...prev,
      [dateStr]: { type, name }
    }));
  }

  // 🔹 Navigation calendrier
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  function submit(e) {
    e.preventDefault();
    if (!form.entreprise || !form.email) {
      alert("Entreprise et email requis");
      return;
    }
    alert("Demande envoyée (prototype)");
    setForm({ entreprise: "", email: "", date: "", personnes: "", message: "" });
  }

  // 🔹 Génération du calendrier
  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const weeks = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const days = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < (firstDay === 0 ? 6 : firstDay - 1)) || day > daysInMonth) {
          days.push(<td key={j} className="p-2 text-gray-300">-</td>);
        } else {
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const reserved = reservedDates[dateStr];

          days.push(
            <td key={j} className="p-2 text-center relative group">
              <button
                disabled={!!reserved}
                onClick={() => setForm({ ...form, date: dateStr })}
                className={`w-10 h-10 rounded-full ${
                  reserved
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-white hover:bg-indigo-200"
                } ${form.date === dateStr ? "ring-2 ring-indigo-600" : ""}`}
              >
                {day}
              </button>

              {/* Tooltip */}
              {reserved && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                  {reserved.type === "event"
                    ? `Événement : ${reserved.name}`
                    : `Privatisé par ${reserved.name}`}
                </div>
              )}
            </td>
          );
          day++;
        }
      }
      weeks.push(<tr key={i}>{days}</tr>);
    }
    return weeks;
  };

  const monthNames = [
    "Janvier","Février","Mars","Avril","Mai","Juin",
    "Juillet","Août","Septembre","Octobre","Novembre","Décembre"
  ];
  const weekDays = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];

  return (
    <div
      className="privatisation-form-page min-h-screen flex flex-col items-center p-6"
      style={{
        backgroundImage: "url('/page_fond_evenements.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Formulaire */}
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Demande de privatisation</h2>
        <p className="mt-2 text-gray-600">
          Remplissez le formulaire ci-dessous pour soumettre votre demande de privatisation.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Entreprise</label>
            <input
              className="w-full p-2 border rounded mt-1"
              value={form.entreprise}
              onChange={(e) => setForm({ ...form, entreprise: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nombre de personnes</label>
            <input
              type="number"
              className="w-full p-2 border rounded mt-1"
              value={form.personnes}
              onChange={(e) => setForm({ ...form, personnes: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              className="w-full p-2 border rounded mt-1"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
              Envoyer
            </button>
            <a href="mailto:privatisation@festivhall.lyon" className="px-4 py-2 border rounded">
              Contact direct
            </a>
          </div>
        </form>
      </div>

      {/* Card calendrier */}
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            ◀
          </button>
          <h3 className="text-xl font-bold">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            ▶
          </button>
        </div>

        <table className="w-full text-center">
          <thead>
            <tr>
              {weekDays.map((day) => (
                <th key={day} className="p-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>{renderCalendar()}</tbody>
        </table>

        {form.date && (
          <p className="mt-4 text-indigo-600 font-semibold">
            Date sélectionnée : {form.date}
          </p>
        )}
      </div>

      {/* Mini formulaire ajout d'événement */}
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Ajouter un nouvel évènement</h3>
                <div className="flex flex-col md:flex-row gap-3">
          <input
            type="date"
            className="border p-2 rounded flex-1"
            value={form.newEventDate || ""}
            onChange={(e) => setForm({ ...form, newEventDate: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nom de l'évènement ou entreprise"
            className="border p-2 rounded flex-1"
            value={form.newEventName || ""}
            onChange={(e) => setForm({ ...form, newEventName: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={form.newEventType}
            onChange={(e) => setForm({ ...form, newEventType: e.target.value })}
          >
            <option value="event">Événement</option>
            <option value="private">Privatisation</option>
          </select>
          <button
            onClick={() => {
              if (form.newEventDate && form.newEventName) {
                addEvent(form.newEventDate, form.newEventType, form.newEventName);
                setForm({
                  ...form,
                  newEventDate: "",
                  newEventName: "",
                  newEventType: "event"
                });
              } else {
                alert("Veuillez entrer une date et un nom d'évènement.");
              }
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Ajouter
          </button>
        </div>
        <p className="mt-3 text-gray-600 text-sm">
          Les nouvelles dates ajoutées apparaîtront automatiquement dans le calendrier ci-dessus.
        </p>
      </div>
    </div>
  );
}
