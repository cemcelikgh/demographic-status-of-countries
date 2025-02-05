import { configureStore } from '@reduxjs/toolkit';
import demographicsReducer from './features/demographicsSlice';
import themeReducer from './features/themeSlice';
import loaderReducer from './features/loaderSlice';

export const store = configureStore({
  reducer: {
    demographics: demographicsReducer,
    loader: loaderReducer,
    theme: themeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
