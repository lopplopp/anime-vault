import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import Tabs from "../components/tabs/tabs";
import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";

export default function Home() {
  const { topCurrent, topUpcoming, topAnime, screenSize } = useContext(GlobalContext);
  const [loadmoreTop, setLoadmoreTop] = useState(true);
  const [loadmoreUpcoming, setLoadmoreUpcoming] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  },[]);

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
          <div className="">
            <Tabs list={topCurrent} listType={"Top Current"} />
          </div>
          <div className={screenSize.width<800?"flex flex-col justify-center items-center"
            :"grid grid-cols-2"}>
            <div>
              {loadmoreTop ? (
                <div className="relative flex">
                  <Tabs list={topAnime.slice(0, 6)} listType={"Top Anime"} />
                  <div className="absolute flex justify-center items-center bottom-0 w-full h-1/6 bg-gradient-to-b from-transparent via-[rgb(34,34,34)]/95 to-[rgb(34,34,34)] z-30">
                    <button
                      onClick={() => setLoadmoreTop(false)}
                      className="bg-purple-600 p-2 mb-8 rounded-lg"
                    >
                      Load More
                    </button>
                  </div>
                </div>
              ) : (
                <Tabs list={topAnime} listType={"Top Anime"} />
              )}
            </div>
            <div>
              {loadmoreUpcoming ? (
                <div className="relative flex">
                  <Tabs list={topUpcoming.slice(0, 6)} listType={"Top Anime"} />
                  <div className="absolute flex justify-center items-center bottom-0 w-full h-1/6 bg-gradient-to-b from-transparent via-[rgb(34,34,34)]/95 to-[rgb(34,34,34)] z-30">
                    <button
                      onClick={() => setLoadmoreUpcoming(false)}
                      className="bg-purple-600 p-2 mb-8 rounded-lg"
                    >
                      Load More
                    </button>
                  </div>
                </div>
              ) : (
                <Tabs list={topUpcoming} listType={"Top Upcoming"} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
