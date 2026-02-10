import { useEffect, useState } from "react";

interface FloatingItem {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  symbol: string;
}

const symbols = ["🪔", "✨", "🌸", "💃", "🪷", "🔔", "⭐"];

const FloatingHearts = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const generated: FloatingItem[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 18,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      symbol: symbols[i % symbols.length],
    }));
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((h) => (
        <span
          key={h.id}
          className="absolute opacity-20"
          style={{
            left: `${h.left}%`,
            bottom: "-20px",
            fontSize: `${h.size}px`,
            animation: `floatUp ${h.duration}s ease-in-out ${h.delay}s infinite`,
          }}
        >
          {h.symbol}
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
