import { render, screen } from '@testing-library/react';
import {TransactionsTable} from './table';

test('renders learn react link', () => {
  const {debug,getByTestId} = render(<TransactionsTable />);
  expect(getByTestId('table-component')).toBeInTheDocument()
});
