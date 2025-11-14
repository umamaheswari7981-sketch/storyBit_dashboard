// components/MovieCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movie';

// Base URL for TMDB posters (w342 is a good size for rows)
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';

export default function MovieCard({ movie }: { movie: Movie }) {
  // Ensure we have a path before trying to render the image
  if (!movie.poster_path) return null; 

  // Poster dimensions are typically 2:3 aspect ratio
  const POSTER_WIDTH = 200;
  const POSTER_HEIGHT = 300;

  return (
    // Wrap the entire card in a Next.js <Link /> component.
    <Link 
      href={`/movie/${movie.id}`} 
      className="min-w-[200px] block transition-transform duration-300 hover:scale-105 hover:z-10 relative group"
    >
      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-700">
        <Image
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          width={POSTER_WIDTH}
          height={POSTER_HEIGHT}
          // The image will fill the container, maintaining the set aspect ratio
          className="object-cover w-full h-auto" 
        />
      </div>
      {/* Optional overlay text on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
        <span className="text-center font-semibold text-sm">{movie.title}</span>
      </div>
    </Link>
  );
}