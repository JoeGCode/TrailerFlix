import axios from "axios";
import { BASE_URL } from "../../constants/apiConstants";

export default async function handler(req, res) {
  const response = await axios.get(
    `${BASE_URL}/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
  );
  return res.status(200).send(response.data.results);
}
