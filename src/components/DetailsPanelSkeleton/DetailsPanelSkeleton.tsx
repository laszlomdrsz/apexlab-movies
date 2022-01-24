import {Box, Skeleton} from '@mui/material';
import React from 'react';

const DetailsPanelSkeleton = () => {
  const getRow = (index: number) => {
    const width = 100 - Math.random() * 30 + '%';
    return (
      <Box key={index}>
        <Skeleton variant="rectangular" width={width} height={24} sx={{mb: '2px'}} />
      </Box>
    );
  };

  return <React.Fragment>{[...Array(7)].map((_, index) => getRow(index))}</React.Fragment>;
};

export default DetailsPanelSkeleton;
