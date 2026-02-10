import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";

const games = [
  {
    title: "Quiz de l'Amour",
    description: "Teste tes connaissances sur la Saint-Valentin avec ce QCM romantique !",
    emoji: "💕",
    path: "/quiz",
    color: "from-valentine-rose to-valentine-pink",
  },
  {
    title: "Attrape le Cœur",
    description: "Le bouton bouge et s'échappe... Arriveras-tu à l'attraper ?",
    emoji: "🎯",
    path: "/catch",
    color: "from-valentine-gold to-accent",
  },
  {
    title: "Mots d'Amour",
    description: "Trouve les lettres manquantes des mots les plus doux !",
    emoji: "✉️",
    path: "/love-letter",
    color: "from-valentine-deep to-valentine-rose",
  },
  {
    title: "Poèmes d'Amour",
    description: "Lis et ajoute tes propres poèmes romantiques de grands auteurs !",
    emoji: "📜",
    path: "/poems",
    color: "from-valentine-rose to-valentine-deep",
  },
  {
    title: "Écris ta Chanson",
    description: "Compose tes plus belles paroles d'amour et garde-les précieusement !",
    emoji: "🎶",
    path: "/song-writer",
    color: "from-valentine-gold to-valentine-rose",
  },
  {
    title: "Musique Romantique",
    description: "Écoute et ajoute tes chansons d'amour préférées via YouTube !",
    emoji: "🎧",
    path: "/music",
    color: "from-valentine-pink to-valentine-gold",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center relative overflow-hidden">
      <FloatingHearts />

      {/* Hero */}
      <header className="relative z-10 text-center pt-16 pb-10 px-4">
        <div className="pulse-love inline-block mb-4">
          <span className="text-7xl">💝</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">
          Jeux de la <span className="text-primary">Saint-Valentin</span>
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
          Amuse-toi avec ces mini-jeux spécialement créés pour la fête de l'amour ! 💖
        </p>
      </header>

      {/* Games Grid */}
      <main className="relative z-10 w-full max-w-3xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {games.map((game) => (
            <button
              key={game.path}
              onClick={() => navigate(game.path)}
              className="game-card text-left group"
            >
              <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                {game.emoji}
              </span>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                {game.title}
              </h2>
              <p className="font-body text-sm text-muted-foreground mb-4">
                {game.description}
              </p>
              <span className="btn-valentine text-sm py-2 px-5">
                Jouer →
              </span>
            </button>
          ))}
        </div>

        <footer className="text-center mt-12">
          <p className="font-body text-sm text-muted-foreground">
            Fait avec ❤️ pour la Saint-Valentin 2026
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
