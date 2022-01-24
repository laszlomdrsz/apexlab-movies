import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {movieOverviews} from '../../fixtures/movieOverviews';
import MovieItem from './MovieItem';
import movieDetailsLoader from '../../services/MovieDetailsLoader';
import {movieDetails} from '../../fixtures/movieDetails';
import config from '../../config/config';

const movie = movieOverviews[0];
const movieItemProps = {
  movie,
  index: 0,
  onSimilarClick: () => {},
};

test('renders movie name, genres and score rating (with 0.25 precision on a scale of 5)', () => {
  render(<MovieItem {...movieItemProps} />);
  const nameText = screen.getByText(movie.name);
  expect(nameText).toBeInTheDocument();
  for (const genre of movie.genres) {
    const regexp = new RegExp(genre, 'i');
    const genreText = screen.getByText(regexp);
    expect(genreText).toBeInTheDocument();
  }
  const scoreNumber = (Math.round(movie.score * 2) / 4).toString();
  const rating = screen.getByLabelText(scoreNumber + ' Stars');
  expect(rating).toBeInTheDocument();
});

test('starts loading details on opening details panel', async () => {
  render(<MovieItem {...movieItemProps} />);
  const getDetailsSpy = jest.spyOn(movieDetailsLoader, 'getDetails');
  const nameText = screen.getByText(movie.name);
  await act(async () => {
    nameText.click();
    await new Promise((r) => setTimeout(r, 400));
  });
  const skeletonRows = await screen.findAllByTestId('DetailsPanelSkeletonRow');
  expect(skeletonRows.length).toBeTruthy();
  expect(getDetailsSpy).toBeCalled();
});

test('hides loading skeleton and displays detail results on loading ready', async () => {
  render(<MovieItem {...movieItemProps} />);
  const getDetailsSpy = jest.spyOn(movieDetailsLoader, 'getDetails');
  getDetailsSpy.mockResolvedValue(movieDetails);
  const nameText = screen.getByText(movie.name);
  await act(async () => {
    nameText.click();
    await new Promise((r) => setTimeout(r, config.fadeTimeout));
  });
  const skeletonRows = screen.queryAllByTestId('DetailsPanelSkeletonRow');
  expect(skeletonRows[0]).not.toBeVisible();
  const extractText = screen.getByText(movieDetails.wikipediaData?.extract as string);
  expect(extractText).toBeInTheDocument();
});

test('closes details panel on a second click', async () => {
  render(<MovieItem {...movieItemProps} />);
  const getDetailsSpy = jest.spyOn(movieDetailsLoader, 'getDetails');
  getDetailsSpy.mockResolvedValue(movieDetails);
  const nameText = screen.getByText(movie.name);
  await act(async () => {
    nameText.click();
    await new Promise((r) => setTimeout(r, config.fadeTimeout));
  });
  await act(async () => {
    nameText.click();
    await new Promise((r) => setTimeout(r, config.fadeTimeout));
  });
  const skeletonRows = screen.queryAllByTestId('DetailsPanelSkeletonRow');
  expect(skeletonRows[0]).not.toBeVisible();
  const extractText = screen.queryByText(movieDetails.wikipediaData?.extract as string);
  expect(extractText).not.toBeVisible();
});

test('remembers details once loaded', async () => {
  render(<MovieItem {...movieItemProps} />);
  const getDetailsSpy = jest.spyOn(movieDetailsLoader, 'getDetails');
  getDetailsSpy.mockResolvedValue(movieDetails);
  const nameText = screen.getByText(movie.name);
  await act(async () => {
    nameText.click();
    await new Promise((r) => setTimeout(r, config.fadeTimeout));
  });
  await act(async () => {
    nameText.click();
    await new Promise((r) => setTimeout(r, config.fadeTimeout));
  });
  await act(async () => {
    nameText.click();
    await new Promise((r) => setTimeout(r, config.fadeTimeout));
  });
  const skeletonRows = screen.queryAllByTestId('DetailsPanelSkeletonRow');
  expect(skeletonRows[0]).not.toBeVisible();
  const extractText = screen.queryByText(movieDetails.wikipediaData?.extract as string);
  expect(extractText).toBeVisible();
  expect(getDetailsSpy).toBeCalledTimes(1);
});
