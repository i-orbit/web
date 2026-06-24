import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import App from '@/App';
import Dashboard from '@/pages/Dashboard';

function renderWithRouter() {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
    { initialEntries: ['/'] },
  );
  return render(<RouterProvider router={router} />);
}

describe('App', () => {
  it('renders Dashboard page', () => {
    renderWithRouter();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
