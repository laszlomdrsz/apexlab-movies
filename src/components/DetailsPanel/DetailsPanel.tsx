import {Box, Button, Link, Typography} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';
import {MovieDetails} from '../../types/MovieTypes';

interface DetailsPanelProps {
  details?: MovieDetails;
  onSimilarClick: () => any;
}

const DetailsPanel = ({details, onSimilarClick}: DetailsPanelProps) => {
  if (!details) return null; // Required because crossfading renders it even if there is no content

  const createLink = (href: string, label: string) => {
    return (
      <Link href={href} target="_blank" rel="noreferrer">
        <Typography>
          {label}
          <OpenInNewIcon sx={{fontSize: 15}} />
        </Typography>
      </Link>
    );
  };

  const renderWikipediaLink = () => {
    if (details.wikipediaData?.url && details.wikipediaData?.extract) {
      return createLink(details.wikipediaData.url, 'Open Wikipedia page');
    }
    return <Typography>Could not find Wikipedia page</Typography>;
  };

  const renderImdbLink = () => {
    if (details.imdbData?.url) {
      return createLink(details.imdbData.url, 'Open IMDB page');
    }
    return <Typography>Could not find IMDB page</Typography>;
  };

  return (
    <Box>
      <Box>
        <Typography fontSize={15}>{details.wikipediaData?.extract}</Typography>
      </Box>
      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Box mb={1}>{renderWikipediaLink()}</Box>
          <Box>{renderImdbLink()}</Box>
        </Box>
        <Box>
          <Button type="button" variant="contained" onClick={() => onSimilarClick()}>
            Similar movies <ArrowForwardIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsPanel;
