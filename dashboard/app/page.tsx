"use client";

// app/page.tsx (Server Component)

import { fetchMovieList } from '@/lib/tmdb';
import { Movie } from '@/types/movie';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';


// Main function for the homepage. It is async because it performs server-side data fetching.
export default async function HomePage() {
  let popularMovies: Movie[] = [];
  let topRatedMovies: Movie[] = [];
  let nowPlayingMovies: Movie[] = [];
  
  try {
    // 1. Fetch data from the external public API using the native fetch
    // We can fetch all three lists concurrently using Promise.all() for speed.
    const [popularData, topRatedData, nowPlayingData] = await Promise.all([
      fetchMovieList('/movie/popular'),
      fetchMovieList('/movie/top_rated'),
      fetchMovieList('/movie/now_playing'),
    ]);

    // Extract the results array for each category
    popularMovies = popularData.results;
    topRatedMovies = topRatedData.results;
    nowPlayingMovies = nowPlayingData.results;

  } catch (error) {
    // In a real app, you would render a sophisticated error page here.
    console.error("Data Fetching Error:", error);
    // For development, provide mock data if API fails
    popularMovies = [
      {
        id: 1,
        title: "Mock Popular Movie",
        overview: "This is a mock movie for development purposes.",
        poster_path: null,
        backdrop_path: null,
        release_date: "2023-01-01",
        vote_average: 8.5,
        genre_ids: [28, 12], // Action, Adventure
      },
    ];
    topRatedMovies = [];
    nowPlayingMovies = [];
  }

  // Determine the movie for the Hero Banner (the first popular movie) [cite: 18]
  const heroMovie = popularMovies[0];

  return (
    <main>
      {/* Always include the Header component (Client Component)  */}
      <Header /> 

      {/* Hero Banner (renders the first item) [cite: 18] */}
      {heroMovie && <HeroBanner movie={heroMovie} />}
      
      <section className="pb-16">
        {/* Render at least three instances of the MovieRow component [cite: 22] */}
        
        {/* Pass fetched and filtered data to the reusable Client Component [cite: 22] */}
        {popularMovies.length > 0 && (
          <MovieRow 
            categoryTitle="Popular on StoryBit" 
            movies={popularMovies} 
          />
        )}

        {topRatedMovies.length > 0 && (
          <MovieRow 
            categoryTitle="Top Rated Movies" 
            movies={topRatedMovies} 
          />
        )}

        {nowPlayingMovies.length > 0 && (
          // Example of filtering/slicing the data before passing it [cite: 22]
          <MovieRow 
            categoryTitle="New Releases" 
            movies={nowPlayingMovies.slice(0, 10)} 
          />
        )}
      </section>
      
      {/* Small Tailwind utility for hiding the scrollbar on Webkit browsers */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}