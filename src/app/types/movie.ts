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
  plot: string;
  language: string;
  country: string;
  awards?: string;
  image: string;
  type: string;
  bannerFileURL?: string;
  imdbRating?: string;
  imdbVotes?: string;
};

export type Movies = MovieProps[];

