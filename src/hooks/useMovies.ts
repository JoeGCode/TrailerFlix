import { useState, useEffect } from "react";
import { Movie, MovieResults } from "../types/movies";

type MovieCategory = "popular" | "top_rated" | "upcoming";

const useMovies = (
  category: MovieCategory | null = null,
  genreId: number | null = null
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        let url = "";
        if (category) {
          url = `/api/movie_lists/${category}`;
        } else if (genreId) {
          url = `/api/movies_by_genre/${genreId}`;
        }

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data: MovieResults = await response.json();
        setMovies(data.results);
      } catch (error) {
        if (typeof error === "string") {
          setError(error.toUpperCase());
          console.error(error.toUpperCase());
        } else if (error instanceof Error) {
          if (error.name !== "AbortError") {
            setError(error.message);
            console.error(error.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [category, genreId]);

  return { movies, loading, error };
};

export default useMovies;
