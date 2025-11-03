import { useState } from 'react';
import './Privatisation.css';

export default function Privatisation() {
  const [form, setForm] = useState({ entreprise: '', email: '', date: '', personnes: '', message: '' });

  function submit(e) {
    e.preventDefault();
    if (!form.entreprise || !form.email) {
      alert('Entreprise et email requis');
      return;
    }
    alert('Demande envoyée (prototype)');
    setForm({ entreprise: '', email: '', date: '', personnes: '', message: '' });
  }

  return (
    <div className="privatisation-page">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-white">Privatiser Festiv’Hall</h2>
        <p className="mt-2 text-gray-200">
          Séminaires, lancements, soirées d’entreprise — demandez votre devis personnalisé.
        </p>

        <form onSubmit={submit} className="mt-6 bg-white p-6 rounded shadow space-y-4">
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
              className="w-full p-2 border rounded mt-1"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date souhaitée</label>
            <input
              type="date"
              className="w-full p-2 border rounded mt-1"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nombre de personnes</label>
            <input
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
    </div>
  );
}
