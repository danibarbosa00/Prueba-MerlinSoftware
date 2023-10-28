import { Link, useParams } from "react-router-dom";
import "./episodePage.css";
import usePodcastPage from "../../hooks/usePodcastPage";
import useAllEpisodies from "../../hooks/useAllEpisodies";

const EpisodePage = () => {
  const { podcastId, episodeId } = useParams();
  const { singlePodcast, loadingSinglePodcast, errorSinglePodcast } =
    usePodcastPage(podcastId);
  const { allEpisodies } = useAllEpisodies(podcastId);

  const episodeIdNumber = +episodeId;
  const objetoCoincidente = allEpisodies.find(
    (object) => object.trackId === episodeIdNumber
  );

  let trackName, description, episodeUrl;

  if (objetoCoincidente) {
    trackName = objetoCoincidente.trackName;
    description = objetoCoincidente.description;
    episodeUrl = objetoCoincidente.episodeUrl;
  }

  return (
    <div className="container-EpisodePage">
      <div>
        {loadingSinglePodcast ? (
          <p className="loading">Loading...</p>
        ) : errorSinglePodcast ? (
          <p>Error: {errorSinglePodcast}</p>
        ) : (
          <div className="containerPodcastPage">
            <div className="containerSinglePodcast-Episodes">
              <Link to={`/podcast/${podcastId}`} className="link">
                <img
                  src={singlePodcast[0].artworkUrl100}
                  alt={singlePodcast[0].collectionName}
                />
              </Link>
              <Link to={`/podcast/${podcastId}`} className="link">
                <p className="bold-p">{singlePodcast[0].collectionName}</p>
                <p className="cursive-p">{singlePodcast[0].artistName}</p>
              </Link>
              <p className="description-p">Description:</p>
              {description ? (
                <p className="cursive-p">{description.substring(0, 400)}...</p>
              ) : (
                "There is no description"
              )}
            </div>
          </div>
        )}
      </div>
      <div className="info-episode">
        <h1 className="title-episode">{trackName}</h1>
        <p className="description-episode">{description}</p>
        <audio
          src={episodeUrl}
          type="audio"
          controls
          className="audio-episode"
        ></audio>
      </div>
    </div>
  );
};

export default EpisodePage;
