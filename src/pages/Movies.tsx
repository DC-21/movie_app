import React from "react";
import { useInfiniteQuery } from "react-query";
import { getPopularMovies, PopularMoviesResponse } from "../Hooks/FetchMovies";
import { Movie } from "../types/interface";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieGrid: React.FC<{ movies: Movie[] }> = ({ movies }) => (
  <ul className="movie-grid grid grid-cols-3 gap-4">
    {movies.map((movie) => (
      <li key={movie.id} className="flex flex-col items-center">
        <h3 className="text-white">{movie.title}</h3>
        <img
          src={
            movie.poster_path.startsWith("http")
              ? movie.poster_path
              : `${BASE_IMAGE_URL}${movie.poster_path}`
          }
          alt={`${movie.title} Poster`}
          className="max-w-full h-auto"
        />
      </li>
    ))}
  </ul>
);

const Movies: React.FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery<PopularMoviesResponse>(
      "popularMovies",
      ({ pageParam = 1 }) => getPopularMovies(pageParam),
      {
        getNextPageParam: (lastPage) =>
          lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        onSuccess: (fetchedData) => {
          console.log("Data fetched successfully:", fetchedData);
        },
      }
    );

  if (isLoading && !isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage =
      (error as { message?: string }).message ||
      "An error occurred while fetching data";

    return <div>Error: {errorMessage}</div>;
  }

  const allMovies = data?.pages.reduce(
    (acc, page) => [...acc, ...page.results],
    [] as Movie[]
  );

  return (
    <div className="text-lg w-full justify-center items-center">
      <h1>Popular Movies</h1>
      {allMovies && allMovies.length > 0 && <MovieGrid movies={allMovies} />}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetching}>
          {isFetching ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Movies;
