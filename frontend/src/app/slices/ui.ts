import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@app';

interface UIState {
  loadingIds: string[];
}

const initialState: UIState = {
  loadingIds: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoadings: (state, { payload }: PayloadAction<string[]>) => {
      state.loadingIds = payload ?? [];
    },

    startLoading: (state, { payload: id }: PayloadAction<string>) => {
      state.loadingIds = [...state.loadingIds, id];
    },

    stopLoading: (state, { payload: id }: PayloadAction<string>) => {
      state.loadingIds = state.loadingIds.filter(
        (loadingId) => loadingId !== id,
      );
    },
  },
});

export const selectLoadingIds = (state: RootState) => state.ui?.loadingIds;
export const { setLoadings, startLoading, stopLoading } = uiSlice.actions;
