import { useLocation } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";


export default function AnimePage() {
  const location = useLocation();
  const anime = location.state.anime;
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAnimeCharacter() {
    try {
      fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/characters`)
        .then((response) => response.json())
        .then((json) => {
          if (json?.data?.length > 25) {
            return json?.data?.slice(0, 25);
          }
        })
        .then((data) => setCharacters(data));
    } catch (error) {
      throw new error(error);
    }
  }

  useEffect(() => {
    window.scrollTo({top:0})
    fetchAnimeCharacter();
    setTimeout(() => {
      setLoading(false)
    }, 1200);
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
          <div className="px-32 py-3 text-white">
            <div className=" flex gap-4">
              <img
                src={anime.images.jpg.image_url}
                alt="anime image"
                className="rounded-lg"
              />
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-5xl mb-3">
                  {anime.title_english ? anime.title_english : anime.title}
                </h2>
                <div className="flex gap-4">
                  <div className="py-0.5 px-3 bg-gradient-to-br from-purple-700 to-purple-400 rounded-md">
                    {anime.type}
                  </div>
                  <div className="py-0.5 px-3 bg-gradient-to-br from-purple-700 to-purple-400 rounded-md">
                    EPs {anime.episodes ? anime.episodes : "N/A"}
                  </div>
                  <div className="py-0.5 px-3 bg-gradient-to-br from-purple-700 to-purple-400 rounded-md flex gap-1 items-center">
                    <FaStar size={"14px"} />
                    {anime.score ? anime.score : "N/A"}
                  </div>
                  <div className="py-0.5 px-3 bg-gradient-to-br from-purple-700 to-purple-400 rounded-md flex gap-1 items-center">
                    <FaHeart size={"14px"} />
                    {anime.popularity ? anime.popularity : "N/A"}
                  </div>
                </div>
                <div>
                  <p>{anime.synopsis}</p>
                </div>
                <div className="flex gap-4">
                  {anime.genres.map((genre) => {
                    return (
                      <p
                        className="bg-purple-950 px-3 py-0.5 rounded-sm border-purple-600 border"
                        key={genre.name}
                      >
                        {genre.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="font-bold text-4xl my-5 border-l-4 pl-4 border-purple-700 ">
                Character
              </h3>
              <div className="flex flex-wrap gap-5">
                {characters ? (
                  characters?.map((character) => {
                    return (
                      <div className="relative">
                        <div
                          className={
                            character.role === "Main"
                              ? "bg-green-600/80 py-1 px-1.5 rounded-lg absolute top-1 left-3"
                              : "bg-orange-500/80 py-1 px-1.5 rounded-lg absolute top-1 left-3"
                          }
                        >
                          {character.role}
                        </div>
                        <img
                          src={character.character.images.jpg.image_url}
                          alt="character image"
                          className="h-80 w-52 rounded-lg"
                        />
                        <div className="z-10 w-full h-24 bg-gradient-to-b from-transparent to-black absolute bottom-0"></div>
                        <div className="absolute bottom-1 left-3 z-10">
                          {character.character.name}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Currently there are no character infomation</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
