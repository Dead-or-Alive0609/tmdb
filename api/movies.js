export default async function handler(req, res) {
  const API_KEY = process.env.TMDB_API_KEY;

  const response = await fetch(
    "https://api.themoviedb.org/3/search/movie?query=avengers",
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
