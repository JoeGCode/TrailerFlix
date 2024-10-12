import { useEffect, useState } from "react";
import { Movie } from "../types/movies";
import Loader from "./Loader";
import { MovieVideo } from "../types/movie_videos";
import { MdPlayCircle } from "react-icons/md";
import MovieBackdrop from "./MovieBackdrop";

type HeroProps = {
  movie: Movie | null;
  isLoading: boolean;
};

export default function Hero({ movie, isLoading = false }: HeroProps) {
  const [videos, setVideos] = useState<MovieVideo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const heroVideo =
    videos.find(
      (video) =>
        video.official && video.site === "YouTube" && video.type === "Trailer"
    ) ||
    videos[0] ||
    null;
  const showWatchButton = heroVideo ? true : false;

  useEffect(() => {
    setVideos([]);
    const controller = new AbortController();

    const fetchVideos = async () => {
      try {
        const response = await fetch(`/api/movie_videos/${movie?.id}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch movie videos");
        }
        const data: MovieVideo[] = await response.json();
        setVideos(data);
      } catch (error) {
        if (typeof error === "string") {
          console.error(error.toUpperCase());
        } else if (error instanceof Error) {
          if (error.name !== "AbortError") {
            console.error(error.message);
          }
        }
      }
    };

    if (movie) {
      fetchVideos();
    }

    return () => {
      controller.abort();
    };
  }, [movie]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {isLoading && <Loader />}
      {!isLoading && movie && (
        <div>
          {/* Background Image */}
          <MovieBackdrop movie={movie} />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

          {/* Content */}
          <div className="absolute bottom-0 z-10 flex h-full flex-col items-start justify-end p-4 sm:p-6 md:p-12">
            <h1 className="mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
              {movie.title}
            </h1>
            <p className="mb-4 max-w-md text-sm sm:text-base md:text-lg lg:text-xl line-clamp-3 sm:line-clamp-none">
              {movie.overview}
            </p>
            <div className="flex">
              {showWatchButton && (
                <button
                  onClick={openModal}
                  className="flex gap-2 items-center rounded bg-white px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-bold text-black transition hover:bg-opacity-80"
                >
                  <MdPlayCircle size={20} />
                  Watch Trailer
                </button>
              )}
            </div>
          </div>
          {/* Modal */}
          {showModal && (
            <div
              className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black bg-opacity-50 p-4 pt-32 sm:p-4"
              onClick={closeModal}
            >
              <div
                className="relative w-full max-w-[90vw] sm:max-w-4xl rounded-lg bg-black p-2 sm:p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute -top-10 right-0 bg-black rounded-md px-2 py-1 text-sm sm:text-base hover:text-gray-300"
                >
                  Close
                </button>
                <div className="aspect-video">
                  {heroVideo ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${heroVideo.key}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    ></iframe>
                  ) : (
                    <p className="flex h-full items-center justify-center text-white">
                      No trailer available
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
