import { useEffect, useRef, useState } from "react";
import Tabs from "../components/tabs/tabs";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context";
import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";

export default function SeasonalAnime() {
  const { year, season } = useParams();
  const [animeList, setAnimeList] = useState([]);
  const [loadmore, setLoadmore] = useState(false);
  const [loading, setLoading] = useState(true);
  const page = useRef(1);
  const animeData = useRef();
  const { currentSeasonTime } = useContext(GlobalContext);
  let nextSeason;

  const seasonList = ["winter", "spring", "summer", "fall"];

  if (season === seasonList[3]) {
    nextSeason = `${parseInt(year) + 1} ${seasonList[0]}`;
  } else {
    nextSeason = `${year} ${seasonList[seasonList.indexOf(season) + 1]}`;
  }

  async function fetchAnime() {
    page.current = 1;
    let anime = [];
    let response = await fetch(
      `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=tv&sfw=true&unapproved=true&page=${page.current}`
    );
    animeData.current = await response.json();
    anime = animeData.current.data;
    if (animeData.current.pagination.has_next_page) {
      setLoadmore(true);
      // page.current++;
      // response = await fetch(
      //   `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=tv&sfw=true&unapproved=true&page=${page.current}`
      // );
      // animeData.current = await response.json();
      // anime.push(animeData.current.data);
    }
    setAnimeList(anime.flat());
  }

  async function loadmoreAnime() {
    let current = [...animeList];
    while (animeData.current.pagination.has_next_page) {
      page.current++;
      let response = await fetch(
        `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=tv&sfw=true&unapproved=true&page=${page.current}`
      );
      animeData.current = await response.json();
      current.push(animeData.current.data);
    }
    setLoadmore(false);
    setAnimeList(current.flat());
  }

  useEffect(() => {
    setLoading(true)
    setAnimeList([]);
    fetchAnime();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [season]);

  return (
    <>
      {loading ? (
        <div className="flex h-svh justify-center items-center">
          <ReactLoading
            type={"bars"}
            color={"gray"}
            height={100}
            width={100}
          ></ReactLoading>
        </div>
      ) : (
        <>
          <div className="text-white px-12">
            {animeList && animeList.length ? (
              <div>
                <div className="grid grid-cols-3 justify-center text-center text-lg font-semibold ">
                  <Link
                    to={
                      season === seasonList[0]
                        ? `/season/${parseInt(year) - 1}/${seasonList[3]}`
                        : `/season/${year}/${
                            seasonList[seasonList.indexOf(season) - 1]
                          }`
                    }
                  >
                    <p className="mx-24 hover:bg-gray-500">
                      {season === seasonList[0]
                        ? `${parseInt(year) - 1} ${seasonList[3]}`
                        : `${year} ${
                            seasonList[seasonList.indexOf(season) - 1]
                          }`}
                    </p>
                  </Link>

                  <p className="bg-slate-200 text-black mx-24">
                    {year + " " + season}
                  </p>
                  <Link
                    to={
                      nextSeason === currentSeasonTime
                        ? "/season"
                        : season === seasonList[3]
                        ? `/season/${parseInt(year) + 1}/${seasonList[0]}`
                        : `/season/${year}/${
                            seasonList[seasonList.indexOf(season) + 1]
                          }`
                    }
                  >
                    <p className="mx-24 hover:bg-gray-500">
                      {season === seasonList[3]
                        ? `${parseInt(year) + 1} ${seasonList[0]}`
                        : `${year} ${
                            seasonList[seasonList.indexOf(season) + 1]
                          }`}
                    </p>
                  </Link>
                </div>
                <div className="relative">
                  <Tabs list={animeList} />
                  {loadmore ? (
                    <div className="absolute flex justify-center items-center bottom-0 w-full h-1/2 bg-gradient-to-b from-transparent via-black/95 to-black z-30">
                      <button
                        onClick={loadmoreAnime}
                        className="bg-purple-600 p-2 mb-8 rounded-lg"
                      >
                        Load More
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </>
  );
}
