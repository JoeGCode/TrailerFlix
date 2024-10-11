import { useLayoutEffect, useRef, useState } from "react";
import { Movie } from "../types/movies";
import Loader from "./Loader";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import MoviesRowCard from "./MoviesRowCard";

type MoviesRowType = {
  movies: Movie[];
  title: string;
  isLoading: boolean;
  setHeroMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
};

const MoviesRow = ({
  movies,
  title,
  isLoading,
  setHeroMovie,
}: MoviesRowType) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const updateButtonVisibility = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useLayoutEffect(() => {
    const currentRef = rowRef.current;
    if (currentRef) {
      updateButtonVisibility();
      currentRef.addEventListener("scroll", updateButtonVisibility);
      return () => {
        if (currentRef) {
          currentRef.removeEventListener("scroll", updateButtonVisibility);
        }
      };
    }
  }, [movies]);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth, scrollLeft } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 ml-2">{title}</h2>
      {isLoading && <Loader />}
      {!isLoading && movies && (
        <div className="relative flex items-center">
          {showLeftButton && (
            <button
              className="absolute left-0 z-10 bg-black/80 text-white p-2 h-full"
              onClick={() => scroll("left")}
            >
              <MdChevronLeft size={24} />
            </button>
          )}
          <div
            ref={rowRef}
            className="w-full overflow-x-scroll whitespace-nowrap scroll-smooth relative"
            style={{ scrollbarWidth: "none" }}
          >
            {movies.map((movie) => (
              <MoviesRowCard
                key={movie.id}
                movie={movie}
                setHeroMovie={setHeroMovie}
              />
            ))}
          </div>
          {showRightButton && (
            <button
              className="absolute right-0 z-10 bg-black/80 text-white p-2 h-full"
              onClick={() => scroll("right")}
            >
              <MdChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </section>
  );
};
export default MoviesRow;
