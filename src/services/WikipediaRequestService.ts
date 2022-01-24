import axios, {AxiosResponse} from 'axios';
import {toast} from 'react-toastify';
import {WikipediaMovieData} from '../types/MovieTypes';
import {WikipediaPageExtractResponseData} from '../types/WikipediaRequestTypes';

class WikipediaRequestService {
  private apiBaseUrl = 'https://en.wikipedia.org/w/api.php?';
  private pageBaseUrl = 'https://en.wikipedia.org/wiki/';

  async getMovieData(movieTitle: string): Promise<WikipediaMovieData | undefined> {
    const url =
      this.apiBaseUrl +
      new URLSearchParams({
        origin: '*',
        action: 'query',
        titles: movieTitle,
        format: 'json',
        prop: 'extracts',
        redirects: '1',
        exintro: '1',
        explaintext: '1',
      });

    try {
      const result = await axios.get<WikipediaPageExtractResponseData>(url);
      return this.transformMovieDataResult(result);
    } catch (error) {
      console.error(error);
      toast.error(
        'Could not load Wikipedia data because of unexpected error. Checking connection or trying again later might help.'
      );
      return undefined;
    }
  }

  private transformMovieDataResult(
    result: AxiosResponse<WikipediaPageExtractResponseData, any>
  ): WikipediaMovieData | undefined {
    const page = Object.values(result.data.query.pages)[0];
    if (!page) return undefined;

    return {
      extract: page.extract,
      url: this.pageBaseUrl + page.title,
    };
  }
}

const wikipediaRequestService = new WikipediaRequestService();
export default wikipediaRequestService;
