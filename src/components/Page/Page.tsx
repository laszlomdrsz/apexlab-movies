import {Container} from '@mui/material';
import React, {useRef, useState} from 'react';
import {toast} from 'react-toastify';
import TmdbRequestService from '../../services/TmdbRequestService';
import {MovieOverview} from '../../types/MovieTypes';
import List from '../List/List';
import TopBar from '../TopBar/TopBar';

const Page = () => {
  const [movies, setMovies] = useState<MovieOverview[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [similarMovie, setSimilarMovie] = useState<MovieOverview | undefined>(undefined);
  const lastRequestId = useRef(0);
  const lastSearch = useRef('');

  const manageLoadingMovies = async (promise: Promise<MovieOverview[]>) => {
    setLoading(true);
    const requestId = ++lastRequestId.current;
    try {
      const loadedMovies = await promise;
      // This is to prevent issues from multiple concurrent load requests from the user
      if (lastRequestId.current !== requestId) return;
      setMovies(loadedMovies);
    } catch (error) {
      handleLoadingMoviesError(error);
    }
    setLoading(false);
  };

  const handleLoadingMoviesError = (error: unknown) => {
    console.error(error);
    setSimilarMovie(undefined);
    toast.error('There was an unexpected error while loading movies. Please try again!');
  };

  const loadSearchedMovies = async (search: string) => {
    setSimilarMovie(undefined);
    await manageLoadingMovies(TmdbRequestService.searchMovies(search));
    lastSearch.current = search;
  };

  const loadSimilarMovies = async (movie: MovieOverview) => {
    setSimilarMovie(movie);
    await manageLoadingMovies(TmdbRequestService.getSimilarMovies(movie.id));
  };

  const handleSearchSubmit = (value: string) => {
    loadSearchedMovies(value);
  };

  const handleSimilarClick = (movie: MovieOverview) => {
    loadSimilarMovies(movie);
  };

  const handleBackClick = () => {
    loadSearchedMovies(lastSearch.current);
  };

  return (
    <React.Fragment>
      <TopBar
        similarMovie={similarMovie}
        lastSearchValue={lastSearch.current}
        onBackClick={handleBackClick}
        onSearchSubmit={handleSearchSubmit}
      />
      <Container sx={{pt: 2}}>
        <List movies={movies} loading={loading} onSimilarClick={handleSimilarClick} />
      </Container>
    </React.Fragment>
  );
};

export default Page;
