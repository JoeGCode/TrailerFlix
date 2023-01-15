import React, { useEffect, useState } from "react";
import axios from "axios";

import placeholder from "../public/assets/placeholder.jpg";

import YouTube from "react-youtube";
import Image from "next/image";

const Hero = ({ movie }) => {
  const [movieTrailer, setMovieTrailer] = useState();
  const [playTrailer, setPlayTrailer] = useState(false);
  const [showPlayTrailerButton, setShowPlayTrailerButton] = useState(true);

  useEffect(() => {
    if (movie) {
      axios
        .get(`/api/getMovieVideos/${movie.id}`)
        .then((response) => {
          setMovieTrailer(response.data);
          setShowPlayTrailerButton(true);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setShowPlayTrailerButton(false);
        });
    }
  }, [movie]);

  function shortenOverview(overview, limit) {
    if (overview?.length > limit) {
      return overview.slice(0, limit) + "...";
    } else {
      return overview;
    }
  }

  function renderMovieOverview(movie) {
    return (
      <>
        <div className="absolute w-full h-[500px] bg-gradient-to-t from-black z-10"></div>
        <div className="absolute w-full h-[500px] bg-gradient-to-r from-black z-10"></div>
        <Image
          fill
          className="w-full h-full object-cover object-top"
          src={
            movie?.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
              : placeholder
          }
          alt={movie?.title}
        />
        <div className="absolute top-[20%] p-4 z-20">
          <h1 className="font-bold text-4xl">{movie?.title}</h1>
          <div className="my-6">
            {showPlayTrailerButton && (
              <button
                onClick={() => setPlayTrailer(true)}
                className="border py-2 px-4 text-black bg-gray-200 border-gray-200"
              >
                Watch Trailer
              </button>
            )}
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full sm:w-3/4 md:w-[70%] lg:w-2/3 text-gray-100">
            {shortenOverview(movie?.overview, 220)}
          </p>
        </div>
      </>
    );
  }

  function renderTrailerContainer(trailer) {
    return (
      <>
        <button
          onClick={() => setPlayTrailer(false)}
          className="absolute z-50 left-4 bottom-12 border py-1 px-2 text-black bg-gray-200 border-gray-200"
        >
          Close
        </button>
        <YouTube
          className="absolute top-0 left-0 right-0 bottom-0"
          opts={{ width: "100%", height: "100%" }}
          videoId={trailer?.key}
        />
      </>
    );
  }

  return (
    <div className="relative w-full h-[500px] text-white">
      {playTrailer && movieTrailer
        ? renderTrailerContainer(movieTrailer)
        : renderMovieOverview(movie)}
    </div>
  );
};

export default Hero;
