import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';
import { renderWithProviders } from '../utils/renderWithProviders';

describe('ProtectedRoute', () => {
  test('renders children when authenticated', () => {
    renderWithProviders(
      <MemoryRouter>
        <ProtectedRoute><p>Secret</p></ProtectedRoute>
      </MemoryRouter>,
      { preloadedState: { auth: { token: 'x', user: { name: 'A' }, hydrated: true }, ui: { mobileNavOpen: false } } },
    );

    expect(screen.getByText('Secret')).toBeInTheDocument();
  });
});
