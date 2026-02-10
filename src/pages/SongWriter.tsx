import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import FloatingHearts from "@/components/FloatingHearts";

const SongWriter = () => {
  const [songs, setSongs] = useState<{ title: string; lyrics: string }[]>([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentLyrics, setCurrentLyrics] = useState("");
  const [editing, setEditing] = useState(true);

  const saveSong = () => {
    if (currentTitle.trim() && currentLyrics.trim()) {
      setSongs((prev) => [
        { title: currentTitle.trim(), lyrics: currentLyrics.trim() },
        ...prev,
      ]);
      setCurrentTitle("");
      setCurrentLyrics("");
      setEditing(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center relative overflow-hidden">
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-3xl px-4 py-8">
        <NavLink to="/" className="font-body text-sm text-primary hover:underline mb-4 inline-block">← Retour</NavLink>

        <header className="text-center mb-8">
          <span className="text-6xl block mb-3">🎶</span>
          <h1 className="font-display text-3xl md:text-4xl font-black text-foreground mb-2">
            Écris ta <span className="text-primary">Chanson</span>
          </h1>
          <p className="font-body text-muted-foreground">
            Compose tes plus belles paroles d'amour 🎵
          </p>
        </header>

        {/* Writing area */}
        <div className="game-card mb-6">
          <input
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mb-3 font-display font-bold focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Titre de ta chanson…"
            value={currentTitle}
            onChange={(e) => {
              setCurrentTitle(e.target.value);
              setEditing(true);
            }}
            maxLength={150}
          />
          <textarea
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[200px] font-body leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Écris tes paroles ici…&#10;&#10;Couplet 1 :&#10;…&#10;&#10;Refrain :&#10;…"
            value={currentLyrics}
            onChange={(e) => {
              setCurrentLyrics(e.target.value);
              setEditing(true);
            }}
            maxLength={5000}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-muted-foreground">
              {currentLyrics.length} / 5000
            </span>
            <button
              onClick={saveSong}
              disabled={!currentTitle.trim() || !currentLyrics.trim()}
              className="btn-valentine text-sm py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sauvegarder 💝
            </button>
          </div>
        </div>

        {/* Saved songs */}
        {songs.length > 0 && (
          <>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Tes chansons 🎤
            </h2>
            <div className="grid gap-4">
              {songs.map((song, i) => (
                <div key={i} className="game-card text-left">
                  <p className="font-display text-lg font-bold text-primary mb-2">
                    🎵 {song.title}
                  </p>
                  <p className="font-body text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {song.lyrics}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {!editing && songs.length > 0 && (
          <button
            onClick={() => setEditing(true)}
            className="btn-valentine mt-6 mx-auto block"
          >
            ✍️ Écrire une nouvelle chanson
          </button>
        )}
      </div>
    </div>
  );
};

export default SongWriter;
