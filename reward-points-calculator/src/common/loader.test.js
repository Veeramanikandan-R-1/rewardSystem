import { render, screen } from '@testing-library/react';
import Loader from './loader';

test('renders learn react link', () => {
  const {debug,getByTestId} = render(<Loader />);
  expect(getByTestId('loader')).toBeInTheDocument()
});
