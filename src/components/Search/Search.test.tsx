import {render, screen} from '@testing-library/react';
import Search from './Search';

const onSubmit = (search: string) => {};
const searchProps = {
  onSubmit,
  defaultValue: 'defvalue',
};

test('renders search input with placeholder', () => {
  const props = {...searchProps, defaultValue: undefined};
  render(<Search {...props} />);
  const search = screen.getByPlaceholderText('Type here to search');
  expect(search).toBeInTheDocument();
});

test('renders search input with default value', () => {
  render(<Search {...searchProps} />);
  const search = screen.getByDisplayValue(searchProps.defaultValue);
  expect(search).toBeInTheDocument();
});

test('submits correct value after click on search button', () => {
  const onSubmitSpy = jest.spyOn(searchProps, 'onSubmit');
  render(<Search {...searchProps} />);
  const searchButton = screen.getByTestId('SearchButton');
  searchButton.click();
  expect(onSubmitSpy).toBeCalledWith(searchProps.defaultValue);
});
