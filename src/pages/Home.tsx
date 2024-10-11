import React from "react";

import { useState } from "react";
import { Movie } from "../types/movies";
import useMovies from "../hooks/useMovies";
import Hero from "../components/Hero";
import MoviesRow from "../components/MoviesRow";

const Home = () => {
  const [heroMovie, setHeroMovie] = useState<Movie>();

  const { movies: popularMovies, loading: loadingPopular } =
    useMovies("popular");
  const { movies: topRatedMovies, loading: loadingTopRated } =
    useMovies("top_rated");
  const { movies: upcomingMovies, loading: loadingUpcoming } =
    useMovies("upcoming");

  const randomMovie = popularMovies
    ? popularMovies[Math.floor(Math.random() * popularMovies.length)]
    : null;
  return (
    <>
      <Hero movie={heroMovie ?? randomMovie} isLoading={loadingPopular} />
      <MoviesRow
        movies={popularMovies}
        title="Popular"
        isLoading={loadingPopular}
        setHeroMovie={setHeroMovie}
      />
      <MoviesRow
        movies={topRatedMovies}
        title="Top Rated"
        isLoading={loadingTopRated}
        setHeroMovie={setHeroMovie}
      />
      <MoviesRow
        movies={upcomingMovies}
        title="Upcoming"
        isLoading={loadingUpcoming}
        setHeroMovie={setHeroMovie}
      />
    </>
  );
};

export default Home;
