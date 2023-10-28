import { useState, useEffect, useRef } from "react";
import useHomePage from "../../../hooks/useHomePage";
import "./inputSearch.css";
import { Link } from "react-router-dom";

const InputSearch = () => {
  const { podcast } = useHomePage();
  const [text, setText] = useState("");
  const [resultsTitle, setResultsTitle] = useState([]);
  const [resultsArtist, setResultsArtist] = useState([]);
  const resultsRef = useRef(null);

  const handleInputChange = (event) => {
    const searchText = event.target.value;
    setText(searchText);
    if (searchText.trim() === "") {
      setResultsTitle([]);
      setResultsArtist([]);
      return;
    }
    const titleResults = podcast.filter((item) =>
      item["im:name"].label.includes(searchText)
    );
    const artistResults = podcast.filter((item) =>
      item["im:artist"].label.includes(searchText)
    );
    setResultsTitle(titleResults);
    setResultsArtist(artistResults);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setResultsTitle([]);
        setResultsArtist([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="container-podcastLength-inputSearch">
      <span className="podcastLength">{podcast.length}</span>
      <span className="span-input-search">
        <input
          className="input-search"
          placeholder="Filter podcasts..."
          value={text}
          onChange={handleInputChange}
        />
      </span>
      {resultsTitle.length > 0 && (
        <div className="modalResults" ref={resultsRef}>
          <div>
            <h2>Podcast´s titles</h2>

            {resultsTitle.map((item, index) => (
              <Link
                to={"/podcast/" + item.id.attributes["im:id"]}
                key={index}
                className="linkResultsInput"
              >
                <div className="individual-container-search">
                  <img
                    src={item["im:image"][0].label}
                    alt="Imagen del podcast"
                  />
                  <p className="resultsInput" key={index}>
                    {item["im:name"].label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div>
            <h2>Artist´s results</h2>
            {resultsArtist.map((item, index) => (
              <Link
                to={"/podcast/" + item.id.attributes["im:id"]}
                key={index}
                className="linkResultsInput"
              >
                <div className="individual-container-search">
                  <img
                    src={item["im:image"][0].label}
                    alt="Imagen del podcast"
                  />
                  <p className="resultsInput" key={index}>
                    {item["im:artist"].label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSearch;
