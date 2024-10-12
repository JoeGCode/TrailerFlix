import { Movie } from "../types/movies";

type MoviePosterType = {
  movie: Movie;
};
const MoviePoster = ({ movie }: MoviePosterType) => (
  <img
    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
    srcSet={`
    https://image.tmdb.org/t/p/w92${movie.poster_path} 92w,
    https://image.tmdb.org/t/p/w154${movie.poster_path} 154w,
    https://image.tmdb.org/t/p/w185${movie.poster_path} 185w,
    https://image.tmdb.org/t/p/w342${movie.poster_path} 342w,
    https://image.tmdb.org/t/p/w500${movie.poster_path} 500w,
    https://image.tmdb.org/t/p/w780${movie.poster_path} 780w,
    https://image.tmdb.org/t/p/original${movie.poster_path} 2000w
  `}
    sizes="
        (max-width: 640px) calc(25vw - 1rem),
        (max-width: 768px) calc(20vw - 1rem),
        (max-width: 1024px) calc(16.67vw - 1rem),
        calc(12.5vw - 1rem)
      "
    alt={`${movie.title} poster`}
    className="h-full w-full object-cover"
  />
);

export default MoviePoster;
