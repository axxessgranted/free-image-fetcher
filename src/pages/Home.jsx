import React, { useState, useEffect } from "react";
import ImageBox from "../components/ImageBox";
import NavBar from "../components/NavBar";
import { fetchImages } from "../services/model-api";
import { getRandom, loaderMessages } from "../utilities/utils";

const Home = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [promptQuery, setPromptQuery] = useState("");
  const [loaderMessage, setLoaderMessage] = useState(loaderMessages[0]);

  useEffect(() => {
    const loaderInterval = setInterval(() => {
      setLoaderMessage(getRandom(loaderMessages));
    }, 3000);
    // to avoid memory leak
    return () => {
      clearInterval(loaderInterval);
    };
  }, [loaderMessage]);

  const handleSearch = (event) => {
    setPromptQuery(event.target.value);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      setShowLoader(true);

      const imageUrl = await fetchImages(promptQuery);
      setImageResult(imageUrl);

      setShowLoader(false);
    } catch (error) {
      // Handle error
      console.error("Error fetching images from API:", error);
      setShowLoader(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="surpriseBox">
        <label>Download a pexels image!</label>
        <label>Bring your imaginations into reality!</label>
      </div>
      <div>
        <input
          type="text"
          id="prompt"
          value={promptQuery}
          onChange={handleSearch}
          placeholder="A plush toy robot sitting against a yellow wall"
          className="promptInput"
        />
      </div>
      <div>
        <button onClick={handleGenerate}>Get the Image</button>
      </div>

      {showLoader ? (
        <div style={{ margin: 40 }}>Blazing fast results... ⚡️⚡️⚡️</div>
      ) : (
        <>
          <ImageBox promptQuery={promptQuery} imageResult={imageResult} />
        </>
      )}
      <div className="slideShowMessage">{loaderMessage}</div>
      <div className="footer">Powered by Pexels</div>
    </div>
  );
};

export default Home;
