import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [releaseYear, setReleaseYear] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = "f86fa1737074f367790775cd55406a1c";
        const apiUrl = "https://api.themoviedb.org/3/discover/movie";

        const params = {
          api_key: apiKey,
          primary_release_year: 1995,
          with_original_language: "en",
          "vote_count.gte": 100,
        };

        const response = await axios.get(apiUrl, { params });

        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    // Function to pick two random movies from the list
    const pickRandomMovies = () => {
      if (movies.length >= 2) {
        const randomIndices = [];
        while (randomIndices.length < 2) {
          const randomIndex = Math.floor(Math.random() * movies.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }
        const randomMoviesArray = randomIndices.map((index) => movies[index]);
        setRandomMovies(randomMoviesArray);
      }
    };

    pickRandomMovies();
  }, [movies]);

  const handleReleaseYearChange = (event) => {
    setReleaseYear(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="m-3">
        <label>Release Year:</label>
        <input
          className="outline-none border ml-2"
          type="text"
          id="releaseYear"
          value={releaseYear}
          onChange={handleReleaseYearChange}
        />
      </div>
      <div className="flex">
        {randomMovies.map((movie) => (
          <div className="m-4 flex flex-col items-center" key={movie.id}>
            <img
              className="rounded-lg"
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.title}
            />
            {movie.title}
          </div>
        ))}
      </div>
      <div className="m-3">
        <button className="bg-green-500 hover:bg-green-400 w-52 h-12 rounded-xl">
          <h3 className="text-2xl font-bold text-white">Go</h3>
        </button>
      </div>
    </div>
  );
};

export default MovieList;
