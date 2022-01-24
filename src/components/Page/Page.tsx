import {Container} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {toast} from 'react-toastify';
import TmdbRequestService from '../../services/TmdbRequestService';
import {MovieOverview} from '../../types/MovieTypes';
import MovieList from '../MovieList/MovieList';
import TopBar from '../TopBar/TopBar';

const Page = () => {
  const [movies, setMovies] = useState<MovieOverview[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [similarMovie, setSimilarMovie] = useState<MovieOverview | undefined>(undefined);
  const lastRequestId = useRef(0);
  const lastSearch = useRef('');
  const mounted = useRef(true);

  useEffect(() => {
    // This is needed to prevent memory leaks caused by unmounting before loading details has completed
    mounted.current = true;
    return () => {
      mounted.current = false;
      return;
    };
  }, [movies]);

  const manageLoadingMovies = async (promise: Promise<MovieOverview[]>) => {
    setLoading(true);
    const requestId = ++lastRequestId.current;
    try {
      const loadedMovies = await promise;
      // This is to prevent issues from multiple concurrent load requests from the user
      if (lastRequestId.current !== requestId || !mounted.current) return;
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
    if (!search) return;
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
        <MovieList movies={movies} loading={loading} onSimilarClick={handleSimilarClick} />
      </Container>
    </React.Fragment>
  );
};

export default Page;
