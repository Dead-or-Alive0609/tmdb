export default async function handler(req, res) {
  try {
    console.log("🚀 serverless 함수 시작");

    const API_KEY = process.env.TMDB_API_KEY;
    console.log("🔑 process.env.TMDB_API_KEY:", API_KEY ? "[OK]" : "[MISSING]");

    if (!API_KEY) {
      return res.status(500).json({ error: "Missing TMDB_API_KEY" });
    }

    const query = req.query.query || "avengers";
    console.log("📩 전달된 query:", query);

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=ko-KR`;
    console.log("🌐 TMDB 요청 URL:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });

    console.log("📡 TMDB 응답 상태 코드:", response.status);

    const text = await response.text();
    console.log("📦 응답 텍스트(미리 보기):", text.slice(0, 100)); // 너무 길면 짜름

    if (!response.ok) {
      return res.status(response.status).json({
        error: "TMDB API 요청 실패",
        detail: text,
      });
    }

    const data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (err) {
    console.error("🔥 서버에서 예외 발생:", err.stack || err.message || err);
    return res.status(500).json({
      error: "Internal Server Error",
      detail: err.message,
    });
  }
}
