import {Box, Button, Typography, AppBar, Toolbar} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import Search from '../Search/Search';
import {MovieOverview} from '../../types/MovieTypes';
import {crossfade} from '../../utils/Crossfade';

interface TopBarProps {
  similarMovie?: MovieOverview;
  lastSearchValue?: string;
  onBackClick: () => any;
  onSearchSubmit: (search: string) => any;
}

const TopBar = ({similarMovie, lastSearchValue, onBackClick, onSearchSubmit}: TopBarProps) => {
  const getSimilarMovieContent = () => {
    return (
      <Box display="grid" gridTemplateColumns="1fr repeat(3, auto) 1fr" alignItems="center">
        <Box>
          <Button type="button" onClick={onBackClick} sx={{color: '#fff'}}>
            <ArrowBackIcon fontSize="small" /> Back to search results: '{lastSearchValue}'
          </Button>
        </Box>
        <Box>
          <Typography>Showing movies similar to '{similarMovie?.name}'</Typography>
        </Box>
      </Box>
    );
  };

  const getSearchContent = () => {
    return <Search onSubmit={onSearchSubmit} defaultValue={lastSearchValue} />;
  };

  const renderContent = () => {
    return crossfade({
      element1: getSearchContent(),
      element2: getSimilarMovieContent(),
      show1: !similarMovie,
    });
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box width={1}>{renderContent()}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
