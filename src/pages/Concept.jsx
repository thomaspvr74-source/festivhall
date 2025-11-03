import './Concept.css';

export default function Concept() {
  return (
    <div className="concept-page">
      <div className="max-w-4xl mx-auto p-6 text-white">
        {/* Titre en dehors de la card */}
        <h2 className="text-3xl font-bold mb-8 text-center">Le concept Festiv’Hall</h2>

        {/* Grande card pour le texte */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
          <p className="mb-4">
            Festiv’Hall est un entrepôt autonome en matériel, pensé pour accueillir et organiser des événements
            aussi bien en intérieur qu’en extérieur.
          </p>

          <p className="mb-4">
            La structure peut également se déplacer pour installer des scènes et infrastructures lors de festivals,
            offrant ainsi une flexibilité unique aux organisateurs.
          </p>

          <p className="mb-4">
            En partenariat avec des hôtels, auberges de jeunesse et restaurateurs (food trucks, bars), Festiv’Hall
            propose une expérience complète : hébergement, restauration et ambiance festive. 
            Les food trucks peuvent s’installer directement dans la halle ou à l’extérieur, et un bar partenaire
            exploite l’espace bar intégré pour servir les festivaliers.
          </p>

          <p className="mb-4">
            L’objectif est de créer un lieu vivant et modulable, capable de s’adapter à toutes les tailles
            d’événements, tout en dynamisant le tissu touristique et culturel local.
          </p>

          <p>
            Festiv’Hall, c’est bien plus qu’une salle : c’est un écosystème complet au service des artistes,
            des entreprises, des organisateurs et du public.
          </p>
        </div>
      </div>
    </div>
  );
}
