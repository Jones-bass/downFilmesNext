import Image from "next/image";
import { MovieProps } from "../../../types/movie";
import { Info } from "./Info";
import { useRouter } from "next/navigation"; 

export interface Movie {
  movie: MovieProps;
}

export const Card = ({ movie }: Movie) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/movie/${movie.id}`);
  };

  return (
    <div onClick={handleNavigation}
      className="group relative min-h-[12vh] cursor-pointer rounded bg-zinc-900 md:min-h-[12vw]">
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

      <div className='invisible absolute top-0 z-10 w-full min-w-[20vw] scale-0 opacity-0 transition delay-300 duration-200 group-hover:-translate-y-[6vw] group-hover:scale-110 group-hover:opacity-100 sm:visible'>
        <Image
          src={movie.image}
          alt={movie.title}
          width={600}
          height={400}
          className='duration h-[12vw] w-full cursor-pointer rounded-t-md object-cover object-top shadow-xl transition'
        />

        <Info movie={movie} />
      </div>
    </div>
  );
};
