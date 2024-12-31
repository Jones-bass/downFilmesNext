export type MovieProps = {
  id: string;
  title: string;
  year: string;
  runtime: string;
  genre: string[];
  director: string;
  writer: string;
  actors: string;
  description: string;
  language: string;
  country: string;
  image: string;
  imdbRating: string;
  type: string;
};

export type Movies = MovieProps[];

