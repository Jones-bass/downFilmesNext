export type MovieProps = {
  id: string;
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string[];
  director: string;
  writer: string;
  actors: string;
  description: string;
  language: string;
  country: string;
  awards: string;
  image: string;
  imdbRating: string;
  imdbVotes: string;
  type: string;
};

export type Movies = MovieProps[];

