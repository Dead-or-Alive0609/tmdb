// export default async function handler(req, res) {
//   const API_KEY = process.env.TMDB_API_KEY;

//   const response = await fetch(
//     "https://api.themoviedb.org/3/search/movie?query=avengers",
//     {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         accept: "application/json",
//       },
//     }
//   );

//   const data = await response.json();
//   res.status(200).json(data);
// }

export default async function handler(req, res) {
  const API_KEY = process.env.TMDB_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "Missing TMDB_API_KEY" });
  }

  const query = req.query.query || "avengers"; // 기본 검색어

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=ko-KR`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "TMDB API 요청 실패" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("TMDB fetch error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
