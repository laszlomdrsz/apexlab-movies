import {Box, Fade, Typography} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import React from 'react';
import {MovieOverview} from '../../types/MovieTypes';
import MovieItem from '../MovieItem/MovieItem';
import MovieItemSkeleton from '../MovieItemSkeleton/MovieItemSkeleton';
import config from '../../config/config';

interface MovieListProps {
  movies?: MovieOverview[];
  loading: boolean;
  onSimilarClick: (movie: MovieOverview) => any;
}

const MovieList = ({movies, loading, onSimilarClick}: MovieListProps) => {
  const renderItemsOrLoading = () => {
    return <Box>{loading ? <MovieItemSkeleton /> : renderItems()}</Box>;
  };

  const renderItems = () => {
    if (movies && !movies.length) {
      return (
        <Fade in={true} timeout={config.fadeTimeout}>
          <Typography fontSize={20} display="flex" justifyContent="center" alignItems="center" gap={1}>
            <SentimentVeryDissatisfiedIcon fontSize="large" /> No movies could be found
          </Typography>
        </Fade>
      );
    }
    return movies?.map((movie, index) => (
      <MovieItem
        key={movie.id}
        movie={movie}
        index={index}
        onSimilarClick={() => onSimilarClick(movie)}
      ></MovieItem>
    ));
  };

  return <React.Fragment>{renderItemsOrLoading()}</React.Fragment>;
};

export default MovieList;
