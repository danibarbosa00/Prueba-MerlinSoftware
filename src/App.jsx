import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/baseComponents/header/Header";
import "./App.css";
import HomePage from "./app/HomePage";
import PodcastPage from "./app/PodcastPage";
import EpisodePage from "./app/EpisodePage";
import NotFound from "./app/NotFound";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/podcast/:podcastId" element={<PodcastPage />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<EpisodePage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
