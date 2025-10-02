// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import i18nReducer from './i18nSlice';

const persistConfig = {
  key: 'elaeis-berkelana',
  storage,
  whitelist: ['i18n'], // Only persist i18n state
};

const persistedReducer = persistReducer(persistConfig, i18nReducer);

export const store = configureStore({
  reducer: {
    i18n: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;