import { useEffect, useState } from "react";
import { getPodcast } from "../services/PodcastService";

const useHomePage = () => {
  const [podcast, setPodcast] = useState([]);
  const [loadingPodcast, setLoadingPodcast] = useState([false]);
  const [errorPodcast, setErrorPodcast] = useState("");
  useEffect(() => {
    const loadPodcast = async () => {
      try {
        setLoadingPodcast(true);
        const data = await getPodcast();
        setPodcast(data.data.feed.entry);
      } catch (error) {
        setErrorPodcast(error.message);
      } finally {
        setLoadingPodcast(false);
      }
    };
    loadPodcast();
  }, []);

  return { podcast, loadingPodcast, errorPodcast };
};

export default useHomePage;
