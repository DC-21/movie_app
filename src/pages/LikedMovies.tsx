import React from "react";
import { useMovieStore } from "../store/store";
import IonIcon from "@reacticons/ionicons";
import { Movie } from "../types/interface";
import * as likedstyles from "../styles/likedstyles";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const LikedMovies: React.FC = () => {
  const { likedMovies, toggleLike } = useMovieStore();

  const renderStarClassName = (movie: Movie, index: number) => {
    const starCount = Math.floor(movie.vote_average / 2);
    return `${likedstyles.starIcon} ${
      index < starCount ? likedstyles.starIcon : "text-yellow-100"
    }`;
  };

  const likedMoviesData = Object.values(likedMovies);

  return (
    <div className={likedstyles.likedMoviesContainer}>
      {likedMoviesData.length > 0 ? (
        likedMoviesData.map((movie) => (
          <li key={movie.id} className={likedstyles.movieContainer}>
            <img
              src={
                movie.poster_path.startsWith("http")
                  ? movie.poster_path
                  : `${BASE_IMAGE_URL}${movie.poster_path}`
              }
              alt={`${movie.title} Poster`}
              className={likedstyles.movieImage}
            />

            <div className={likedstyles.movieDetails}>
              <h3 className={likedstyles.movieTitle}>{movie.title}</h3>
              <p className={likedstyles.movieReleaseDate}>
                {movie.release_date}
              </p>
              <div className={likedstyles.movieRatingContainer}>
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <IonIcon
                      key={index}
                      name="star"
                      className={renderStarClassName(movie, index)}
                    />
                  ))}
                <p className={likedstyles.movieRating}>{movie.vote_average}</p>
              </div>
              <p className={likedstyles.movieOverview}>{movie.overview}</p>
            </div>

            <button
              className={likedstyles.likeButton}
              onClick={() => toggleLike(movie.id, movie)}
            >
              <IonIcon className={likedstyles.heartIcon} name="heart" />
            </button>
          </li>
        ))
      ) : (
        <p className={likedstyles.noLikedMoviesText}>No liked movies yet.</p>
      )}
    </div>
  );
};

export default LikedMovies;
