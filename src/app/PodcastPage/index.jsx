import { Link, useParams } from "react-router-dom";
import usePodcastPage from "../../hooks/usePodcastPage";
import useAllEpisodies from "../../hooks/useAllEpisodies";
import "./podcastPage.css";

const PodcastPage = () => {
  const { podcastId } = useParams();
  const { singlePodcast, loadingSinglePodcast, errorSinglePodcast } =
    usePodcastPage(podcastId);
  const { allEpisodies } = useAllEpisodies(podcastId);

  const formattedDate = (date) => {
    const releaseDate = new Date(date);
    return `${releaseDate.getDate()}/${
      releaseDate.getMonth() + 1
    }/${releaseDate.getFullYear()}`;
  };

  const formattedTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      {loadingSinglePodcast ? (
        <p className="loading">Loading...</p>
      ) : errorSinglePodcast ? (
        <p>Error: {errorSinglePodcast}</p>
      ) : (
        <div className="containerPodcastPage">
          <div className="containerSinglePodcast">
            <img
              src={singlePodcast[0].artworkUrl100}
              alt={singlePodcast[0].collectionName}
            />
            <p className="bold-p">{singlePodcast[0].collectionName}</p>
            <p className="cursive-p">{singlePodcast[0].artistName}</p>
            <p className="description-p">Description:</p>

            {allEpisodies[1] && allEpisodies[1].description ? (
              <p className="cursive-p">
                {allEpisodies[1].description.substring(0, 400)}...
              </p>
            ) : (
              "There is no description"
            )}
          </div>
          <div className="containerEpisodies">
            <div className="numberEpisodies">
              Episodes: {singlePodcast[0].trackCount}
            </div>
            <div className="episodies">
              <div className="container-title">
                <span className="titleEpisode">Title</span>
                {allEpisodies.map((item, index) => (
                  <Link
                    className="link-episode"
                    to={`/podcast/${podcastId}/episode/${item.trackId}`}
                    key={index}
                  >
                    <p key={index} className="nameEpisode">
                      {item.trackName}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="container-date">
                <span className="dateSpanEpisode">Date</span>
                {allEpisodies.map((item, index) => (
                  <p key={index} className="dateEpisode">
                    {formattedDate(item.releaseDate)}
                  </p>
                ))}
              </div>
              <div className="container-duration">
                <span className="durationSpanEpisode">Duration</span>
                {allEpisodies.map((item, index) => (
                  <p key={index} className="timeEpisode">
                    {formattedTime(item.trackTimeMillis)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastPage;
