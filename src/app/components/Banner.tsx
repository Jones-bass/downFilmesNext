import { FaRegCompass, FaRegHeart } from 'react-icons/fa';
import { GiDramaMasks } from 'react-icons/gi';
import { ButtonLink } from "./ButtonLink";
import { MdChildCare } from 'react-icons/md';
import { PiCross } from 'react-icons/pi';
import { RiSkullLine } from 'react-icons/ri';
import { SlFire } from 'react-icons/sl';
import { BiHappyBeaming } from 'react-icons/bi';

export function Banner() {
  return (
    <div className="relative mb-10">
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <video
          className="h-full w-full object-cover"
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        >
          <source
            src="https://occ-0-1123-1567.1.nflxso.net/so/soa5/592/1848843602726975489.mp4?v=1&e=1733008980&t=BKhKNk1honWUf6XMYKU4uDSbgYs"
            type="video/mp4"
            media="(min-width: 960px)"
          />
          <source
            src="https://occ-0-1123-1567.1.nflxso.net/so/soa7/201/1831845520970753537.mp4?v=1&e=1733008980&t=ExYCzxsiB5HMH-TQq8tApDDl2UY"
            type="video/mp4"
            media="(min-width: 600px) and (max-width: 959.98px)"
          />
          <source
            src="https://occ-0-1123-1567.1.nflxso.net/so/soa1/615/1831845678559143937.mp4?v=1&e=1733008980&t=xl-6ZfhrtAOcH3MDCrhNgQc2nVs"
            type="video/mp4"
            media="(max-width: 599.98px)"
          />
        </video>
      </div>

      <div className="relative z-10 flex flex-col items-start justify-center space-y-4 py-16 px-4 text-white md:space-y-6 lg:h-[50vh] lg:pb-12 lg:px-16">
        <div className="p-0 m-0">

          <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl">Os Filmes Mais Incríveis!</h1>

          <p className="text-shadow-md text-sm text-gray-300 md:max-w-lg md:text-lg lg:max-w-2xl">
            Aventuras épicas, emoções inesquecíveis e histórias. Prepare a pipoca e aproveite!</p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <ButtonLink href="/" text="Ação" icon={<SlFire className="h-4 w-4" />} />
          <ButtonLink href="/" text="Terror" icon={<RiSkullLine className="h-4 w-4" />} />
          <ButtonLink href="/" text="Comédia" icon={<BiHappyBeaming className="h-4 w-4" />} />
          <ButtonLink href="/" text="Aventura" icon={<FaRegCompass className="h-4 w-4" />} />
          <ButtonLink href="/" text="Infantil" icon={<MdChildCare className="h-4 w-4" />} />
          <ButtonLink href="/" text="Religioso" icon={<PiCross className="h-4 w-4" />} />
          <ButtonLink href="/" text="Romance" icon={<FaRegHeart className="h-4 w-4" />} />
          <ButtonLink href="/" text="Drama" icon={<GiDramaMasks className="h-4 w-4" />} />
        </div>
      </div>
    </div>
  );
}
