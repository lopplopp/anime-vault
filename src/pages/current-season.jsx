import { useEffect, useRef, useState } from "react";
import Tabs from "../components/tabs/tabs";
import { Link } from "react-router-dom";
import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";

export default function CurrentSeasonalPage() {
  const [seasonAnime, setSeasonAnime] = useState([]);
  const [loadmore, setLoadmore] = useState(false);
  // const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const page = useRef(1);
  const animeData = useRef();
  const year = useRef();
  const season = useRef();
  const seasonList = ["winter", "spring", "summer", "fall"];
  const [loading, setLoading] = useState(true);

  async function fetchCurrentSeason() {
    let current = [];
    page.current = 1;
    let response = await fetch(
      `https://api.jikan.moe/v4/seasons/now?filter=tv&sfw=true&unapproved=true&page=${page.current}`
    );
    animeData.current = await response.json();
    current = animeData.current.data;
    year.current = current[0].year;
    season.current = current[0].season;
    if (animeData.current.pagination.has_next_page) {
      setLoadmore(true);
      // page.current++;
      // response = await fetch(
      //   `https://api.jikan.moe/v4/seasons/now?filter=tv&sfw=true&unapproved=true&page=${page.current}`
      // );
      // animeData.current = await response.json();
      // current.push(animeData.current.data);
    }
    setSeasonAnime(current.flat());
  }

  async function loadmoreAnime() {
    let current = [...seasonAnime];
    while (animeData.current.pagination.has_next_page) {
      page.current++;
      let response = await fetch(
        `https://api.jikan.moe/v4/seasons/now?filter=tv&sfw=true&unapproved=true&page=${page.current}`
      );
      animeData.current = await response.json();
      current.push(animeData.current.data);
    }
    setLoadmore(false);
    setSeasonAnime(current.flat());
  }

  useEffect(() => {
    fetchCurrentSeason();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
            {seasonAnime && seasonAnime.length ? (
              <div>
                <div className="grid grid-cols-3 justify-center text-center text-lg font-semibold ">
                  <Link
                    to={
                      season === seasonList[0]
                        ? `/season/${year.current - 1}/${seasonList[3]}`
                        : `/season/${year.current}/${
                            seasonList[seasonList.indexOf(season.current) - 1]
                          }`
                    }
                  >
                    <p className="mx-24 hover:bg-gray-500">
                      {season.current === seasonList[0]
                        ? `${year.current - 1} ${seasonList[3]}`
                        : `${year.current} ${
                            seasonList[seasonList.indexOf(season.current) - 1]
                          }`}
                    </p>
                  </Link>

                  <p className="bg-slate-200 text-black mx-24">
                    {year.current + " " + season.current}
                  </p>
                </div>
                <div className="relative">
                  <Tabs list={seasonAnime} />
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
