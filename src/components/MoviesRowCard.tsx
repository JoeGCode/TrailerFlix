import React from "react";
import { Movie } from "../types/movies";

type MoviesRowCardType = {
  movie: Movie;
  setHeroMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
};

const MoviesRowCard = ({ movie, setHeroMovie }: MoviesRowCardType) => {
  return (
    <div
      key={movie.id}
      className="w-1/4 sm:w-1/5 md:w-1/6 lg:w-[12.5%] px-2 cursor-pointer relative inline-block"
      onClick={() => setHeroMovie(movie)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-md flex flex-col justify-end text-center">
        <div className="w-full h-full absolute inset-0 bg-black/80 opacity-0 hover:opacity-100">
          <p className="flex justify-center items-center h-full px-2">
            <span className="block w-full truncate whitespace-normal">
              {movie.title}
            </span>
          </p>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default MoviesRowCard;
