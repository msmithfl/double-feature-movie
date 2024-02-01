import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Popular() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const apiKey = "f86fa1737074f367790775cd55406a1c";
      const apiUrl = "https://api.themoviedb.org/3/discover/movie";

      const params = {
        api_key: apiKey,
        with_original_language: "en",
        "vote_count.gte": 50,
        page: 1,
      };

      const response = await axios.get(apiUrl, { params });
      console.log(response);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="text-center bg-slate-200 text-black pb-10">
      <h1 className="text-3xl m-7">Popular This Week</h1>
      <div className="flex flex-wrap justify-center">
        {movies.map((movie) => (
          <div key={movie.id} className="flex flex-col items-center m-4">
            <Link
              to={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
            >
              <img
                className=" rounded-lg"
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
                width={200}
              />
            </Link>
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
