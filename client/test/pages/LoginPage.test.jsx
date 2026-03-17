import { describe, expect, test, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../../src/pages/LoginPage';
import { renderWithProviders } from '../utils/renderWithProviders';

vi.mock('../../src/hooks/mutations/useLoginMutation', () => ({
  useLoginMutation: () => ({ isPending: false, mutateAsync: vi.fn().mockResolvedValue({ token: 'a', user: { name: 'A' } }) }),
}));

describe('LoginPage', () => {
  test('renders login form', async () => {
    renderWithProviders(<MemoryRouter><LoginPage /></MemoryRouter>, {
      preloadedState: { auth: { token: null, user: null, hydrated: true }, ui: { mobileNavOpen: false } },
    });

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });
});
