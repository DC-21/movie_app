import React from "react";
import { useQuery } from "react-query";
import { getPopularMovies, PopularMoviesResponse } from "../Api/Api";

const Movies: React.FC = () => {
  const { data, error, isLoading } = useQuery<PopularMoviesResponse>(
    "popularMovies",
    getPopularMovies,
    {
      onSuccess: (fetchedData) => {
        console.log("Data fetched successfully:", fetchedData);
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage =
      (error as { message?: string }).message ||
      "An error occurred while fetching data";

    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {data?.results.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
