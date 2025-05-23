import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Spinner from "./Spinner";

function Tag() {
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${tag}&limit=25&offset=0&rating=g&lang=en`;
      const { data } = await axios.get(url);

      if (
        data &&
        data.data &&
        data.data.length > 0 &&
        data.data[0].images &&
        data.data[0].images.fixed_height_small
      ) {
        const imgSource = data.data[0].images.fixed_height_small.url;
        setTag(imgSource);
      } else {
        console.error("No valid GIF found for the given tag.");
        setTag(""); // clear image if not found
      }
    } catch (error) {
      console.error("Error fetching GIF:", error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, tag]);

useEffect(() => {
  if (tag) {
    
  }
}, [tag]);

  function changeHandler(event) {
    setTag(event.target.value);
  }

  return (
    <div className="random-inside-div">
      <p>Search Gifs</p>
      {loading ? (
        <Spinner />
      ) : (
        tag && <img src={tag} alt="Searched GIF" />
      )}
      <input type="text" onChange={changeHandler}  />
      <button className="btn" onClick={fetchData}>
        Generate
      </button>
    </div>
  );
}

export default Tag;
