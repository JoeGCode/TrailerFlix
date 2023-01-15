import axios from "axios";
import { BASE_URL } from "../../constants/apiConstants";

export default async function handler(req, res) {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=878`
  );
  return res.status(200).send(response.data.results);
}
