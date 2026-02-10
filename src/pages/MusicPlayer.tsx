import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import FloatingHearts from "@/components/FloatingHearts";

const defaultVideos = [
  { title: "Munbe Vaa — Shreya Ghoshal", id: "uyUoEifAFtQ" },
  { title: "Kannathil Muthamittal — A.R. Rahman", id: "3ixk1vo8dUo" },
  { title: "Snehithane — Alaipayuthey", id: "xmwjMOT3MFE" },
];

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|music\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

const MusicPlayer = () => {
  const [videos, setVideos] = useState(defaultVideos);
  const [activeId, setActiveId] = useState(defaultVideos[0].id);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");

  const addVideo = () => {
    setError("");
    const id = extractYouTubeId(newUrl.trim());
    if (!id) {
      setError("Lien YouTube invalide. Colle un lien YouTube ou YouTube Music.");
      return;
    }
    const title = newTitle.trim() || `Vidéo ${videos.length + 1}`;
    setVideos((prev) => [...prev, { title, id }]);
    setActiveId(id);
    setNewUrl("");
    setNewTitle("");
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center relative overflow-hidden">
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-3xl px-4 py-8">
        <NavLink to="/" className="font-body text-sm text-primary hover:underline mb-4 inline-block">← Retour</NavLink>

        <header className="text-center mb-8">
          <span className="text-6xl block mb-3">🎧</span>
          <h1 className="font-display text-3xl md:text-4xl font-black text-foreground mb-2">
            Musique <span className="text-primary">Tamoule</span>
          </h1>
          <p className="font-body text-muted-foreground">
            Écoute et ajoute tes chansons tamoules préférées 🌸
          </p>
        </header>

        {/* Player */}
        <div className="game-card mb-6 p-0 overflow-hidden">
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeId}?autoplay=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Playlist */}
        <div className="grid gap-2 mb-6">
          {videos.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveId(v.id)}
              className={`game-card text-left py-3 px-4 flex items-center gap-3 transition-all ${
                activeId === v.id
                  ? "ring-2 ring-primary"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <span className="text-xl">
                {activeId === v.id ? "🎵" : "▶️"}
              </span>
              <span className="font-body text-sm font-medium text-foreground">
                {v.title}
              </span>
            </button>
          ))}
        </div>

        {/* Add video */}
        <div className="game-card">
          <h2 className="font-display text-lg font-bold text-foreground mb-3">
            Ajouter une musique 🎶
          </h2>
          <input
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Titre (optionnel)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            maxLength={150}
          />
          <input
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Colle un lien YouTube ou YouTube Music…"
            value={newUrl}
            onChange={(e) => {
              setNewUrl(e.target.value);
              setError("");
            }}
            maxLength={500}
          />
          {error && (
            <p className="text-xs text-destructive mb-2">{error}</p>
          )}
          <button
            onClick={addVideo}
            disabled={!newUrl.trim()}
            className="btn-valentine text-sm py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ajouter ➕
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
