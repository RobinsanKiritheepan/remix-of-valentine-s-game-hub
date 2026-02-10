import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";

interface Question {
  question: string;
  options: string[];
  correct: number;
  emoji: string;
}

const questions: Question[] = [
  {
    question: "Quel est le symbole universel de l'amour ?",
    options: ["Une étoile ⭐", "Un cœur ❤️", "Une fleur 🌸", "Un diamant 💎"],
    correct: 1,
    emoji: "💕",
  },
  {
    question: "Dans quel pays la Saint-Valentin est-elle née ?",
    options: ["France 🇫🇷", "Italie 🇮🇹", "Rome Antique 🏛️", "Grèce 🇬🇷"],
    correct: 2,
    emoji: "🌍",
  },
  {
    question: "Quelle fleur est associée à l'amour ?",
    options: ["Le tournesol 🌻", "La rose rouge 🌹", "La tulipe 🌷", "Le lys 🌺"],
    correct: 1,
    emoji: "🌹",
  },
  {
    question: "Qui est le dieu de l'amour dans la mythologie romaine ?",
    options: ["Jupiter", "Mars", "Cupidon 🏹", "Vénus"],
    correct: 2,
    emoji: "🏹",
  },
  {
    question: "Combien de roses offre-t-on pour dire 'je t'aime' ?",
    options: ["3 roses", "7 roses", "12 roses", "1 seule rose"],
    correct: 3,
    emoji: "💐",
  },
  {
    question: "Quel chocolat est le plus offert à la Saint-Valentin ?",
    options: ["Chocolat blanc", "Chocolat noir", "Chocolat au lait en cœur 🍫", "Chocolat praliné"],
    correct: 2,
    emoji: "🍫",
  },
];

const QuizGame = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[current].correct) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const getResultMessage = () => {
    const pct = score / questions.length;
    if (pct === 1) return { text: "Parfait ! Tu es un(e) expert(e) de l'amour ! 💖", emoji: "🏆" };
    if (pct >= 0.7) return { text: "Bravo ! L'amour n'a presque plus de secrets pour toi !", emoji: "🥰" };
    if (pct >= 0.4) return { text: "Pas mal ! Continue d'apprendre les mystères de l'amour.", emoji: "😊" };
    return { text: "L'amour est un apprentissage... Réessaie ! 💪", emoji: "💝" };
  };

  const q = questions[current];

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4 relative">
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-lg">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-muted-foreground hover:text-foreground transition-colors font-body font-semibold"
        >
          ← Retour
        </button>

        {!finished ? (
          <div className="game-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-body font-semibold text-muted-foreground">
                Question {current + 1}/{questions.length}
              </span>
              <span className="text-2xl">{q.emoji}</span>
            </div>

            <div className="w-full bg-secondary rounded-full h-2 mb-6">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="font-display text-xl font-bold text-foreground mb-6">
              {q.question}
            </h2>

            <div className="space-y-3">
              {q.options.map((opt, i) => {
                let cls = "w-full text-left p-4 rounded-xl border-2 font-body font-semibold transition-all duration-300 ";
                if (selected === null) {
                  cls += "border-border bg-card hover:border-primary hover:bg-secondary cursor-pointer";
                } else if (i === q.correct) {
                  cls += "border-green-400 bg-green-50 text-green-800";
                } else if (i === selected) {
                  cls += "border-red-400 bg-red-50 text-red-800";
                } else {
                  cls += "border-border bg-card opacity-50";
                }
                return (
                  <button key={i} className={cls} onClick={() => handleAnswer(i)}>
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 text-center">
              <span className="font-body text-sm text-muted-foreground">
                Score : {score}/{current + (selected !== null ? 1 : 0)}
              </span>
            </div>
          </div>
        ) : (
          <div className="game-card text-center">
            <span className="text-6xl block mb-4">{getResultMessage().emoji}</span>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Résultat
            </h2>
            <p className="text-4xl font-display font-black text-primary mb-4">
              {score}/{questions.length}
            </p>
            <p className="font-body text-muted-foreground mb-6">
              {getResultMessage().text}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setCurrent(0);
                  setScore(0);
                  setSelected(null);
                  setFinished(false);
                }}
                className="btn-valentine"
              >
                Rejouer 🔄
              </button>
              <button onClick={() => navigate("/")} className="btn-gold">
                Accueil 🏠
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
