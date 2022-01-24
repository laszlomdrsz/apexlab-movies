import {Fade} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import config from '../config/config';

export interface CrossfadeArgs {
  element1: JSX.Element;
  element2: JSX.Element;
  show1: boolean;
}
export const crossfade = ({element1, element2, show1}: CrossfadeArgs) => {
  const positionProps = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  return (
    <Box position="relative">
      <Fade timeout={config.fadeTimeout} in={show1}>
        <Box position={show1 ? 'static' : 'absolute'} {...positionProps} zIndex={show1 ? 2 : 1}>
          {element1}
        </Box>
      </Fade>
      <Fade timeout={config.fadeTimeout} in={!show1}>
        <Box position={!show1 ? 'static' : 'absolute'} {...positionProps} zIndex={show1 ? 1 : 2}>
          {element2}
        </Box>
      </Fade>
    </Box>
  );
};
