import { render, screen } from '@testing-library/react';
import App from './App';

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

test('checks title is rendered', async () => {
  render(<App />);
  const txtTitle = await screen.findByText(/Simple Todo List/i);
  expect(txtTitle).toBeInTheDocument();
});

