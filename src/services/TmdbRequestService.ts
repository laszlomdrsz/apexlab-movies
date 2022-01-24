import axios, {AxiosResponse} from 'axios';
import {
  TmdbMovieOverviewData,
  TmdbSearchMoviesResponseData,
  TmdbSimilarMoviesResponseData,
  TmdbResponse,
} from '../types/TmdbRequestTypes';
import {MovieOverview} from '../types/MovieTypes';

class TmdbRequestService {
  private url = 'https://tmdb.sandbox.zoosh.ie/dev/graphql';
  private movieOverviewQueryFields = `
    id
    name
    score
    genres {
      name
    }
  `;

  async searchMovies(search: string): Promise<MovieOverview[]> {
    const data = {
      query: `
      query SearchMovies {
        searchMovies(query: "${search}") {
          ${this.movieOverviewQueryFields}
        }
      }
      `,
    };
    const result = await axios.post<TmdbSearchMoviesResponseData>(this.url, data);
    return this.transformSearchMoviesResult(result);
  }

  async getSimilarMovies(id: string): Promise<MovieOverview[]> {
    const data = {
      query: `
      query GetMovie {
        movie(id: ${id}) {
          similar {
            ${this.movieOverviewQueryFields}
          }
        }
      }
      `,
    };
    const result = await axios.post<TmdbSimilarMoviesResponseData>(this.url, data);
    return this.transformSimilarMoviesResult(result);
  }

  private transformSearchMoviesResult(result: AxiosResponse<TmdbSearchMoviesResponseData>): MovieOverview[] {
    return this.extractTmdbData(result).searchMovies.map(this.transformMovieOverviewData);
  }

  private transformSimilarMoviesResult(result: AxiosResponse<TmdbSimilarMoviesResponseData>) {
    return this.extractTmdbData(result).movie.similar.map(this.transformMovieOverviewData);
  }

  private extractTmdbData<T extends TmdbResponse<any>>(result: AxiosResponse<T>): T['data'] {
    return result.data.data;
  }

  private transformMovieOverviewData(movie: TmdbMovieOverviewData): MovieOverview {
    return {
      ...movie,
      genres: movie.genres.map((g) => g.name),
    };
  }
}

const tmdbRequestService = new TmdbRequestService();
export default tmdbRequestService;
