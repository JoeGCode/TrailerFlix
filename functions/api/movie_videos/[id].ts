import { MovieVideoResults } from "../../../src/types/movie_videos";

interface Env {
  API_TOKEN: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const API_TOKEN = context.env.API_TOKEN;
  const id = context.params.id;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get movie videos: ${response.status} ${response.statusText}`
      );
    }

    const data: MovieVideoResults = await response.json();
    return Response.json(data.results);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to get movie videos" },
      { status: 500 }
    );
  }
};
