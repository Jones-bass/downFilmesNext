import Image from "next/image";

export interface MovieProps {
  sectionTitle?: string;
  id: string;
  title: string;
  awards?: string;
  year: string;
  genre: string;
  image: string;
  bannerFileURL?: string;
  imdbRating?: string;
  imdbVotes?: string;
}

export interface Movie {
  movie: MovieProps;
}

export const MovieCard = ({ movie }: Movie) => (
  <div className="group relative min-h-[12vh] rounded bg-zinc-900 md:min-h-[12vw]">
    <Image
      alt={movie.title}
      src={movie.image}
      width={600}
      height={400}
      className="rounded-md object-cover object-top transition"
    />
    <div className="p-4">
      <h3 className="text-lg font-bold">{movie.title}</h3>
      {movie.genre && <p className="text-sm text-gray-400">{movie.genre}</p>}
    </div>
  </div>
);
