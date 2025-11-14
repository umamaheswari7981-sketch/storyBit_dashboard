// app/movie/[id]/page.tsx

import { fetchMovieById } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import { MovieDetail } from '@/types/movie'; // Import the detailed type

// Base URL for large posters and backdrops
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

// Define the expected props structure for a dynamic page component
interface MoviePageProps {
  // Next.js automatically provides the URL parameter in the 'params' object
  params: Promise<{
    id: string; // The movie ID from the URL (e.g., '/movie/123')
  }>;
}

// Server Component function. It must be async to perform data fetching.
export default async function MoviePage({ params }: MoviePageProps) {
  const { id: movieId } = await params;

  // Validate movieId to prevent API calls with invalid IDs
  if (!movieId || isNaN(Number(movieId))) {
    return (
      <main className="pt-24 p-8 text-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl text-red-500 mb-4">Invalid Movie ID</h1>
        <p className="text-gray-400">The provided movie ID is invalid.</p>
        <Link href="/" className="mt-4 inline-block text-red-400 hover:underline transition">
          Go back to Home
        </Link>
      </main>
    );
  }

  let movie: MovieDetail;
  try {
    // 1. Fetch detailed data using the server-side helper function
    movie = await fetchMovieById(movieId);
  } catch (error) {
    // 2. Error handling if the movie is not found (404) or API call fails
    return (
      <main className="pt-24 p-8 text-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl text-red-500 mb-4">404 - Movie Not Found</h1>
        <p className="text-gray-400">The movie with ID "{movieId}" could not be loaded.</p>
        <Link href="/" className="mt-4 inline-block text-red-400 hover:underline transition">
          Go back to Home
        </Link>
      </main>
    );
  }

  // Define image URLs
  const backdropUrl = movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : null;
  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null;

  // Helper for formatting runtime
  const formatRuntime = (runtime: number | null) => {
    if (!runtime) return 'N/A';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* 3. Hero-style backdrop section */}
      <section className="relative h-[85vh] w-full pt-16">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={`${movie.title} backdrop`}
            fill
            priority
            style={{ objectFit: 'cover' }}
            className="opacity-20 md:opacity-40" // Make it subtle
          />
        )}
        
        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 to-transparent"></div>

        {/* Content Section: Responsive Layout */}
        <div className="absolute bottom-0 left-0 p-6 md:p-12 z-10 w-full flex flex-col md:flex-row gap-8 items-end">
          
          {/* Poster Image (Side-by-side on large screens) */}
          {posterUrl && (
            <div className="hidden md:block w-48 h-72 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl transition-transform hover:scale-105">
              <Image
                src={posterUrl}
                alt={`${movie.title} poster`}
                width={200}
                height={300}
                className="object-cover"
              />
            </div>
          )}
          
          {/* Title and Metadata */}
          <div className="flex-grow">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-3 drop-shadow-lg">
              {movie.title}
            </h1>
            
            {/* Metadata (Release Year, Rating, Runtime) */}
            <p className="text-gray-400 font-medium mb-4 text-lg space-x-4">
              <span>{movie.release_date?.substring(0, 4)}</span>
              <span className="text-yellow-400">★ {movie.vote_average.toFixed(1)}</span>
              <span>{formatRuntime(movie.runtime)}</span>
            </p>

            {/* Genre Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map(genre => (
                <span 
                  key={genre.id} 
                  className="text-xs px-3 py-1 bg-red-600/80 rounded-full font-semibold"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview / Description */}
            <p className="text-gray-300 max-w-4xl leading-relaxed text-base md:text-lg mb-8">
              {movie.overview}
            </p>
            
            {/* Action Button */}
            <button className="px-8 py-3 bg-red-600 hover:bg-red-700 transition font-bold text-lg rounded-lg shadow-xl">
              ▶️ Start Streaming
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}