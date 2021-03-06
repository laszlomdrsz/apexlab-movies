import {Box, Skeleton} from '@mui/material';
import React from 'react';

const MovieItemSkeleton = () => {
  return (
    <React.Fragment>
      {[...Array(18)].map((_, index) => (
        <Box key={index} data-testid="MovieItemSkeletonRow">
          <Skeleton variant="rectangular" width={'100%'} height={47} sx={{mb: '1px'}} />
        </Box>
      ))}
    </React.Fragment>
  );
};

export default MovieItemSkeleton;
