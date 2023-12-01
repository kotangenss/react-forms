import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import dataReducerUncontrolled from './dataSliceUncontrolled';
import dataReducerControlled from './dataSliceControlled';

const rootReducer = combineReducers({
  dataUncontrolled: dataReducerUncontrolled,
  dataControlled: dataReducerControlled,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState: PreloadedState<RootState>): ToolkitStore => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
