'use client'

// components/Header.tsx
'use client'; // <-- This directive makes it a Client Component

import Link from 'next/link';

export default function Header() {
  // We use a simple useState example here to show why 'use client' is necessary.
  // Although not strictly required by the prompt, it demonstrates interactivity.
  // const [isOpen, setIsOpen] = useState(false);

  return (
    // 'fixed top-0 z-50' fixes the header to the top. 'p-4' adds padding.
    <header className="fixed top-0 z-50 w-full flex items-center justify-between p-4 bg-gray-900/90 backdrop-blur-sm shadow-lg">
      
      {/* Logo/Title link */}
      <Link href="/" className="text-2xl font-bold text-red-600 hover:text-red-500 transition">
        StoryBit
      </Link>

      {/* Navigation links */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="text-white hover:text-red-500 transition">
          Home
        </Link>
        <Link href="/tv-shows" className="text-white hover:text-red-500 transition">
          TV Shows
        </Link>
        <Link href="/movies" className="text-white hover:text-red-500 transition">
          Movies
        </Link>
      </nav>
      
      {/* User profile/Search placeholder */}
      <div className="flex items-center space-x-4">
        <button className="text-white text-sm border border-red-600 px-3 py-1 rounded hover:bg-red-600 transition">
          Sign In
        </button>
      </div>
    </header>
  );
}
