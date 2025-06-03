import React, { useState } from "react";
import axios from "axios";
export default function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const [movies, setMovies] = useState([]);
  const btnHandler = () => {
    axios
      // .get(`${API_URL}/3/discover/movie`, {
      //   headers: {
      //     Authorization: `Bearer ${API_KEY}`,
      //   },
      // })
      .get(`${API_URL}/3/search/movie`, {
        params: {
          query: "avengers",
          // query: "범죄도시",
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        console.log("영화 검색 결과:", response.data.results);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
    };  
  return (
    <div>
      <button onClick={btnHandler}>Load Movies</button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: "200px" }}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h4>{movie.original_title}</h4>
          </div>  
        ))}
      </div>
    </div>
  );
}