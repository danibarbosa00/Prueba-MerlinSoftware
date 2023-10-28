import axios from "axios";

export function getPodcast() {
  return axios.get(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  );
}

export function getSinglePodcast(podcastId) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const originalUrl = `https://itunes.apple.com/lookup?id=${podcastId}`;

  return axios.get(proxyUrl + originalUrl, {
    headers: {
      Origin: "http://localhost:5173",
    },
  });
}

export function getAllEpisodies(podcastId) {
  return axios.get(
    `https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode&limit=9`
  );
}
