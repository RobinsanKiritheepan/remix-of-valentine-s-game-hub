import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import FloatingHearts from "@/components/FloatingHearts";

const famousPoems = [
  {
    author: "Thiruvalluvar",
    title: "Thirukkural — L'Amour",
    text: "Les yeux de celle que j'aime sont comme une fleur de lotus.\nL'éclat de son visage est plus doux que le miel.\nCelui qui possède l'amour possède tout ;\nSans amour, rien ne vaut d'être possédé.",
  },
  {
    author: "Subramania Bharathiar",
    title: "Pudhumai Penn (La Femme Nouvelle)",
    text: "Elle marche la tête haute, libre et fière,\nSon regard brille comme mille soleils.\nElle danse avec grâce, elle chante avec force,\nLa femme tamoule, lumière du monde.",
  },
  {
    author: "Avvaiyar",
    title: "Sagesse ancienne",
    text: "Apprends tant que tu es jeune,\nComme l'eau qui coule toujours vers l'avant.\nLa connaissance est la vraie richesse,\nQue nul voleur ne peut dérober.",
  },
  {
    author: "Kambar",
    title: "Kamba Ramayanam — Sita",
    text: "Telle une flamme qui danse dans le vent,\nSa beauté illumine les trois mondes.\nSes pas sont la musique des dieux,\nEt son sourire, la promesse de l'éternité.",
  },
];

const Poems = () => {
  const [customPoems, setCustomPoems] = useState<
    { author: string; title: string; text: string }[]
  >([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [showForm, setShowForm] = useState(false);

  const addPoem = () => {
    if (newAuthor.trim() && newTitle.trim() && newText.trim()) {
      setCustomPoems((prev) => [
        ...prev,
        { author: newAuthor.trim(), title: newTitle.trim(), text: newText.trim() },
      ]);
      setNewAuthor("");
      setNewTitle("");
      setNewText("");
      setShowForm(false);
    }
  };

  const allPoems = [...famousPoems, ...customPoems];

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center relative overflow-hidden">
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-3xl px-4 py-8">
        <NavLink to="/" className="font-body text-sm text-primary hover:underline mb-4 inline-block">← Retour</NavLink>

        <header className="text-center mb-8">
          <span className="text-6xl block mb-3">📜</span>
          <h1 className="font-display text-3xl md:text-4xl font-black text-foreground mb-2">
            Poésie <span className="text-primary">Tamoule</span>
          </h1>
          <p className="font-body text-muted-foreground">
            Les plus beaux vers des poètes tamouls — et les tiens ! 🌸
          </p>
        </header>

        <div className="grid gap-5">
          {allPoems.map((poem, i) => (
            <div key={i} className="game-card text-left">
              <p className="font-display text-lg font-bold text-primary mb-1">
                {poem.title}
              </p>
              <p className="font-body text-xs text-muted-foreground mb-3 italic">
                — {poem.author}
              </p>
              <p className="font-body text-sm text-foreground whitespace-pre-line leading-relaxed">
                {poem.text}
              </p>
            </div>
          ))}
        </div>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="btn-valentine mt-8 mx-auto block"
          >
            ✍️ Ajouter ton poème
          </button>
        ) : (
          <div className="game-card mt-8">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Ajouter un poème
            </h2>
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Auteur"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              maxLength={100}
            />
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Titre du poème"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              maxLength={150}
            />
            <textarea
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mb-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Écris ou colle ton poème ici…"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              maxLength={2000}
            />
            <div className="flex gap-3">
              <button onClick={addPoem} className="btn-valentine text-sm py-2 px-6">
                Ajouter 🪔
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Poems;
