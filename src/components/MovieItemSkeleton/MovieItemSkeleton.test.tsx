import React from 'react';
import {render, screen} from '@testing-library/react';
import MovieItemSkeleton from './MovieItemSkeleton';

test('renders at least 5 lines of loading skeleton', async () => {
  render(<MovieItemSkeleton />);
  const skeletonRows = await screen.findAllByTestId('MovieItemSkeletonRow');
  expect(skeletonRows.length).toBeGreaterThanOrEqual(5);
});
