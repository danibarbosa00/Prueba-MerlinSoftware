import { Link } from "react-router-dom";
import useHomePage from "../../hooks/useHomePage";
import InputSearch from "../../components/specificComponents/inputSearch";
import "./homePage.css";

const HomePage = () => {
  const { podcast, loadingPodcast, errorPodcast } = useHomePage();

  return (
    <div className="container-HomePage">
      {loadingPodcast ? (
        <>
          <p className="loading">Loading...</p>
        </>
      ) : errorPodcast ? (
        <p>Error: {errorPodcast}</p>
      ) : (
        <>
          <InputSearch />
          <div className="globalPodcast">
            {podcast.map((item, index) => (
              <Link
                className={"individualPodcast"}
                to={"/podcast/" + item.id.attributes["im:id"]}
                key={index}
              >
                <div>
                  <img
                    src={item["im:image"][0].label}
                    alt="Imagen del podcast"
                  />
                  <p className="individualPodcast-name">
                    {item["im:name"].label}
                  </p>
                  <p className="individualPodcast-artist">
                    Author: {item["im:artist"].label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
