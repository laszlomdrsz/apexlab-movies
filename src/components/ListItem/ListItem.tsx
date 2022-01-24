import {AccordionDetails, AccordionSummary, Box, Fade, Rating, Typography} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import React, {useRef, useState} from 'react';
import {MovieDetails, MovieOverview} from '../../types/MovieTypes';
import movieDetailsLoader from '../../services/MovieDetailsLoader';
import DetailsPanel from '../DetailsPanel/DetailsPanel';
import DetailsPanelSkeleton from '../DetailsPanelSkeleton/DetailsPanelSkeleton';
import {crossfade} from '../../utils/Crossfade';

interface ListItemProps {
  movie: MovieOverview;
  index: number;
  onSimilarClick: () => any;
}

const ListItem = ({movie, index, onSimilarClick}: ListItemProps) => {
  const [details, setDetails] = useState<MovieDetails | undefined>();
  const loading = useRef(false);

  const loadDetails = async () => {
    if (loading.current) return;
    loading.current = true;
    const loadedDetails = await movieDetailsLoader.getDetails(movie.name);
    setDetails(loadedDetails);
    loading.current = false;
  };

  const handleAccordionChange = (_: React.SyntheticEvent<Element, Event>, isExpanded: boolean) => {
    if (isExpanded && !details) {
      loadDetails();
    }
  };

  const renderDetails = () => {
    return crossfade({
      element1: <DetailsPanel details={details} onSimilarClick={onSimilarClick} />,
      element2: <DetailsPanelSkeleton />,
      show1: !!details,
    });
  };

  return (
    <Fade in={true} timeout={index * 70}>
      <Accordion onChange={handleAccordionChange}>
        <AccordionSummary sx={{display: 'flex', alignItems: 'center'}}>
          <Typography width={0.33} alignSelf="center" data-testid="ListItemName">
            {movie.name}
          </Typography>
          <Typography width={0.33} alignSelf="center" textAlign="center" color="text.secondary">
            {movie.genres.join(', ')}
          </Typography>
          <Box width={0.34} alignSelf="center" display="flex" justifyContent="flex-end">
            <Rating value={movie.score / 2} precision={0.25} readOnly />
          </Box>
        </AccordionSummary>
        <AccordionDetails>{renderDetails()}</AccordionDetails>
      </Accordion>
    </Fade>
  );
};

export default ListItem;
