// lib/tmdb.ts (FINAL CORRECTED VERSION)

import { MoviesApiResponse, MovieDetail } from '@/types/movie';

// Base URL for the TMDB API
const BASE_URL = 'https://api.themoviedb.org/3';
// 1. READ THE API KEY at the module level
const API_KEY = process.env.TMDB_API_KEY;

/**
 * Helper function to retry fetch requests on transient errors
 */
async function fetchWithRetry(url: string, options: RequestInit, retries: number = 3, delay: number = 1000): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      return res; // Success, return the response
    } catch (error) {
      if (attempt === retries) {
        throw error; // Last attempt failed, rethrow
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  throw new Error('Unexpected error in fetchWithRetry');
}

/**
 * Helper function to fetch a general list of movies...
 */
export async function fetchMovieList(endpoint: string): Promise<MoviesApiResponse> {
  // Throw an error if the API key is missing (ensuring we don't proceed without it)
  if (!API_KEY) {
    throw new Error("TMDB_API_KEY is not set in .env.local or Vercel environment variables.");
  }

  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;

  const res = await fetchWithRetry(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error(`Failed to fetch data from ${endpoint}. Status: ${res.status}`);
    throw new Error(`Failed to fetch movies: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetches detailed information for a single movie by its ID...
 */
export async function fetchMovieById(id: string): Promise<MovieDetail> {
  // Throw an error if the API key is missing (ensuring we don't proceed without it)
  if (!API_KEY) {
    throw new Error("TMDB_API_KEY is not set in .env.local or Vercel environment variables.");
  }

  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;

  const res = await fetchWithRetry(url, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    console.error(`Failed to fetch movie details for ID: ${id}. Status: ${res.status}`);
    throw new Error(`Failed to fetch movie details: ${res.statusText}`);
  }

  return res.json();
}
