import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";

const games = [
  {
    title: "Quiz Tamil & Danse",
    description: "Teste tes connaissances sur le Bharatanatyam et la culture tamoule !",
    emoji: "🪔",
    path: "/quiz",
    color: "from-primary to-accent",
  },
  {
    title: "Attrape le Kolam",
    description: "Le motif bouge et s'échappe... Arriveras-tu à l'attraper ?",
    emoji: "🎯",
    path: "/catch",
    color: "from-accent to-primary",
  },
  {
    title: "Mots Tamouls",
    description: "Trouve les lettres manquantes des mots de la culture tamoule !",
    emoji: "✍️",
    path: "/love-letter",
    color: "from-primary to-accent",
  },
  {
    title: "Poésie Tamoule",
    description: "Lis les plus beaux vers de Thiruvalluvar, Bharathiar et écris les tiens !",
    emoji: "📜",
    path: "/poems",
    color: "from-primary to-accent",
  },
  {
    title: "Écris ta Chanson",
    description: "Compose tes plus belles paroles inspirées de la musique tamoule !",
    emoji: "🎶",
    path: "/song-writer",
    color: "from-accent to-primary",
  },
  {
    title: "Musique Tamoule",
    description: "Écoute et ajoute tes chansons tamoules préférées !",
    emoji: "🎧",
    path: "/music",
    color: "from-primary to-accent",
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
          <span className="text-7xl">💃</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">
          Pour ma <span className="text-primary">Danseuse</span> Tamoule
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
          Des mini-jeux créés spécialement pour toi, reine du Bharatanatyam ! 🪷✨
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
            Fait avec 🪔 pour ma danseuse préférée
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
