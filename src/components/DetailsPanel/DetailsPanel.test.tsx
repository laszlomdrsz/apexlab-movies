import {render, screen} from '@testing-library/react';
import {movieDetails} from '../../fixtures/movieDetails';
import DetailsPanel from './DetailsPanel';

const onSimilarClick = () => {};
const detailsPanelProps = {
  details: movieDetails,
  onSimilarClick,
};

test('renders extract, Wikipedia link and IMDB link (opening on a new tab), similar movies button', () => {
  render(<DetailsPanel {...detailsPanelProps} />);
  const extractText = screen.getByText(movieDetails.wikipediaData?.extract as string);
  expect(extractText).toBeInTheDocument();

  const links = screen.getAllByRole('link');
  let wikipediaLink;
  let imdbLink;
  for (const link of links) {
    if (link.innerHTML.match(/Open Wikipedia page/i)) {
      wikipediaLink = link;
    } else if (link.innerHTML.match(/Open IMDB page/i)) {
      imdbLink = link;
    }
  }
  expect(wikipediaLink).toHaveAttribute('href', movieDetails.wikipediaData?.url);
  expect(wikipediaLink).toHaveAttribute('target', '_blank');
  expect(imdbLink).toHaveAttribute('href', movieDetails.imdbData?.url);
  expect(imdbLink).toHaveAttribute('target', '_blank');
  const similarMoviesButton = screen.getByText(/Similar movies/i);
  expect(similarMoviesButton).toBeInTheDocument();
});

test('handles missing detail data', () => {
  const details = {
    wikipediaData: undefined,
    imdbData: undefined,
  };
  const props = {...detailsPanelProps, details};
  render(<DetailsPanel {...props} />);
  const wikipediaMissingText = screen.getByText(/Could not find Wikipedia page/i);
  expect(wikipediaMissingText).toBeInTheDocument();
  const imdbMissingText = screen.getByText(/Could not find IMDB page/i);
  expect(imdbMissingText).toBeInTheDocument();
  const similarMoviesButton = screen.getByText(/Similar movies/i);
  expect(similarMoviesButton).toBeInTheDocument();
});

test('handles undefined details', () => {
  const props = {...detailsPanelProps, details: undefined};
  const view = render(<DetailsPanel {...props} />);
  expect(view.container.childElementCount).toEqual(0);
});

test('emits similar movie click event', () => {
  const onSimilarClickSpy = jest.spyOn(detailsPanelProps, 'onSimilarClick');
  render(<DetailsPanel {...detailsPanelProps} />);
  const similarMoviesButton = screen.getByText(/Similar movies/i);
  expect(onSimilarClickSpy).toBeCalledTimes(0);
  similarMoviesButton.click();
  expect(onSimilarClickSpy).toBeCalledTimes(1);
});
