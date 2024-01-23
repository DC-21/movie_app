import React from "react";
import { useMovieStore } from "../store/store";
import IonIcon from "@reacticons/ionicons";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const LikedMovies: React.FC = () => {
  const { likedMovies } = useMovieStore();

  const likedMoviesData = Object.values(likedMovies);

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 mt-4 w-full p-10">
      {likedMoviesData.length > 0 ? (
        likedMoviesData.map((movie) => (
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
            </div>

            <button className="absolute top-3 left-3 bg-[#262830] rounded-lg p-2 flex items-center justify-center">
              <IonIcon className="text-red-700 text-lg" name="heart" />
            </button>
          </li>
        ))
      ) : (
        <p className="text-center">No liked movies yet.</p>
      )}
    </div>
  );
};

export default LikedMovies;
