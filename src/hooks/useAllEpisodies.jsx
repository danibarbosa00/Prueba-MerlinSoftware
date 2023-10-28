import { useEffect, useState } from "react";
import { getAllEpisodies } from "../services/PodcastService";

const useAllEpisodies = (podcastId) => {
  const [allEpisodies, setAllEpisodies] = useState([]);
  const [loadingAllEpisodies, setLoadingAllEpisodies] = useState([false]);
  const [errorAllEpisodies, setErrorAllEpisodies] = useState("");
  useEffect(() => {
    const loadAllEpisodies = async () => {
      try {
        setLoadingAllEpisodies(true);
        const data = await getAllEpisodies(podcastId);
        setAllEpisodies(data.data.results);
      } catch (error) {
        setErrorAllEpisodies(error.message);
      } finally {
        setLoadingAllEpisodies(false);
      }
    };
    loadAllEpisodies();
  }, [podcastId]);

  return { allEpisodies, loadingAllEpisodies, errorAllEpisodies };
};

export default useAllEpisodies;
