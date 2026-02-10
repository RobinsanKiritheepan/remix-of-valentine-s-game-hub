import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import FloatingHearts from "@/components/FloatingHearts";

const famousPoems = [
  {
    author: "Victor Hugo",
    title: "Demain, dès l'aube",
    text: "Demain, dès l'aube, à l'heure où blanchit la campagne,\nJe partirai. Vois-tu, je sais que tu m'attends.\nJ'irai par la forêt, j'irai par la montagne.\nJe ne puis demeurer loin de toi plus longtemps.",
  },
  {
    author: "Paul Éluard",
    title: "Je t'aime",
    text: "Je t'aime pour toutes les femmes que je n'ai pas connues\nJe t'aime pour tous les temps où je n'ai pas vécu\nJe t'aime pour l'odeur du grand large\nEt pour l'odeur du pain chaud.",
  },
  {
    author: "Jacques Prévert",
    title: "Les feuilles mortes",
    text: "Oh ! je voudrais tant que tu te souviennes\nDes jours heureux où nous étions amis.\nEn ce temps-là la vie était plus belle,\nEt le soleil plus brûlant qu'aujourd'hui.",
  },
  {
    author: "Louis Aragon",
    title: "Il n'y a pas d'amour heureux",
    text: "Rien n'est jamais acquis à l'homme Ni sa force\nNi sa faiblesse ni son cœur Et quand il croit\nOuvrir ses bras son ombre est celle d'une croix\nEt quand il croit serrer son bonheur il le broie.",
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
            Poèmes d'<span className="text-primary">Amour</span>
          </h1>
          <p className="font-body text-muted-foreground">
            Les plus beaux vers des poètes célèbres — et les tiens ! 💕
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
                Ajouter 💖
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
