import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);

  const { screenSize } = useContext(GlobalContext);

  console.log(screenSize);
  return (
    <div>
      <div className={
        screenSize.width < 800 ?"relative w-full h-fit bg-[#2e2e2e] text-white px-2 py-3 mb-8  flex-col items-center"
        :"relative w-full h-fit bg-[#2e2e2e] text-white px-32 py-3 mb-8  flex-col items-center"


      }
      >
      
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <h2 className="font-bold text-2xl">Anime Vault</h2>
          </Link>

          {screenSize.width < 800 ? (
            openNav ? (
              <FaX size={"24px"} onClick={() => setOpenNav(false)} />
            ) : (
              <FaBars size={"24px"} onClick={() => setOpenNav(true)} />
            )
          ) : (
            <div className="flex gap-8">
              <Link to={"/"}>
                <div className="text-lg hover:bg-gray-800 hover:scale-105 px-2 py-1 rounded-lg">
                  Home
                </div>
              </Link>
              <Link to={"/season"}>
                <div className="text-lg hover:bg-gray-800 hover:scale-105 px-2 py-1 rounded-lg">
                  Season Anime
                </div>
              </Link>
            </div>
          )}
        </div>

        {openNav ? (
          <div className="text-lg w-1/2 absolute right-2 ">
            <Link to={"/"} onClick={() => setOpenNav(!openNav)}>
              {" "}
              <div className="my-2 py-2 px-2 border-l-4 bg-black/80 rounded-md border-purple-800 hover:bg-gray-700 transition-all duration-200">
                Home
              </div>
            </Link>
            <Link to={"/season"} onClick={() => setOpenNav(!openNav)}>
              <div className="my-2 py-2 px-2 border-l-4 bg-black/80 rounded-md border-purple-800 hover:bg-gray-700 transition-all duration-200">
                Season Anime
              </div>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
