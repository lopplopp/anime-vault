import { Link } from "react-router-dom";

export default function Cards({ anime }) {
  return (
    <Link draggable="false" to={`/${anime.mal_id}`} state={{ anime: anime }}>
      <div className="w-48 h-64 relative rounded-lg overflow-hidden m-3 hover:scale-110 transition-all duration-200">
        <p className="absolute text-white top-1 left-1 rounded-lg p-1 bg-purple-600/80 text-md z-10">
          {anime.score?anime.score:'N/A'}
        </p>
        <img
          draggable="false"
          src={anime.images.jpg.image_url}
          alt="anime image"
          className="w-full h-full z-0 absolute"
        />
        <div className="z-10 w-full h-24 bg-gradient-to-b from-transparent to-black absolute bottom-0"></div>
        <p className="absolute bottom-0 z-20 py-2 px-1 left-0 text-md text-white">
          {anime.title_english ? anime.title_english : anime.title}
        </p>
      </div>
    </Link>
  );
}
