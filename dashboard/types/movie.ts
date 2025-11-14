 
// types/movie.ts

// This interface defines the structure of a single movie object returned in a list.
export interface Movie {
  id: number;
  title: string;
  // Properties can be optional if the API might return null or exclude them.
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  // The API returns a list of genres by ID on the list endpoint, but a full detail object
  // (MovieDetail) would have the full Genre objects. We'll use this simpler one for the list.
  genre_ids: number[];
}

// This interface defines the top-level structure of the TMDB popular/list endpoint response.
export interface MoviesApiResponse {
  page: number;
  results: Movie[]; // The list of movies is inside the 'results' array.
  total_pages: number;
  total_results: number;
}

// Full detail interface for the dynamic page (includes more detail like full genres)
export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[];
  runtime: number | null;
  tagline: string | null;
  // More properties can be added as needed for the detail page.
}