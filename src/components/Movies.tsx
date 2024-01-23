import React from "react";
import { useInfiniteQuery } from "react-query";
import { getPopularMovies, PopularMoviesResponse } from "../Hooks/FetchMovies";
import { Movie } from "../types/interface";
import IonIcon from "@reacticons/ionicons";
import { useMovieStore } from "../store/store";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieGrid: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  const { likedMovies, toggleLike } = useMovieStore();

  return (
    <ul className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 mt-4">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="flex flex-col shadow group cursor-pointer relative rounded-lg overflow-hidden"
        >
          <img
            src={
              movie.poster_path.startsWith("http")
                ? movie.poster_path
                : `${BASE_IMAGE_URL}${movie.poster_path}`
            }
            alt={`${movie.title} Poster`}
            className="w-full h-96 object-cover"
          />

          <div className="absolute translate-y-full p-2 group-hover:translate-y-0 duration-700 ease-in-out bottom-0 bg-[#262830] w-full">
            <h3 className="text-white">{movie.title}</h3>
            <p className="text-gray-400 text-sm">{movie.overview}</p>
          </div>

          <button
            onClick={() => toggleLike(movie.id, movie)}
            className="absolute top-3 left-3 bg-[#262830] rounded-lg p-2 flex items-center justify-center"
          >
            <IonIcon
              className={`${
                likedMovies[movie.id] ? "text-red-700" : "text-red-100"
              } text-lg`}
              name="heart"
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

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
        <button
          className="mt-6 p-3 bg-red-700 rounded-lg hover:bg-red-600"
          onClick={() => fetchNextPage()}
          disabled={isFetching}
        >
          {isFetching ? "" : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Movies;
