'use client'

import { useState } from "react";
import { Banner } from "./components/Banner";
import Header from "./components/Header";
import { MovieCard } from "./components/MovieCard";
import { moveInfo } from "./utils/moveInfo";

export default function Home() {
  const [movies] = useState(moveInfo);

  return (
    <div className='relative bg-gradient-to-b pb-8'>
      <Header />

      <main className='relative lg:space-y-24'>
        <Banner />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
}


