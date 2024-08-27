import { render, screen } from '@testing-library/react';
import TableComponent from './table';

test('renders learn react link', () => {
  const {debug,getByTestId} = render(<TableComponent />);
  expect(getByTestId('table-component')).toBeInTheDocument()
});
