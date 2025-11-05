import './Concept.css';

export default function Concept() {
  return (
    <div className="concept-page">
      <div className="max-w-4xl mx-auto p-6 text-white">
        {/* Titre en dehors de la card */}
        <h2 className="text-3xl font-bold mb-8 text-center">Festiv’hall, l’espace modulable pour tous vos événements</h2>

        {/* Grande card pour le texte */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
          <p className="mb-4">
            Festiv’Hall est un entrepôt autonome en matériel, pensé pour accueillir et organiser des événements
            aussi bien en intérieur qu’en extérieur.
          </p>

          <p className="mb-4">
            Festiv’hall est bien plus qu’un simple entrepôt : c’est une halle moderne et polyvalente,
            pensée pour accueillir des événements de toutes tailles et de toutes natures. Concerts, 
            salons, conférences, mariages, soirées privées ou séminaires d’entreprise… l’espace 
            s’adapte à vos besoins grâce à une configuration modulable et des équipements techniques 
            performants.
          </p>

          <p className="mb-4">
            Privatisable à la demande, Festiv’hall offre une solution clé en main aussi bien pour 
            les particuliers que pour les professionnels. Son architecture flexible permet de transformer 
            la halle en un lieu intimiste ou en une grande scène capable de recevoir un public nombreux.
          </p>

          <p className="mb-4">
            Avec ses espaces annexes (loges, zones de restauration, parkings), Festiv’hall garantit 
            confort et praticité pour les organisateurs comme pour les invités. 
            Notre ambition : faire de chaque événement une expérience unique, dans un lieu qui 
            s’adapte à vous.
          </p>

          
        </div>
      </div>
    </div>
  );
}
