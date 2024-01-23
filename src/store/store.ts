import { create } from "zustand";
import { Movie } from "../types/interface";

interface MovieState {
  likedMovies: Record<number, Movie>;
  toggleLike: (movieId: number, movie: Movie) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  likedMovies:
    JSON.parse((localStorage.getItem("likedMovies") as string) || "[]") || [],

  toggleLike: (movieId: number, movie: Movie) => {
    set((state) => {
      const updatedLikedMovies = { ...state.likedMovies };
      if (updatedLikedMovies[movieId]) {
        delete updatedLikedMovies[movieId];
      } else {
        updatedLikedMovies[movieId] = movie;
      }
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
      return { likedMovies: updatedLikedMovies };
    });
  },
}));
