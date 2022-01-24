import React from 'react';
import {render, screen} from '@testing-library/react';
import DetailsPanelSkeleton from './DetailsPanelSkeleton';

test('render 7 rows of loading skeleton with different widths', async () => {
  render(<DetailsPanelSkeleton />);
  const skeletonRows = await screen.findAllByTestId('DetailsPanelSkeletonRow');
  expect(skeletonRows.length).toBeGreaterThanOrEqual(5);
  let previousWidth;
  for (const skeletonRow of skeletonRows) {
    expect(skeletonRow.dataset['testWidth']).not.toEqual(previousWidth);
    previousWidth = skeletonRow.dataset['testWidth'];
  }
});
