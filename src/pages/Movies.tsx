import React from "react";
import { useInfiniteQuery } from "react-query";
import { getPopularMovies, PopularMoviesResponse } from "../Hooks/FetchMovies";
import { Movie } from "../types/interface";
import IonIcon from "@reacticons/ionicons";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieGrid: React.FC<{ movies: Movie[] }> = ({ movies }) => (
  <ul className="movie-grid grid grid-cols-5 gap-6 mt-4">
    {movies.map((movie) => (
      <li
        key={movie.id}
        className="flex flex-col shadow shadow-slate-900 cursor-pointer"
      >
        <img
          src={
            movie.poster_path.startsWith("http")
              ? movie.poster_path
              : `${BASE_IMAGE_URL}${movie.poster_path}`
          }
          alt={`${movie.title} Poster`}
          className="w-full h-[300px] rounded-lg"
        />

        <h3 className="text-white mt-4">Title: {movie.title}</h3>
        <div className="w-full flex gap-4">
          <a href="">
            <IonIcon className="text-red-700" name="heart" size="large" />
          </a>
          <a href="">
            <IonIcon name="heart-dislike" size="large" />
          </a>
        </div>
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
    <div className="text-lg w-full justify-center items-center p-10">
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
