import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuizGame from "./pages/QuizGame";
import CatchButtonGame from "./pages/CatchButtonGame";
import LoveLetterGame from "./pages/LoveLetterGame";
import Poems from "./pages/Poems";
import SongWriter from "./pages/SongWriter";
import MusicPlayer from "./pages/MusicPlayer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<QuizGame />} />
          <Route path="/catch" element={<CatchButtonGame />} />
          <Route path="/love-letter" element={<LoveLetterGame />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/song-writer" element={<SongWriter />} />
          <Route path="/music" element={<MusicPlayer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
