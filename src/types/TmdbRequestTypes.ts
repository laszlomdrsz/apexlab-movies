export type TmdbSearchMoviesResponseData = TmdbResponse<SearchMoviesData>;
export type TmdbSimilarMoviesResponseData = TmdbResponse<SimilarMoviesData>;

export type TmdbResponse<T> = {
  data: T;
};

export type TmdbMovieOverviewData = {
  id: string;
  name: string;
  score: number;
  genres: Genre[];
};

type SearchMoviesData = {
  searchMovies: TmdbMovieOverviewData[];
};

type SimilarMoviesData = {
  movie: {
    similar: TmdbMovieOverviewData[];
  };
};

type Genre = {
  name: string;
};
