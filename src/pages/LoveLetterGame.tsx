import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";

const words = [
  { word: "A _ O U R", answer: "AMOUR", hint: "Le plus beau sentiment 💕" },
  { word: "C _ E U R", answer: "COEUR", hint: "Il bat pour toi 💓" },
  { word: "B _ I S E R", answer: "BAISER", hint: "Un doux contact 💋" },
  { word: "R _ S E", answer: "ROSE", hint: "Fleur de l'amour 🌹" },
  { word: "C _ P I D O N", answer: "CUPIDON", hint: "L'archer de l'amour 🏹" },
  { word: "T _ N D R E S S E", answer: "TENDRESSE", hint: "Douceur du cœur 🤗" },
];

const LoveLetterGame = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = input.trim().toUpperCase() === words[current].answer;
    if (isCorrect) setScore((s) => s + 1);
    setFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      if (current < words.length - 1) {
        setCurrent((c) => c + 1);
        setInput("");
        setFeedback(null);
        setShowHint(false);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const w = words[current];

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
          <div className="game-card text-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-body font-semibold text-muted-foreground">
                Mot {current + 1}/{words.length}
              </span>
              <span className="font-body font-bold text-primary">Score : {score}</span>
            </div>

            <span className="text-4xl block mb-2">✉️</span>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              Complète le mot d'amour
            </h2>

            <p
              className="text-3xl font-display font-black text-primary mb-4 tracking-widest"
              style={{ letterSpacing: "0.3em" }}
            >
              {w.word}
            </p>

            {showHint && (
              <p className="font-body text-muted-foreground mb-3 animate-fade-in">
                💡 Indice : {w.hint}
              </p>
            )}

            {feedback && (
              <p
                className={`font-body font-bold mb-3 text-lg animate-scale-in ${
                  feedback === "correct" ? "text-green-600" : "text-red-500"
                }`}
              >
                {feedback === "correct" ? "✅ Correct !" : `❌ C'était : ${w.answer}`}
              </p>
            )}

            {!feedback && (
              <>
                <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ta réponse..."
                    className="flex-1 rounded-xl border-2 border-border bg-background px-4 py-3 font-body font-semibold text-foreground focus:border-primary focus:outline-none transition-colors"
                    autoFocus
                  />
                  <button type="submit" className="btn-valentine">
                    Valider
                  </button>
                </form>
                <button
                  onClick={() => setShowHint(true)}
                  className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  Besoin d'un indice ? 💡
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="game-card text-center">
            <span className="text-6xl block mb-4">💌</span>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Lettre terminée !
            </h2>
            <p className="text-4xl font-display font-black text-primary mb-4">
              {score}/{words.length}
            </p>
            <p className="font-body text-muted-foreground mb-6">
              {score === words.length
                ? "Parfait ! Tu connais le langage de l'amour ! 💖"
                : "Continue à explorer les mots de l'amour ! 📝"}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setCurrent(0);
                  setScore(0);
                  setInput("");
                  setFeedback(null);
                  setFinished(false);
                  setShowHint(false);
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

export default LoveLetterGame;
