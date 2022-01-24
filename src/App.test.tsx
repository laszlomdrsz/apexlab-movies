import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Page component', () => {
  render(<App />);
  const pageElement = screen.getByText(/search/i);
  expect(pageElement).toBeInTheDocument();
});
