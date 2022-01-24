import axios, {AxiosResponse} from 'axios';
import {toast} from 'react-toastify';
import {ImdbMovieQueryResponseData} from '../types/ImdbRequestTypes';
import {ImdbMovieData} from '../types/MovieTypes';

export class ImdbRequestService {
  private apiBaseUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}/`;
  private pageBaseUrl = 'https://www.imdb.com/title/';

  async getMovieData(movieTitle: string): Promise<ImdbMovieData | undefined> {
    const url = this.apiBaseUrl + movieTitle;

    try {
      const result = await axios.get<ImdbMovieQueryResponseData>(url);
      return this.transformMovieDataResult(result);
    } catch (error) {
      console.error(error);
      toast.error(
        'Could not load IMDB data because of unexpected error. Checking connection or trying again later might help.'
      );
      return undefined;
    }
  }

  private transformMovieDataResult(
    result: AxiosResponse<ImdbMovieQueryResponseData>
  ): ImdbMovieData | undefined {
    if (!result.data.imdbID) return undefined;
    return {
      url: this.pageBaseUrl + result.data.imdbID,
    };
  }
}

const imdbRequestService = new ImdbRequestService();
export default imdbRequestService;
