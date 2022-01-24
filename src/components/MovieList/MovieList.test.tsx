import React from 'react';
import {render, screen} from '@testing-library/react';
import MovieList from './MovieList';
import {movieOverviews} from '../../fixtures/movieOverviews';

test('renders loading animation', async () => {
  render(<MovieList loading={true} onSimilarClick={() => {}} />);
  const skeletonRows = await screen.findAllByTestId('MovieItemSkeletonRow');
  expect(skeletonRows.length).toBeTruthy();
});

test('renders "no movies found" text', () => {
  render(<MovieList loading={false} movies={[]} onSimilarClick={() => {}} />);
  const noMoviesFoundText = screen.getByText(/No movies could be found/i);
  expect(noMoviesFoundText).toBeInTheDocument();
});

test('renders a list of movies', () => {
  const movies = movieOverviews;
  render(<MovieList loading={false} movies={movies} onSimilarClick={() => {}} />);
  const noMoviesFoundText = screen.queryByText(/No movies could be found/i);
  expect(noMoviesFoundText).not.toBeInTheDocument();
  for (const movie of movies) {
    const {name} = movie;
    const nameText = screen.getByText(name);
    expect(nameText).toBeInTheDocument();
  }
});

test('displays nothing if not loading and movies is undefined', () => {
  render(<MovieList loading={false} onSimilarClick={() => {}} />);
  const skeletonRows = screen.queryByTestId('MovieItemSkeletonRow');
  expect(skeletonRows).not.toBeInTheDocument();
  const noMoviesFoundText = screen.queryByText(/No movies could be found/i);
  expect(noMoviesFoundText).not.toBeInTheDocument();
});
