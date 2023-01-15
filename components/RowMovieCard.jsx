import React from "react";

const RowMovieCard = ({ movie, setHeroMovie }) => {
  return (
    <div
      onClick={() => {
        setHeroMovie(movie);
      }}
      className="w-[200px] md:w-[250px] lg:w-[300px] relative inline-block px-2 cursor-pointer"
    >
      <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-80 opacity-0 hover:opacity-100">
        <p className="text-white flex justify-center items-center h-full">
          {movie?.title}
        </p>
      </div>
      <img
        className="w-full h-full"
        src={
          movie?.backdrop_path
            ? `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`
            : "assets/placeholder.jpg"
        }
      />
    </div>
  );
};

export default RowMovieCard;
