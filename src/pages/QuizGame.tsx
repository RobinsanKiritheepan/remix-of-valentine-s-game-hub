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
    question: "Quel est le nom de la danse classique tamoule la plus connue ?",
    options: ["Kathak", "Bharatanatyam 💃", "Odissi", "Kuchipudi"],
    correct: 1,
    emoji: "💃",
  },
  {
    question: "Quel instrument accompagne traditionnellement le Bharatanatyam ?",
    options: ["Le sitar", "Le tabla", "Le mridangam 🥁", "La flûte bansuri"],
    correct: 2,
    emoji: "🎵",
  },
  {
    question: "Comment s'appelle la clochette portée aux chevilles par les danseuses ?",
    options: ["Ghungroo / Salangai 🔔", "Taal", "Manjira", "Chimta"],
    correct: 0,
    emoji: "🔔",
  },
  {
    question: "Quel est l'auteur du Thirukkural, chef-d'œuvre de la littérature tamoule ?",
    options: ["Bharathiar", "Kambar", "Thiruvalluvar 📜", "Ilango Adigal"],
    correct: 2,
    emoji: "📜",
  },
  {
    question: "Quel festival tamoul célèbre la récolte et le soleil ?",
    options: ["Diwali", "Pongal 🌾", "Navratri", "Onam"],
    correct: 1,
    emoji: "🌾",
  },
  {
    question: "Dans le Bharatanatyam, que signifie 'Nritta' ?",
    options: ["La danse pure / abstraite ✨", "La danse narrative", "Le chant", "Le rythme"],
    correct: 0,
    emoji: "✨",
  },
  {
    question: "Quel est le motif décoratif dessiné au sol dans la culture tamoule ?",
    options: ["Rangoli", "Kolam 🌀", "Mandala", "Mehendi"],
    correct: 1,
    emoji: "🌀",
  },
  {
    question: "Quelle fleur est souvent portée dans les cheveux des femmes tamoules ?",
    options: ["La rose", "Le lotus", "Le jasmin (Malligai) 🌸", "L'orchidée"],
    correct: 2,
    emoji: "🌸",
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
    if (pct === 1) return { text: "Parfait ! Tu es une vraie experte de la culture tamoule ! 🪔", emoji: "🏆" };
    if (pct >= 0.7) return { text: "Bravo ! Le Bharatanatyam n'a plus de secrets pour toi !", emoji: "💃" };
    if (pct >= 0.4) return { text: "Pas mal ! Continue de découvrir ta belle culture.", emoji: "🌸" };
    return { text: "Réessaie, danseuse ! Tu vas y arriver ! 💪", emoji: "🪷" };
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
