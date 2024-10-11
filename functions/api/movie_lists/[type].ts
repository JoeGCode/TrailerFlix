import { MovieResults } from "../../../src/types/movies";

interface Env {
  API_TOKEN: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const API_TOKEN = context.env.API_TOKEN;
  const type = context.params.type;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`,
      options
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get movie list: ${response.status} ${response.statusText}`
      );
    }

    const data: MovieResults = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to get movie list" },
      { status: 500 }
    );
  }
};
