import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import authReducer from '../../src/features/authSlice';
import uiReducer from '../../src/features/uiSlice';

export const renderWithProviders = (ui, { preloadedState } = {}) => {
  const store = configureStore({ reducer: { auth: authReducer, ui: uiReducer }, preloadedState });
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <Provider store={store}>
      <QueryClientProvider client={client}>{ui}</QueryClientProvider>
    </Provider>,
  );
};
