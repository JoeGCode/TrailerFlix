import { Movie } from "../types/movies";

type MovieBackdropType = {
  movie: Movie;
};
const MovieBackdrop = ({ movie }: MovieBackdropType) => (
  <img
    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
    srcSet={`
        https://image.tmdb.org/t/p/w300${movie.backdrop_path} 300w,
        https://image.tmdb.org/t/p/w780${movie.backdrop_path} 780w,
        https://image.tmdb.org/t/p/w1280${movie.backdrop_path} 1280w,
        https://image.tmdb.org/t/p/original${movie.backdrop_path} 2000w
      `}
    sizes="100vw"
    alt={`${movie.title} backdrop`}
    className="absolute inset-0 h-full w-full object-cover"
  />
);

export default MovieBackdrop;
