'use client'

// components/MovieRow.tsx
'use client';

import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

// Define the props structure
interface MovieRowProps {
  movies: Movie[];
  categoryTitle: string;
}

export default function MovieRow({ movies, categoryTitle }: MovieRowProps) {
  return (
    <section className="mt-8">
      {/* Category title */}
      <h2 className="text-2xl font-bold mb-4 px-8">{categoryTitle}</h2>

      {/* Horizontal scrolling container */}
      <div 
        className="flex gap-4 overflow-x-scroll overflow-y-hidden pb-4 px-8 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }} // Hide scrollbar for Firefox
      >
        {/* Optional: Add custom utility CSS to hide scrollbar in globals.css for Webkit browsers */}
        {movies.map((movie) => (
          // Use MovieCard for each item
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}