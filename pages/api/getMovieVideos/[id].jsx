import axios from "axios";
import { BASE_URL } from "../../../constants/apiConstants";

export default function handler(req, res) {
  const { id } = req.query;
  axios
    .get(
      `${BASE_URL}/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    )
    .then((response) => {
      if (response.data.results.length > 0) {
        const movieVideos = response.data.results;
        const trailer =
          movieVideos.find(
            (movie) =>
              movie.official &&
              movie.site === "YouTube" &&
              movie.type === "Trailer"
          ) ||
          movieVideos[0] ||
          null;
        return res.status(200).json(trailer);
      } else {
        return res.status(404).json({ message: "No trailers found" });
      }
    })
    .catch((error) => {
      return res.status(404).json({ message: error });
    });
}
