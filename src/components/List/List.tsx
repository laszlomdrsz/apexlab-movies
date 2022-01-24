import {Fade, Typography} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import React from 'react';
import {MovieOverview} from '../../types/MovieTypes';
import ListItem from '../ListItem/ListItem';
import ListItemSkeleton from '../ListItemSkeleton/ListItemSkeleton';
import config from '../../config/config';

interface ListProps {
  movies?: MovieOverview[];
  loading: boolean;
  onSimilarClick: (movie: MovieOverview) => any;
}

const List = ({movies, loading, onSimilarClick}: ListProps) => {
  const renderListOrLoading = () => {
    return <div>{loading ? <ListItemSkeleton /> : renderListItems()}</div>;
  };

  const renderListItems = () => {
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
      <ListItem
        key={movie.id}
        movie={movie}
        index={index}
        onSimilarClick={() => onSimilarClick(movie)}
      ></ListItem>
    ));
  };

  return <React.Fragment>{renderListOrLoading()}</React.Fragment>;
};

export default List;
