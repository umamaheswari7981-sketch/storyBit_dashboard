'use client'

// components/HeroBanner.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export default function HeroBanner({ movie }: { movie: Movie }) {
  if (!movie.backdrop_path) return null;

  return (
    // Link the whole banner to the detail page
    <Link href={`/movie/${movie.id}`}>
      {/* Relative container is required for <Image fill /> */}
      <div className="relative h-[60vh] md:h-[80vh] w-full mt-16 group">
        
        {/* Next.js <Image /> with fill and priority props  */}
        <Image
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          fill 
          priority // Ensures this large image loads quickly (good for LCP)
          style={{ objectFit: 'cover' }}
          className="transition-opacity duration-500"
        />

        {/* Text Overlay Section */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent p-8 flex flex-col justify-end">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg group-hover:text-red-500 transition">
            {movie.title}
          </h1>
          <p className=" text-white text-lg max-w-xl line-clamp-3 mb-4">
            {movie.overview}
          </p>
          <button className="w-fit px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
            Watch Now
          </button>
        </div>
      </div>
    </Link>
  );
}