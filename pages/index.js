import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Hero from "../components/Hero";
import Row from "../components/Row";

export default function Home({ moviesData, randomMovie }) {
  const [movies, setMovies] = useState(moviesData);
  const [heroMovie, setHeroMovie] = useState(null);

  return (
    <>
      <Hero movie={heroMovie || randomMovie} />
      <Row
        title="Popular Films"
        moviesList={movies}
        getUrl={"/api/getPopular"}
        setHeroMovie={setHeroMovie}
      />
      <Row
        title="Top Rated Films"
        getUrl={"/api/getTopRated"}
        setHeroMovie={setHeroMovie}
      />
      <Row
        title="Upcoming Films"
        getUrl={"/api/getUpcoming"}
        setHeroMovie={setHeroMovie}
      />
      <Row
        title="Sci-Fi Films"
        getUrl={"/api/getScienceFiction"}
        setHeroMovie={setHeroMovie}
      />
      <Row
        title="Action Films"
        getUrl={"/api/getAction"}
        setHeroMovie={setHeroMovie}
      />
    </>
  );
}

export async function getServerSideProps() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
  );

  return {
    props: {
      moviesData: response.data.results,
      randomMovie:
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ],
    },
  };
}
