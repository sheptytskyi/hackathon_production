import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import baseApi from '@app/services/baseApi';
import authorizedApi from './services/authorizedApi';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from '@app/slices/auth.ts';
import { uiSlice } from '@app/slices/ui.ts';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [uiSlice.name]: uiSlice.reducer,
  [authorizedApi.reducerPath]: authorizedApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
      .concat(authorizedApi.middleware)
      .concat(baseApi.middleware),
});

export const persistor = persistStore(store);
