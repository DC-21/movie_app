import React from "react";
import { useInfiniteQuery } from "react-query";
import { getPopularMovies } from "../Hooks/FetchMovies";
import { Movie, PopularMoviesResponse } from "../types/interface";
import IonIcon from "@reacticons/ionicons";
import { useMovieStore } from "../store/store";
import * as styles from "../styles/styles";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const renderStarClassName = (movie: Movie, index: number) => {
  const starCount = Math.floor(movie.vote_average / 2);

  return `text-yellow-500 mr-1 ${
    index < starCount ? "text-yellow-500" : "text-yellow-100"
  }`;
};

const MovieGrid: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  const { likedMovies, toggleLike } = useMovieStore();

  return (
    <ul className={styles.movieGridContainer}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <img
            src={
              movie.poster_path.startsWith("http")
                ? movie.poster_path
                : `${BASE_IMAGE_URL}${movie.poster_path}`
            }
            alt={`${movie.title} Poster`}
            className={styles.movieImage}
          />

          <div className={styles.movieOverlay}>
            <h3 className={styles.movieTitle}>{movie.title}</h3>
            <p className={styles.movieReleaseDate}>{movie.release_date}</p>
            <div className={styles.movieRatingContainer}>
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <IonIcon
                    key={index}
                    name="star"
                    className={renderStarClassName(movie, index)}
                  />
                ))}
              <p className={styles.movieRating}>{movie.vote_average}</p>
            </div>
            <p className={styles.movieOverview}>{movie.overview}</p>
          </div>

          <button
            onClick={() => toggleLike(movie.id, movie)}
            className={styles.movieButton}
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
    <div className={styles.containerStyles}>
      <h1 className={styles.titleStyles}>Popular Movies</h1>
      {allMovies && allMovies.length > 0 && <MovieGrid movies={allMovies} />}
      {hasNextPage && (
        <button
          className={styles.loadMoreButton}
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
