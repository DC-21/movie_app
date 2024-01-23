import { PopularMoviesResponse } from "../types/interface";

const API_KEY = "d0f5f2e135336200362af8a1a73acb17";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (
  page: number
): Promise<PopularMoviesResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  return response.json();
};
