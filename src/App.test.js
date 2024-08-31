import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const {debug,getByTestId} = render(<App />);
  expect(getByTestId('table-component')).toBeInTheDocument()
});
