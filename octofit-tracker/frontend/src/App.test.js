import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

test('renders octofit navigation', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/OctoFit Tracker/i)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Users/i })[0]).toBeInTheDocument();
});
