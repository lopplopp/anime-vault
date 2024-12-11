import { useRef } from "react";
import Cards from "../cards/cards";
import { useDraggable } from "react-use-draggable-scroll";

export default function Tabs({ list, listType }) {
  const ref = useRef();
  const { events } = useDraggable(ref);

  return (
    <div
      className={
        listType === "Top Current"
          ? "flex flex-col mx-5 my-10"
          : "flex flex-col mx-5 my-10"
      }
    >
      <h1 className={" text-xl font-extrabold text-white"}>{listType}</h1>
      <div
        className={
          listType === "Top Current"
            ? "overflow-x-scroll scrollbar-hidden grid grid-flow-col"
            : "flex flex-wrap"
        }
        {...events}
        ref={ref}
      >
        {list.map((anime) => {
          return <Cards anime={anime} key={anime.mal_id} />;
        })}
      </div>
    </div>
  );
}
