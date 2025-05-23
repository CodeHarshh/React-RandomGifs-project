import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Spinner from "./Spinner";

function Random() {
  const [randomGif, setRandomGif] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

  // Wrap fetchData in useCallback to avoid useEffect warning
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`;
      const output = await axios.get(url);
      const imgSource = output.data.data.images.original.url;
      setRandomGif(imgSource);
    } catch (error) {
      console.error("Error fetching GIF:", error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="random-inside-div">
      <p>Random GIFs</p>
      {loading ? (
        <Spinner />
      ) : (
        <img
          src={randomGif}
          alt="Random GIF"
          style={{ maxWidth: "200px", maxHeight: "100px" }}
        />
      )}
      <button className="btn" onClick={fetchData}>
        Generate
      </button>
    </div>
  );
}

export default Random;
