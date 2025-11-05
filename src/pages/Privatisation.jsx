import { useNavigate } from 'react-router-dom';
import './Privatisation.css';

export default function Privatisation() {
  const navigate = useNavigate();

  return (
    <div className="privatisation-page">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-white">Privatiser Festiv’Hall</h2>
        <p className="mt-2 text-gray-200">
          Séminaires, lancements, soirées d’entreprise, mariages ou concerts privés — Festiv’Hall s’adapte à vos besoins.
        </p>

        {/* Bouton vers la page de privatisation */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/privatisation-form')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Privatiser maintenant
          </button>
        </div>

        {/* Card explicative */}
        <div className="mt-8 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Comment fonctionne la privatisation ?</h3>
          <p className="text-gray-700 mb-3">
            En cliquant sur le bouton ci-dessus, vous accéderez à une page dédiée où un calendrier interactif vous permettra de choisir vos dates de réservation.
          </p>
          <p className="text-gray-700 mb-3">
            Les <span className="font-semibold">dates disponibles</span> apparaissent en <span className="font-semibold">blanc</span> et sont entièrement cliquables : vous pouvez ainsi réserver votre créneau en toute simplicité.
          </p>
          <p className="text-gray-700 mb-3">
            Les <span className="font-semibold">dates non disponibles</span> sont grisées. Elles correspondent à des journées déjà occupées par de grands événements publics comme <em>Symphonie</em>, <em>Rock’n Fest</em> ou <em>Funk Night</em>, ou bien à des privatisations déjà confirmées par des entreprises ou des particuliers.
          </p>
          <p className="text-gray-700 mb-3">
            Notre objectif est de vous offrir une expérience claire et intuitive : vous savez immédiatement quand la halle est libre et vous pouvez planifier votre événement sans perte de temps.
          </p>
          <p className="text-gray-700">
            En privatisant Festiv’Hall, vous bénéficiez d’un espace modulable et moderne, adapté aussi bien aux <strong>entreprises</strong> (séminaires, salons, soirées de gala) qu’aux <strong>particuliers</strong> (mariages, anniversaires, concerts privés). Chaque réservation inclut l’accès aux infrastructures de la halle (scène, loges, espaces techniques, zones de restauration et parkings), ainsi qu’un accompagnement personnalisé pour configurer l’espace selon vos attentes.
          </p>
        </div>
      </div>
    </div>
  );
}
