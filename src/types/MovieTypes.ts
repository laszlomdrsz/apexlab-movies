export type MovieOverview = {
  id: string;
  name: string;
  score: number;
  genres: string[];
};

export type MovieDetails = {
  wikipediaData?: WikipediaMovieData;
  imdbData?: ImdbMovieData;
};

export type WikipediaMovieData = {
  extract: string;
  url: string;
};

export type ImdbMovieData = {
  url: string;
};
