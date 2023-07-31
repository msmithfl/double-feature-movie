import React, { useEffect, useState } from "react";
import axios from "axios";
import poster_placeholder from "../src/assets/poster-placeholder.png";

const Layout = () => {
  const [movies, setMovies] = useState([]);
  const [posterPaths, setPosterPaths] = useState([]);
  const [releaseYear, setReleaseYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    // Initialize all poster paths with the placeholder
    const placeholderPosters = Array.from(
      { length: 2 },
      () => poster_placeholder
    );
    setPosterPaths(placeholderPosters);
  }, []);

  const fetchMovies = async () => {
    try {
      const apiKey = "f86fa1737074f367790775cd55406a1c";
      const apiUrl = "https://api.themoviedb.org/3/discover/movie";

      const randomPage = Math.floor(Math.random() * 2) + 1;
      console.log(randomPage);

      const params = {
        api_key: apiKey,
        primary_release_year: releaseYear,
        with_original_language: "en",
        "vote_count.gte": 50,
        page: randomPage,
        with_genres: selectedGenre,
      };

      const response = await axios.get(apiUrl, { params });

      // Randomize the movies before storing them in the state
      const randomizedMovies = response.data.results
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      setMovies(randomizedMovies);

      console.log(randomizedMovies);
      // Extract the poster paths and store them separately
      const fetchedPosterPaths = randomizedMovies.map(
        (movie) => `https://image.tmdb.org/t/p/w185${movie.poster_path}`
      );
      setPosterPaths(fetchedPosterPaths);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleReleaseYearChange = (event) => {
    setReleaseYear(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <div>
        <label htmlFor="releaseYear" className="text-white">
          Enter Release Year:
        </label>
        <input
          type="text"
          id="releaseYear"
          value={releaseYear}
          onChange={handleReleaseYearChange}
          className="m-2 p-2 rounded-lg border border-gray-300"
        />
      </div>
      <div>
        <label htmlFor="genre" className="text-white">
          Select Genre:
        </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="m-2 p-2 rounded-lg border border-gray-300"
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="35">Comedy</option>
          <option value="10751">Family</option>
          <option value="27">Horror</option>
          <option value="878">Sci-Fi</option>
          <option value="53">Thriller</option>
        </select>
      </div>
      <h1 className="text-3xl text-white font-bold">
        Tonight's Double Feature is...
      </h1>
      <div className="flex">
        {posterPaths.map((posterPath, index) => (
          <div
            className="m-4 flex flex-col items-center"
            key={movies[index]?.id || index}
          >
            <img
              className="rounded-lg"
              src={posterPath}
              width={200}
              alt={movies[index]?.title || "Movie Poster"}
            />
            <p className="text-white">{movies[index]?.title || "-"}</p>
          </div>
        ))}
      </div>
      <div className="m-3">
        <button
          className="bg-green-500 hover:bg-green-400 w-52 h-12 rounded-xl"
          onClick={fetchMovies}
        >
          <p className="text-2xl font-bold text-white">Go</p>
        </button>
      </div>
    </div>
  );
};

export default Layout;
