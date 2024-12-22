"use client";

import { useState } from "react";
import { Banner } from "./components/Banner";
import Header from "./components/Header";
import { moveInfo } from "./utils/moveInfo";
import { Card } from "./components/Card";

export default function Movies() {
  const [movies] = useState(moveInfo);

  return (
    <div className='relative bg-gradient-to-b pb-8'>
      <Header />
      <main className='relative pt-16 lg:space-y-24'>
        <Banner />
        <div className="grid grid-cols-1 pl-10 pr-10 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
}
