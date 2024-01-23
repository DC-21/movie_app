import React from "react";
import { useInfiniteQuery } from "react-query";
import { getPopularMovies, PopularMoviesResponse } from "../Hooks/FetchMovies";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

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

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.results.map((movie) => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <img
                  src={
                    movie.poster_path.startsWith("http")
                      ? movie.poster_path
                      : `${BASE_IMAGE_URL}${movie.poster_path}`
                  }
                  alt={`${movie.title} Poster`}
                  style={{ maxWidth: "200px" }}
                />
                <p>{movie.overview}</p>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetching}>
          {isFetching ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Movies;
