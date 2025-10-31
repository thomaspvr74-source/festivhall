import { useState } from 'react';

export default function Artistes() {
  const [form, setForm] = useState({ name: '', email: '', bio: '', tech: '' });

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Nom et email requis');
      return;
    }
    alert('Candidature envoyée (prototype)');
    setForm({ name: '', email: '', bio: '', tech: '' });
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Artistes & agents</h2>
      <p className="mt-2 text-gray-600">Envoyez-nous votre candidature pour jouer à Festiv’Hall.</p>

      <form onSubmit={submit} className="mt-6 bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom / Groupe</label>
          <input className="w-full p-2 border rounded mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="w-full p-2 border rounded mt-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Biographie</label>
          <textarea className="w-full p-2 border rounded mt-1" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} />
        </div>
        <div>
          <label className="block text-sm font-medium">Rider technique</label>
          <textarea className="w-full p-2 border rounded mt-1" value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} rows={3} />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Envoyer</button>
          <a href="mailto:programmation@festivhall.lyon" className="px-4 py-2 border rounded">Contact direct</a>
        </div>
      </form>
    </div>
  );
}
