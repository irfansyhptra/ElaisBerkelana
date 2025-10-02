// src/providers/ReduxProvider.tsx
"use client";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { ReactNode } from 'react';

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;