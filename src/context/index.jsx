import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [topCurrent, setTopCurrent] = useState([]);
  const [topUpcoming, setTopUpcoming] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [currentSeasonTime, setCurrentSeasonTime] = useState();


  const [error, setError] = useState(null);

  async function fetchTopCurrent() {
    try {
      const response = await fetch(
        "https://api.jikan.moe/v4/top/anime?filter=airing&type=tv"
      );
      const data = await response.json();
      setCurrentSeasonTime(`${data.data[0].year} ${data.data[0].season}`);
      setTopCurrent(data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  async function fetchTopUpcoming() {
    try {
      const response = await fetch(
        "https://api.jikan.moe/v4/top/anime?filter=upcoming&type=tv"
      );
      const data = await response.json();
      setTopUpcoming(data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  async function fetchTopRating() {
    try {
      const response = await fetch(
        "https://api.jikan.moe/v4/top/anime?type=tv"
      );
      const data = await response.json();
      setTopAnime(data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchTopCurrent();
    fetchTopUpcoming();
    fetchTopRating();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ topCurrent, topUpcoming, topAnime, error, currentSeasonTime}}
    >
      {children}
    </GlobalContext.Provider>
  );
}
