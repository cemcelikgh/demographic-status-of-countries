import { configureStore } from '@reduxjs/toolkit';
import demographicsReducer from './features/demographicsSlice';
import themeReducer from './features/themeSlice';
import loaderReducer from './features/loaderSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      demographics: demographicsReducer,
      loader: loaderReducer,
      theme: themeReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
