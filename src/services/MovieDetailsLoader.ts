import { MovieDetails } from '../types/MovieTypes';
import imdbRequestService from './ImdbRequestService';
import wikipediaRequestService from './WikipediaRequestService';

export class MovieDetailsLoader {
  async getDetails(movieTitle: string): Promise<MovieDetails> {
    const [wikipediaData, imdbData] = await Promise.all([
      wikipediaRequestService.getMovieData(movieTitle),
      imdbRequestService.getMovieData(movieTitle),
    ]);
    return {
      wikipediaData: wikipediaData ?? undefined, 
      imdbData: imdbData ?? undefined,
    }
  }
}

const movieDetailsLoader = new MovieDetailsLoader();
export default movieDetailsLoader;