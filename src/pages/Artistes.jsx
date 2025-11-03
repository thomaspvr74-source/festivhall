import './Artistes.css';

export default function Artistes() {
  return (
    <div className="artistes-page">
      <h1 className="text-3xl font-bold mb-6 text-white">Artistes & agents</h1>
      <p className="mb-6 text-white">
        Envoyez-nous votre candidature pour jouer à Festiv'Hall
      </p>

      <form className="bg-white rounded-lg shadow p-6 max-w-lg w-full">
        <label className="block mb-4">
          Nom / Groupe
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            placeholder="Nom du groupe ou artiste"
          />
        </label>

        <label className="block mb-4">
          Email
          <input
            type="email"
            className="w-full border rounded p-2 mt-1"
            placeholder="exemple@mail.com"
          />
        </label>

        <label className="block mb-4">
          Biographie
          <textarea
            className="w-full border rounded p-2 mt-1"
            rows="4"
            placeholder="Présentez votre parcours artistique"
          />
        </label>

        <label className="block mb-6">
          Rider technique
          <textarea
            className="w-full border rounded p-2 mt-1"
            rows="3"
            placeholder="Vos besoins techniques"
          />
        </label>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
