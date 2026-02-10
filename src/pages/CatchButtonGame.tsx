import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";

const loveMessages = [
  "Tu es incroyable ! 💖",
  "Mon cœur bat pour toi ! 💓",
  "Tu illumines ma vie ! ✨",
  "Je t'adore ! 🥰",
  "Tu es unique ! 💎",
  "Quelle rapidité ! ⚡",
  "Bravo champion(ne) ! 🏆",
  "L'amour te rend rapide ! 💨",
];

const CatchButtonGame = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 50, y: 50 });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const moveButton = useCallback(() => {
    const x = 10 + Math.random() * 75;
    const y = 10 + Math.random() * 70;
    setBtnPos({ x, y });
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setStarted(true);
    setFinished(false);
    moveButton();
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setFinished(true);
          setStarted(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleCatch = () => {
    if (!started) return;
    setScore((s) => s + 1);
    const msg = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 800);
    moveButton();
  };

  const handleMouseEnter = () => {
    if (!started) return;
    // 40% chance the button dodges
    if (Math.random() < 0.4) {
      moveButton();
    }
  };

  const getResult = () => {
    if (score >= 12) return { text: "Incroyable ! L'amour te donne des super pouvoirs ! 🦸", emoji: "🏆" };
    if (score >= 8) return { text: "Très bien ! Ton cœur est rapide ! 💨", emoji: "🥇" };
    if (score >= 4) return { text: "Pas mal du tout ! Continue ! 💪", emoji: "😄" };
    return { text: "Le bouton est malin... Réessaie ! 😜", emoji: "💝" };
  };

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

        {!started && !finished && (
          <div className="game-card text-center">
            <span className="text-5xl block mb-4">🎯</span>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Attrape le Cœur !
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              Clique sur le bouton-cœur le plus de fois possible en 15 secondes !
              Attention, il bouge et parfois il s'échappe... 😏
            </p>
            <button onClick={startGame} className="btn-valentine text-lg">
              Commencer 💘
            </button>
          </div>
        )}

        {started && (
          <>
            <div className="game-card mb-4">
              <div className="flex justify-between items-center">
                <span className="font-body font-bold text-foreground">
                  Score : <span className="text-primary text-xl">{score}</span>
                </span>
                <span
                  className={`font-body font-bold text-lg ${
                    timeLeft <= 5 ? "text-destructive animate-pulse" : "text-foreground"
                  }`}
                >
                  ⏱ {timeLeft}s
                </span>
              </div>
            </div>

            <div
              ref={areaRef}
              className="relative w-full rounded-2xl border-2 border-border bg-card overflow-hidden"
              style={{ height: "350px" }}
            >
              {showMessage && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 font-body font-bold text-primary animate-fade-in">
                  {message}
                </div>
              )}

              <button
                onClick={handleCatch}
                onMouseEnter={handleMouseEnter}
                className="absolute transition-all duration-200 pulse-love cursor-pointer select-none"
                style={{
                  left: `${btnPos.x}%`,
                  top: `${btnPos.y}%`,
                  transform: "translate(-50%, -50%)",
                  fontSize: "48px",
                  filter: "drop-shadow(0 4px 8px hsl(345 80% 55% / 0.3))",
                }}
              >
                💖
              </button>
            </div>
          </>
        )}

        {finished && (
          <div className="game-card text-center">
            <span className="text-6xl block mb-4">{getResult().emoji}</span>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Temps écoulé !
            </h2>
            <p className="text-4xl font-display font-black text-primary mb-2">
              {score} cœurs attrapés
            </p>
            <p className="font-body text-muted-foreground mb-6">
              {getResult().text}
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={startGame} className="btn-valentine">
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

export default CatchButtonGame;
