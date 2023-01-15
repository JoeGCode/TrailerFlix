import React, { useEffect, useRef, useState } from "react";
import RowMovieCard from "./RowMovieCard";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";

const Row = ({ title, moviesList, setHeroMovie, getUrl }) => {
  const slider = useRef();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!moviesList) {
      axios.get(getUrl).then((response) => {
        setMovies(response.data);
      });
    } else {
      setMovies(moviesList);
    }
  }, [getUrl, moviesList]);

  const scrollAmount = 300;

  function scrollLeft() {
    slider.current.scrollLeft = slider.current.scrollLeft - scrollAmount;
  }

  function scrollRight() {
    slider.current.scrollLeft = slider.current.scrollLeft + scrollAmount;
  }

  return (
    <>
      <h2 className="text-white font-bold p-4 text-lg md:text-xl">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={scrollLeft}
          className="bg-white left-0 h-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={50}
        />
        <div
          ref={slider}
          className="w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies?.map((movie) => {
            return (
              <RowMovieCard
                movie={movie}
                setHeroMovie={setHeroMovie}
                key={movie.id}
              />
            );
          })}
        </div>
        <MdChevronRight
          onClick={scrollRight}
          className="bg-white right-0 h-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={50}
        />
      </div>
    </>
  );
};

export default Row;
