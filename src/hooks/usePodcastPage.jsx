import { useEffect, useState } from "react";
import { getSinglePodcast } from "../services/PodcastService";

const usePodcastPage = (podcastId) => {
  const [singlePodcast, setSinglePodcast] = useState([]);
  const [loadingSinglePodcast, setLoadingSinglePodcast] = useState([false]);
  const [errorSinglePodcast, setErrorSinglePodcast] = useState("");
  useEffect(() => {
    const loadSinglePodcast = async () => {
      try {
        setLoadingSinglePodcast(true);
        const data = await getSinglePodcast(podcastId);
        setSinglePodcast(data.data.results);
      } catch (error) {
        setErrorSinglePodcast(error.message);
      } finally {
        setLoadingSinglePodcast(false);
      }
    };
    loadSinglePodcast();
  }, [podcastId]);

  return { singlePodcast, loadingSinglePodcast, errorSinglePodcast };
};

export default usePodcastPage;
