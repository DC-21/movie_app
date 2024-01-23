import { create } from "zustand";

interface MovieState {
  likedMovies: Record<number, boolean>;
  toggleLike: (movieId: number) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  likedMovies: JSON.parse(localStorage.getItem("likedMovies")!) || {},

  toggleLike: (movieId) =>
    set((state) => {
      const updatedLikedMovies = { ...state.likedMovies };
      updatedLikedMovies[movieId] = !updatedLikedMovies[movieId];
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
      return { likedMovies: updatedLikedMovies };
    }),
}));
